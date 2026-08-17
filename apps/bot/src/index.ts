import { Telegraf, session, Scenes } from 'telegraf';
import { env } from './config.js';
import type { BotContext } from './context.js';
import { auth } from './auth.js';
import { handleListNotes, handleListWorkspaces } from './handlers/notes.js';
import { loginWizard } from './scenes/loginWizard.js';
import { menuKeyboard } from './ui/menu.js';

// Inicializar Bot
const bot = new Telegraf<BotContext>(env.TELEGRAM_BOT_TOKEN);

// Sessão e Stages precisam vir ANTES do auth: usuários não vinculados são
// jogados no LOGIN_WIZARD, e isso exige ctx.scene disponível.
const stage = new Scenes.Stage<BotContext>([loginWizard]);
bot.use(session());
bot.use(stage.middleware());

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
