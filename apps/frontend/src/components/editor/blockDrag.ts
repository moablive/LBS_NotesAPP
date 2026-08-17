/**
 * Estado compartilhado do arrasto que atravessa a fronteira do editor.
 *
 * O ProseMirror só sabe mover conteúdo dentro do próprio documento. Para levar
 * um bloco para OUTRA página (soltando na árvore lateral) e para trazer uma
 * página da árvore para dentro do texto, os dois lados precisam de um canal
 * fora do documento — é este módulo, mais os MIMEs abaixo no dataTransfer.
 */

/** Bloco saindo do editor (o dado real vai no módulo, o MIME só sinaliza). */
export const BLOCK_MIME = 'application/x-notesapp-block';
/** Página saindo da árvore lateral; o valor é o id da nota. */
export const PAGE_MIME = 'application/x-notesapp-page';

type BlockDrag = {
  /** HTML serializado do bloco arrastado. */
  html: string;
  /** Remove o bloco da origem — só é chamado se algo de fora aceitar o drop. */
  remove: (() => void) | null;
};

export const blockDrag: BlockDrag = { html: '', remove: null };

export function startBlockDrag(html: string, remove: () => void) {
  blockDrag.html = html;
  blockDrag.remove = remove;
}

export function clearBlockDrag() {
  blockDrag.html = '';
  blockDrag.remove = null;
}
