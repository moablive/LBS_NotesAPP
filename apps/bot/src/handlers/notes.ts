import type { BotContext } from '../context.js';
import { botApi } from '@notes/api-client';

/** Títulos de nota são texto livre (uma delas se chama "<TESTANDO />"). */
const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const dia = (iso: string) =>
  new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });

const semTitulo = (title: string) => (title.trim() ? title.trim() : 'Sem título');

const NOTES_LIMIT = 20;
const WORKSPACES_LIMIT = 30;

export async function handleListNotes(ctx: BotContext) {
  const telegramId = String(ctx.from!.id);
  try {
    const { items, total } = await botApi.listNotes(telegramId, NOTES_LIMIT);

    if (total === 0) {
      await ctx.reply(
        '📝 Você ainda não tem notas.\n\nCrie a primeira em https://notes.astralwavelabel.com'
      );
      return;
    }

    const linhas = items.map((n) => {
      const marcas = [n.isFavorite ? '⭐' : '', n.isEvergreen ? '🌱' : ''].join('');
      const onde = n.parentTitle ? ` · em <i>${esc(semTitulo(n.parentTitle))}</i>` : '';
      return `${n.icon ?? '•'} <b>${esc(semTitulo(n.title))}</b>${marcas ? ' ' + marcas : ''}${onde} · ${dia(n.updatedAt)}`;
    });

    const rodape = total > items.length
      ? `\n\n<i>Mostrando as ${items.length} mais recentes de ${total}.</i>`
      : '';

    await ctx.reply(
      `📝 <b>Suas notas</b> (${total})\n\n${linhas.join('\n')}${rodape}`,
      { parse_mode: 'HTML' }
    );
  } catch (err) {
    console.error('[notes] erro ao listar notas:', err);
    await ctx.reply('⚠️ Não consegui buscar as suas notas agora. Tente de novo em instantes.');
  }
}

export async function handleListWorkspaces(ctx: BotContext) {
  const telegramId = String(ctx.from!.id);
  try {
    const { items, total } = await botApi.listWorkspaces(telegramId, WORKSPACES_LIMIT);

    if (total === 0) {
      await ctx.reply(
        '🗂️ Você ainda não tem workspaces.\n\nCrie o primeiro em https://notes.astralwavelabel.com'
      );
      return;
    }

    const linhas = items.map((w) => {
      const dentro = w.childCount === 0
        ? 'vazio'
        : `${w.childCount} ${w.childCount === 1 ? 'nota' : 'notas'}`;
      return `${w.icon ?? '🗂️'} <b>${esc(semTitulo(w.title))}</b> · ${dentro} · ${dia(w.updatedAt)}`;
    });

    const rodape = total > items.length
      ? `\n\n<i>Mostrando ${items.length} de ${total}.</i>`
      : '';

    await ctx.reply(
      `🗂️ <b>Seus workspaces</b> (${total})\n\n${linhas.join('\n')}${rodape}`,
      { parse_mode: 'HTML' }
    );
  } catch (err) {
    console.error('[notes] erro ao listar workspaces:', err);
    await ctx.reply('⚠️ Não consegui buscar os seus workspaces agora. Tente de novo em instantes.');
  }
}
