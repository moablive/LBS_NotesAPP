import { Router } from 'express';
import { db, schema } from '@notesapp/db';
import { and, eq } from 'drizzle-orm';
import { env } from '@notesapp/services';
import { pushSubscribeSchema, pushUnsubscribeSchema } from '@notesapp/models';
import crypto from 'crypto';
import { enviarPushParaEndpoint, pushConfigured } from '../lib/push.js';

export const pushRouter = Router();

pushRouter.use((_req, res, next) => {
  if (!pushConfigured) return res.status(503).json({ error: 'push_not_configured' });
  next();
});

pushRouter.get('/public-key', (_req, res) => {
  res.json({ publicKey: env.VAPID_PUBLIC_KEY });
});

pushRouter.post('/subscribe', async (req, res) => {
  const parsed = pushSubscribeSchema.parse(req.body);
  const userId = String(req.user!.loginhubId);

  await db
    .insert(schema.pushSubscriptions)
    .values({
      id: crypto.randomUUID().slice(0, 8),
      userId,
      endpoint: parsed.endpoint,
      p256dh: parsed.keys.p256dh,
      auth: parsed.keys.auth,
    })
    .onConflictDoUpdate({
      target: schema.pushSubscriptions.endpoint,
      set: { userId, p256dh: parsed.keys.p256dh, auth: parsed.keys.auth },
    });

  // Confirmation push so the user immediately sees it working on the device.
  try {
    await enviarPushParaEndpoint(
      { endpoint: parsed.endpoint, keys: parsed.keys },
      { title: 'NotesAPP', body: '🔔 Notificações ativadas neste aparelho!' },
    );
  } catch (err) {
    console.error('Falha ao enviar push de confirmação:', err);
  }

  res.status(201).json({ ok: true });
});

pushRouter.post('/unsubscribe', async (req, res) => {
  const parsed = pushUnsubscribeSchema.parse(req.body);
  await db
    .delete(schema.pushSubscriptions)
    .where(
      and(
        eq(schema.pushSubscriptions.endpoint, parsed.endpoint),
        eq(schema.pushSubscriptions.userId, String(req.user!.loginhubId))
      )
    );
  res.status(204).send();
});
