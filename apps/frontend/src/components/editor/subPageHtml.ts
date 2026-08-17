/**
 * Formato HTML do bloco de sub-página — o contrato entre o nó do editor
 * (subPageNode.ts, que serializa) e a store (que grava a filha no conteúdo do
 * pai sem precisar de um editor montado).
 *
 * Fica num módulo sem dependências de Vue/Tiptap de propósito: a store precisa
 * destes helpers, e importá-los do nó criaria o ciclo
 * store → nó → NodeView (.vue) → store.
 */

export const SUB_PAGE_FALLBACK_TITLE = 'Sem título';

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/** HTML de um bloco de sub-página, no mesmo formato que o nó serializa. */
export function subPageBlockHtml(noteId: string, title?: string | null): string {
  const label = escapeHtml((title || '').trim() || SUB_PAGE_FALLBACK_TITLE);
  return `<a href="#" data-note-id="${noteId}" class="sub-page-link">📄 ${label}</a>`;
}

/** A filha já tem bloco no conteúdo do pai? (id é uuid: substring basta) */
export function contentHasSubPage(content: string | null | undefined, noteId: string): boolean {
  return !!content && !!noteId && content.includes(noteId);
}

/** Remove o bloco da filha do conteúdo do pai (usado ao mover/excluir). */
export function stripSubPageBlock(content: string, noteId: string): string {
  return content.replace(new RegExp(`<a[^>]*${noteId}[^>]*>.*?</a>`, 'g'), '');
}
