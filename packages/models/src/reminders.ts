import { z } from "zod";

/**
 * Contrato de lembretes do NotesAPP — espelha `reminderSettings` em
 * packages/db/src/schema.ts.
 *
 * Antes daqui vinha o contrato do TodoAPP (remind_before_minutes, digest de
 * manhã/tarde/noite, notificação por categoria/prioridade). Nada disso existe
 * na tabela do NotesAPP, então `reminderSettingsSchema.parse(row)` estourava e
 * o GET /api/reminders devolvia 500 assim que o usuário tinha uma linha salva.
 */
export const reminderSettingsSchema = z.object({
  notifyPush: z.boolean(),
  notifyTelegram: z.boolean(),
  displayName: z.string().max(60).nullable(),
  // Digest diário: "notas para rever hoje"
  dailyDigestEnabled: z.boolean(),
  dailyDigestTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
});
export type ReminderSettingsDto = z.infer<typeof reminderSettingsSchema>;

export const updateReminderSettingsSchema = reminderSettingsSchema.partial();
export type UpdateReminderSettingsDto = z.infer<typeof updateReminderSettingsSchema>;

export const defaultReminderSettings: ReminderSettingsDto = {
  notifyPush: true,
  notifyTelegram: true,
  displayName: null,
  dailyDigestEnabled: true,
  dailyDigestTime: "08:00",
};

export const pushSubscribeSchema = z.object({
  endpoint: z.string().url(),
  keys: z.object({
    p256dh: z.string().min(1),
    auth: z.string().min(1),
  }),
});
export type PushSubscribeDto = z.infer<typeof pushSubscribeSchema>;

export const pushUnsubscribeSchema = z.object({
  endpoint: z.string().url(),
});
export type PushUnsubscribeDto = z.infer<typeof pushUnsubscribeSchema>;
