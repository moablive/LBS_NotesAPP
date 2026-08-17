import { Router } from 'express';
import { db, schema } from '@notesapp/db';
import { eq } from 'drizzle-orm';
import {
  defaultReminderSettings,
  reminderSettingsSchema,
  updateReminderSettingsSchema,
} from '@notesapp/models';

export const remindersRouter = Router();


remindersRouter.get('/', async (req, res) => {
  const row = await db.query.reminderSettings.findFirst({
    where: eq(schema.reminderSettings.userId, String(req.user!.loginhubId)),
  });
  res.json(row ? reminderSettingsSchema.parse(row) : defaultReminderSettings);
});

remindersRouter.patch('/', async (req, res) => {
  const parsed = updateReminderSettingsSchema.parse(req.body);
  const userId = String(req.user!.loginhubId);

  const [row] = await db
    .insert(schema.reminderSettings)
    .values({ userId, ...defaultReminderSettings, ...parsed })
    .onConflictDoUpdate({
      target: schema.reminderSettings.userId,
      set: { ...parsed, updatedAt: new Date() },
    })
    .returning();

  res.json(reminderSettingsSchema.parse(row));
});
