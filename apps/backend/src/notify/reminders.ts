import { and, eq, gt, isNull, lte, or, sql } from 'drizzle-orm';
import { db, schema } from '@notesapp/db';
import { env } from '@notesapp/services';
import { enviarPushParaUsuario, pushConfigured } from '../lib/push.js';

/**
 * Varredor de lembretes de nota (`notes.remind_at`).
 *
 * POR QUE ISTO NAO FUNCIONAVA
 *
 * A coluna `remind_at` estava no schema desde sempre e ninguem a lia. Em
 * 28/08/2026 este varredor foi escrito emitindo para o LBS Notify, a central de
 * push da suite — mas a central nunca entregou um unico aviso (faltava a borda
 * publica no tunel), e a primeira linha util daqui era `if (!notify.ativo())
 * return 0`. Ou seja: dava para marcar o lembrete no app e ele NUNCA chegava.
 *
 * A central foi descontinuada em 19/09/2026 e o envio passou a ser o Web Push
 * proprio deste app.
 *
 * POR QUE AGORA PRECISA DE COLUNA
 *
 * A versao anterior nao guardava "ja notifiquei" porque o Notify deduplicava
 * por `eventId` e respondia `duplicated` — reprocessar a janela era de graca.
 * O `web-push` nao deduplica nada: sem `notes.reminder_sent_at`, cada varredura
 * reenviaria o mesmo lembrete, uma vez por minuto.
 */

/**
 * Quanto para tras a varredura olha.
 *
 * Existe para o container poder ficar fora do ar alguns minutos sem que o
 * lembrete se perca — mas e curta de proposito: uma janela larga faria o
 * primeiro deploy disparar de uma vez todo lembrete vencido do historico.
 */
const JANELA_MS = 60 * 60 * 1000;

export async function varrerLembretes(): Promise<number> {
  if (!pushConfigured) return 0;

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
        // Ainda nao avisado — ou avisado ANTES do instante atual do lembrete,
        // que e o caso de quem reagendou: o lembrete novo tem que tocar de novo.
        or(
          isNull(schema.notes.reminderSentAt),
          sql`${schema.notes.reminderSentAt} < ${schema.notes.remindAt}`,
        ),
      ),
    )
    .limit(200);

  let enviados = 0;
  for (const n of vencidos) {
    if (!n.remindAt) continue;

    await enviarPushParaUsuario(n.userId, {
      title: '📝 Lembrete de nota',
      body: n.title,
      url: '/',
    });

    // Carimba SEMPRE, mesmo sem aparelho inscrito (entregues = 0). Sem isto,
    // quem nunca ativou notificacao teria a nota varrida a cada minuto para
    // sempre, e no dia em que ativasse receberia o lembrete velho na hora.
    await db
      .update(schema.notes)
      .set({ reminderSentAt: new Date() })
      .where(eq(schema.notes.id, n.id));

    enviados++;
  }

  return enviados;
}

/** Liga o varredor periodico. Devolve o `stop` para o encerramento limpo. */
export function iniciarVarredorDeLembretes(): () => void {
  if (!pushConfigured || env.NOTES_REMINDER_SCAN_MINUTES === 0) {
    return () => {};
  }

  const intervalo = env.NOTES_REMINDER_SCAN_MINUTES * 60_000;
  // eslint-disable-next-line no-console
  console.log(`[notes] varredor de lembretes a cada ${env.NOTES_REMINDER_SCAN_MINUTES} min.`);

  const timer = setInterval(() => {
    // Erro aqui nunca pode derrubar o backend: e um job de fundo, e o app HTTP
    // tem que continuar de pe mesmo se o banco piscar.
    void varrerLembretes().catch((err) =>
      // eslint-disable-next-line no-console
      console.error('[notes] varredura de lembretes falhou:', (err as Error).message),
    );
  }, intervalo);

  // `unref` para o timer nao segurar o processo no SIGTERM do deploy.
  timer.unref();
  return () => clearInterval(timer);
}
