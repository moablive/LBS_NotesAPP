import { and, gt, isNull, lte } from 'drizzle-orm';
import { db, schema } from '@notesapp/db';
import { env } from '@notesapp/services';
import { criarClienteNotify } from '../lib/lbsNotify.js';

/**
 * Varredor de lembretes de nota (`notes.remind_at`).
 *
 * POR QUE ISTO NAO EXISTIA
 *
 * A coluna `remind_at` estava no schema desde sempre e NINGUEM a lia — dava
 * para marcar o lembrete no app e ele nunca chegava. Faltava justamente a peca
 * que o LBS Notify passou a oferecer: uma fila com idempotencia.
 *
 * POR QUE NAO PRECISA DE COLUNA "JA_NOTIFICADO"
 *
 * O `eventId` e derivado de `(nota, instante do lembrete)`. Reemitir o mesmo id
 * nao cria segunda notificacao — o Notify responde `duplicated`. Entao este
 * varredor pode reprocessar a mesma janela quantas vezes quiser, e um restart
 * no meio nao duplica nada. Sem isso, seria preciso uma migration so para
 * guardar um booleano, e ela teria que ser transacional com o envio.
 */

const notify = criarClienteNotify({
  baseUrl: env.LBS_NOTIFY_URL,
  app: 'notes',
  key: env.LBS_NOTIFY_KEY,
  enabled: env.NOTES_NOTIFY_USE_CENTRAL,
});

/**
 * Quanto para tras a varredura olha.
 *
 * Existe para o container poder ficar fora do ar alguns minutos sem que o
 * lembrete se perca — mas e curta de proposito: uma janela larga faria o
 * primeiro deploy disparar de uma vez todo lembrete vencido do historico.
 */
const JANELA_MS = 60 * 60 * 1000;

export async function varrerLembretes(): Promise<number> {
  if (!notify.ativo()) return 0;

  const agora = new Date();
  const desde = new Date(agora.getTime() - JANELA_MS);

  const vencidos = await db
    .select({
      id: schema.notes.id,
      userId: schema.notes.userId,
      title: schema.notes.title,
      remindAt: schema.notes.remindAt,
    })
    .from(schema.notes)
    .where(
      and(
        lte(schema.notes.remindAt, agora),
        gt(schema.notes.remindAt, desde),
        // Lembrete de nota na lixeira nao deve tocar.
        isNull(schema.notes.deletedAt),
      ),
    )
    .limit(200);

  const eventos = vencidos
    .filter((n) => n.remindAt !== null)
    .map((n) => ({
      // `remind_at` no id: se a pessoa reagendar o lembrete, o novo instante
      // gera um evento diferente e ela e avisada de novo, como deve ser.
      eventId: `notes:reminder:${n.id}:${n.remindAt!.toISOString()}`,
      type: 'notes.reminder',
      userId: n.userId,
      title: '📝 Lembrete de nota',
      body: n.title,
      data: { url: `/notes/${n.id}` },
    }));

  if (eventos.length === 0) return 0;
  await notify.emitirLote(eventos);
  return eventos.length;
}

/** Liga o varredor periodico. Devolve o `stop` para o encerramento limpo. */
export function iniciarVarredorDeLembretes(): () => void {
  if (!notify.ativo() || env.NOTES_REMINDER_SCAN_MINUTES === 0) {
    return () => {};
  }

  const intervalo = env.NOTES_REMINDER_SCAN_MINUTES * 60_000;
  // eslint-disable-next-line no-console
  console.log(`[notes] varredor de lembretes a cada ${env.NOTES_REMINDER_SCAN_MINUTES} min.`);

  const timer = setInterval(() => {
    // Erro aqui nunca pode derrubar o backend: e um job de fundo, e o app HTTP
    // tem que continuar de pe mesmo se o Notify ou o banco piscarem.
    void varrerLembretes().catch((err) =>
      // eslint-disable-next-line no-console
      console.error('[notes] varredura de lembretes falhou:', (err as Error).message),
    );
  }, intervalo);

  // `unref` para o timer nao segurar o processo no SIGTERM do deploy.
  timer.unref();
  return () => clearInterval(timer);
}
