import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  TELEGRAM_BOT_TOKEN: z.string().min(1, 'TELEGRAM_BOT_TOKEN is required'),

  // LoginHub — o bot valida e-mail+senha direto no LoginHub (padrão MoneyAPP)
  // e então vincula o telegramId ao usuário no banco do NotesAPP.
  LOGINHUB_API_URL: z.string().default('http://server_loginhub_backend:3000/api'),
  // App id do NotesAPP no LoginHub (NÃO usar o do TodoAPP=4, senão o login é
  // validado no tenant errado). Sobrescrito pelo .env em produção.
  LOGINHUB_APP_ID: z.coerce.number().default(11),
});

const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
  console.error('[bot] Ambiente inválido:', parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;
