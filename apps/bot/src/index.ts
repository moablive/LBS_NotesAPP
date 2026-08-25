import { Telegraf, session, Scenes } from 'telegraf';
import { env } from './config.js';
import type { BotContext } from './context.js';
import { auth, markLinked } from './auth.js';
import { handleListNotes, handleListWorkspaces } from './handlers/notes.js';
import { menuKeyboard } from './ui/menu.js';
import { botApi } from '@notes/api-client';

// Inicializar Bot
const bot = new Telegraf<BotContext>(env.TELEGRAM_BOT_TOKEN);

// Sessão e Stages antes do auth: as wizard scenes precisam de ctx.scene, e o
// handler do vínculo híbrido roda antes de qualquer guarda.
const stage = new Scenes.Stage<BotContext>([]);
bot.use(session());
bot.use(stage.middleware());

/**
 * Vínculo híbrido: `/start <passe>` vindo do deep link emitido no app.
 *
 * Vem ANTES do `auth` de propósito. Quem chega por aqui ainda não tem vínculo —
 * é o que veio criar —, e o `auth` jogaria a pessoa no wizard de senha, que é
 * exatamente o fluxo que este caminho existe para aposentar: senha e código do
 * 2FA digitados dentro do chat ficam no histórico do Telegram.
 *
 * A autenticação de verdade já aconteceu no PC, com 2FA. O que chega aqui é um
 * passe de uso único que só abre uma porta: gravar o vínculo.
 */
bot.use(async (ctx, next) => {
  const texto = ctx.message && 'text' in ctx.message ? ctx.message.text : '';
  const passe = /^\/start\s+(\S+)/.exec(texto ?? '')?.[1];
  if (!passe) return next();

  const telegramId = String(ctx.from!.id);
  try {
    const r = await botApi.consumirPasseDeVinculo(passe, telegramId);
    markLinked(telegramId);
    // O passe some do chat: ele já morreu no consumo, mas deixá-lo à vista
    // convida a reenviar e a receber "não vale mais" sem entender por quê.
    await ctx.deleteMessage().catch(() => {});
    await ctx.reply(
      `✅ <b>Telegram vinculado!</b>\n\n` +
        `Sua conta do NotesAPP (#${r.loginhubId}) agora fala com este chat.\n\n` +
        'O que deseja fazer?',
      { parse_mode: 'HTML', ...menuKeyboard }
    );
  } catch (err) {
    console.error('[vinculo] falha ao consumir o passe:', err);
    await ctx.deleteMessage().catch(() => {});
    await ctx.reply(
      '❌ <b>Este link de vínculo não vale mais.</b>\n\n' +
        'Ele serve uma vez só e expira em 10 minutos. Abra o NotesAPP no navegador, ' +
        'entre na sua conta e gere outro em <b>Configurações → Vincular Telegram</b>.',
      { parse_mode: 'HTML' }
    );
  }
});

// Middleware de autenticação (LoginHub via bot — padrão MoneyAPP)
bot.use(auth);

// Menu principal / Start
// Nome vem do próprio Telegram: `reminder_settings` (onde ficaria o
// display_name do site) não existe no banco notesapp.
bot.start(async (ctx) => {
  const name = ctx.from.first_name?.trim() || 'Patrão';
  await ctx.reply(
    `👋 Fala, ${name}! Aqui é o seu NotesAPP.\n\n` +
      'Por enquanto eu consulto o que já existe: suas notas e seus workspaces.',
    menuKeyboard
  );
});

// Ações dos Botões
bot.hears('📝 Minhas Notas', handleListNotes);
bot.hears('🗂️ Meus Workspaces', handleListWorkspaces);

// Comandos
bot.command('notas', handleListNotes);
bot.command('list', handleListNotes);
bot.command('workspaces', handleListWorkspaces);
bot.command('menu', (ctx) => ctx.reply('O que deseja consultar?', menuKeyboard));

bot.catch((err, ctx) => {
  console.error(`[bot] erro ao processar update ${ctx.updateType}:`, err);
});

bot.launch({ dropPendingUpdates: true }).catch((err: unknown) => {
  console.error('[bot] polling encerrado por erro:', err);
  process.exit(1);
});
console.log('🤖 Notes Bot rodando...');

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
