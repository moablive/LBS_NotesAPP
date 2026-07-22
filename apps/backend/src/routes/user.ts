import { Router } from 'express';
import { db } from '@notesapp/db';
import { schema } from '@notesapp/db';
import { eq } from 'drizzle-orm';
import { userSettingsSchema } from '@notesapp/models';

export const userRouter = Router();

userRouter.get('/me', async (req, res) => {
  const user = await db.query.userSettings.findFirst({
    where: eq(schema.userSettings.loginhubId, req.user!.loginhubId),
  });
  res.json(user);
});

userRouter.patch('/me', async (req, res) => {
  const parsed = userSettingsSchema.parse(req.body);
  const updated = await db.update(schema.userSettings)
    .set({ telegramId: parsed.telegramId })
    .where(eq(schema.userSettings.loginhubId, req.user!.loginhubId))
    .returning();
  res.json(updated[0]);
});
