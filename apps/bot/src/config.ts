import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  TELEGRAM_BOT_TOKEN: z.string().min(1, 'TELEGRAM_BOT_TOKEN is required'),

  // LoginHub — o bot valida e-mail+senha direto no LoginHub (padrão MoneyAPP)
  // e então vincula o telegramId ao usuário no banco do NotesAPP.
  LOGINHUB_API_URL: z.string().default('http://server_loginhub_backend:3000/api'),
  // API interna do proprio app. So o vinculo hibrido passa por aqui — o resto
  // do bot fala direto com o Postgres. A logica do passe de uso unico mora no
  // backend, que e quem manda no schema.
  BACKEND_API_URL: z.string().default('http://notesapp_backend:3000/api'),
  // Mesma chave do backend: e o que autoriza o bot em /api/bot/*.
  BOT_SERVICE_KEY: z.string().min(1, 'BOT_SERVICE_KEY is required'),
  // App id do NotesAPP no LoginHub (NÃO usar o do TodoAPP=4, senão o login é
  // validado no tenant errado). Sobrescrito pelo .env em produção.
  // Login publico DESTE app — e para ca que o bot manda quem precisa
  // enrolar 2FA. O QR mora na propria tela do app desde que cada um
  // passou a enrolar em casa; o painel do hub saiu do caminho.
  APP_LOGIN_URL: z.string().default('https://notes.astralwavelabel.com/login'),
  LOGINHUB_APP_ID: z.coerce.number().default(11),
});

const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
  console.error('[bot] Ambiente inválido:', parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;
