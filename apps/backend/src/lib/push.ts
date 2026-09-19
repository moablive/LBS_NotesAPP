import { db, schema } from '@notesapp/db';
import { eq } from 'drizzle-orm';
import { env } from '@notesapp/services';
import webpush from 'web-push';

/**
 * Web Push deste app — configuração e envio.
 *
 * Saiu de `routes/push.ts` quando o varredor de lembretes precisou enviar sem
 * passar por uma requisição HTTP. Fica em `lib/` porque `lib` importando de
 * `routes` seria camada invertida; é o mesmo arranjo do LBS_TTSAPP.
 */

export const pushConfigured = Boolean(env.VAPID_PUBLIC_KEY && env.VAPID_PRIVATE_KEY);

if (pushConfigured) {
  webpush.setVapidDetails(env.VAPID_SUBJECT, env.VAPID_PUBLIC_KEY!, env.VAPID_PRIVATE_KEY!);
}

export type PayloadPush = { title: string; body: string; url?: string };

/** Envia para UM endpoint já conhecido (usado no push de confirmação). */
export function enviarPushParaEndpoint(
  sub: { endpoint: string; keys: { p256dh: string; auth: string } },
  payload: PayloadPush,
) {
  return webpush.sendNotification(sub, JSON.stringify({ url: '/', ...payload }));
}

/**
 * Envia para TODOS os aparelhos do usuário.
 *
 * Inscrição morta (404/410 do servidor de push) é apagada na hora: aparelho
 * trocado ou app desinstalado deixa lixo que faria todo envio seguinte gastar
 * uma requisição para nada.
 *
 * Nunca lança. O chamador é um job de fundo, e falha de notificação não pode
 * derrubar o backend HTTP.
 */
export async function enviarPushParaUsuario(
  userId: string,
  payload: PayloadPush,
): Promise<number> {
  if (!pushConfigured) return 0;

  try {
    const inscricoes = await db
      .select({
        endpoint: schema.pushSubscriptions.endpoint,
        p256dh: schema.pushSubscriptions.p256dh,
        auth: schema.pushSubscriptions.auth,
      })
      .from(schema.pushSubscriptions)
      .where(eq(schema.pushSubscriptions.userId, userId));

    let entregues = 0;
    for (const s of inscricoes) {
      try {
        await enviarPushParaEndpoint(
          { endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } },
          payload,
        );
        entregues++;
      } catch (err: any) {
        if (err?.statusCode === 404 || err?.statusCode === 410) {
          await db
            .delete(schema.pushSubscriptions)
            .where(eq(schema.pushSubscriptions.endpoint, s.endpoint));
        } else {
          // eslint-disable-next-line no-console
          console.error('[notes] falha ao enviar push:', err?.statusCode, err?.body ?? err?.message);
        }
      }
    }
    return entregues;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[notes] falha ao consultar inscricoes de push:', (err as Error).message);
    return 0;
  }
}
