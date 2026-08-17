import { Extension } from '@tiptap/core';
import type { Editor } from '@tiptap/core';
import { NodeSelection, Plugin, PluginKey } from '@tiptap/pm/state';
import { dropPoint } from '@tiptap/pm/transform';
import type { EditorView } from '@tiptap/pm/view';
import { DOMSerializer, type Node as ProseMirrorNode } from '@tiptap/pm/model';
import { useNotesStore } from '@/stores/notes';
import { BLOCK_MIME, PAGE_MIME, clearBlockDrag, startBlockDrag } from './blockDrag';

/**
 * Alça de bloco estilo Notion: ao passar o mouse aparece "+ ⠿" à esquerda do
 * bloco. O ⠿ arrasta o bloco para qualquer lugar — inclusive para DENTRO de um
 * callout ou toggle, já que esses nós aceitam `block+` e o ProseMirror só
 * permite soltar onde o schema deixa.
 *
 * Feito à mão porque a extensão de drag handle do tiptap é paga.
 *
 * O drop também é tratado aqui, em listeners de CAPTURA no DOM do editor, e não
 * pelos props `handleDrop`/`dropcursor` do ProseMirror. Motivo: o `stopEvent`
 * do NodeView do tiptap devolve `true` para eventos `drag*` que caem no DOM de
 * um node view (fora do contentDOM), e o ProseMirror ignora esses eventos. Sem
 * o `dragover` chegando nele, ninguém chama `preventDefault()` e o navegador
 * recusa o drop — era por isso que soltar em cima de um bloco de código, bloco
 * de página ou callout simplesmente não fazia nada.
 *
 * A alça vive no `document.body` com `position: fixed`: dentro do editor ela
 * seria conteúdo editável, e presa a um ancestral seria cortada pelo
 * `overflow` das colunas.
 */

const GUTTER = 56; // distância à esquerda do bloco onde a alça pode ser alcançada
const HANDLE_OFFSET = 4;

type Target = { pos: number; node: ProseMirrorNode; dom: HTMLElement };

/** Bloco sob o ponteiro. `inside` já entrega o nó mais interno que contém o ponto. */
function blockAt(view: EditorView, left: number, top: number): { pos: number; node: ProseMirrorNode } | null {
  const found = view.posAtCoords({ left, top });
  if (!found) return null;

  if (found.inside >= 0) {
    const node = view.state.doc.resolve(found.inside).nodeAfter;
    if (node && node.isBlock) return { pos: found.inside, node };
  }

  // Fora de qualquer nó (entre blocos): sobe até o bloco que contém a posição.
  const $pos = view.state.doc.resolve(found.pos);
  for (let depth = $pos.depth; depth > 0; depth--) {
    const node = $pos.node(depth);
    if (node.isBlock) return { pos: $pos.before(depth), node };
  }
  return null;
}

function icon(paths: string): string {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;
}

const PLUS_ICON = icon('<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>');
const GRIP_ICON = icon(
  '<circle cx="9" cy="6" r="1.4" fill="currentColor" stroke="none"/><circle cx="15" cy="6" r="1.4" fill="currentColor" stroke="none"/>' +
    '<circle cx="9" cy="12" r="1.4" fill="currentColor" stroke="none"/><circle cx="15" cy="12" r="1.4" fill="currentColor" stroke="none"/>' +
    '<circle cx="9" cy="18" r="1.4" fill="currentColor" stroke="none"/><circle cx="15" cy="18" r="1.4" fill="currentColor" stroke="none"/>',
);

class BlockHandleView {
  private target: Target | null = null;
  private readonly root: HTMLElement;
  private readonly addButton: HTMLButtonElement;
  private readonly dragButton: HTMLButtonElement;
  /** Linha que mostra onde o bloco vai cair (o dropcursor do PM não recebe
      os eventos, pelo mesmo motivo do preventDefault acima). */
  private readonly indicator: HTMLElement;

  constructor(
    private view: EditorView,
    private readonly editor: Editor,
  ) {
    this.root = document.createElement('div');
    this.root.className = 'block-handle';
    this.root.setAttribute('aria-hidden', 'true');

    this.addButton = document.createElement('button');
    this.addButton.type = 'button';
    this.addButton.className = 'block-handle__btn';
    this.addButton.title = 'Adicionar bloco abaixo';
    this.addButton.innerHTML = PLUS_ICON;

    this.dragButton = document.createElement('button');
    this.dragButton.type = 'button';
    this.dragButton.className = 'block-handle__btn block-handle__btn--drag';
    this.dragButton.title = 'Arraste para mover';
    this.dragButton.draggable = true;
    this.dragButton.innerHTML = GRIP_ICON;

    this.root.append(this.addButton, this.dragButton);
    document.body.appendChild(this.root);

    this.indicator = document.createElement('div');
    this.indicator.className = 'block-drop-indicator';
    document.body.appendChild(this.indicator);

    this.addButton.addEventListener('click', this.onAdd);
    this.dragButton.addEventListener('dragstart', this.onDragStart);
    this.dragButton.addEventListener('dragend', this.onDragEnd);
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('scroll', this.onScroll, true);
    // Captura: precisamos rodar ANTES do roteamento do tiptap. O stopEvent do
    // NodeView devolve true para eventos drag* que caem no DOM de um node view,
    // o ProseMirror então ignora o dragover e ninguém chama preventDefault —
    // o navegador recusa o drop. Daí "não dá para soltar em cima do bloco".
    view.dom.addEventListener('dragover', this.onEditorDragOver, true);
    view.dom.addEventListener('drop', this.onEditorDrop, true);
    view.dom.addEventListener('dragleave', this.onEditorDragLeave, true);
  }

  update(view: EditorView) {
    this.view = view;
  }

  destroy() {
    this.addButton.removeEventListener('click', this.onAdd);
    this.dragButton.removeEventListener('dragstart', this.onDragStart);
    this.dragButton.removeEventListener('dragend', this.onDragEnd);
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('scroll', this.onScroll, true);
    this.view.dom.removeEventListener('dragover', this.onEditorDragOver, true);
    this.view.dom.removeEventListener('drop', this.onEditorDrop, true);
    this.view.dom.removeEventListener('dragleave', this.onEditorDragLeave, true);
    this.root.remove();
    this.indicator.remove();
  }

  private hide() {
    this.target = null;
    this.root.classList.remove('is-visible');
  }

  private onScroll = () => this.hide();

  private onMouseMove = (event: MouseEvent) => {
    // Sobre a própria alça: mantém o alvo atual, senão ela sumiria ao ser usada.
    if (this.root.contains(event.target as HTMLElement)) return;

    const editorRect = this.view.dom.getBoundingClientRect();
    const { clientX: x, clientY: y } = event;
    const inRange =
      x >= editorRect.left - GUTTER && x <= editorRect.right && y >= editorRect.top && y <= editorRect.bottom;
    if (!inRange) {
      this.hide();
      return;
    }

    // Na faixa da alça o ponteiro está fora do texto; projeta para dentro da
    // coluna para descobrir de qual linha ele está ao lado.
    const found = blockAt(this.view, Math.max(x, editorRect.left + 1), y);
    if (!found) {
      this.hide();
      return;
    }

    const dom = this.view.nodeDOM(found.pos);
    if (!(dom instanceof HTMLElement)) {
      this.hide();
      return;
    }

    this.target = { ...found, dom };
    const rect = dom.getBoundingClientRect();
    this.root.style.top = `${rect.top + HANDLE_OFFSET}px`;
    this.root.style.left = `${Math.max(4, rect.left - this.root.offsetWidth - HANDLE_OFFSET)}px`;
    this.root.classList.add('is-visible');
  };

  /** "+" insere um parágrafo abaixo e abre o menu de blocos, como no Notion. */
  private onAdd = () => {
    if (!this.target) return;
    const after = this.target.pos + this.target.node.nodeSize;
    this.editor
      .chain()
      .insertContentAt(after, { type: 'paragraph' })
      .setTextSelection(after + 1)
      .focus()
      .insertContent('/')
      .run();
    this.hide();
  };

  private onDragStart = (event: DragEvent) => {
    if (!this.target || !event.dataTransfer) return;
    const { view } = this;
    const { pos, dom, node } = this.target;

    // A seleção de nó é o que o ProseMirror apaga na origem ao soltar (move).
    view.dispatch(view.state.tr.setSelection(NodeSelection.create(view.state.doc, pos)));
    view.dragging = { slice: view.state.selection.content(), move: true };

    // Canal paralelo para a árvore lateral: se o bloco for solto sobre outra
    // página, ela precisa do HTML e de como apagar o original daqui.
    startBlockDrag(serializeNode(view, node), () => this.editor.commands.deleteSelection());

    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData(BLOCK_MIME, '1');
    // Sem dado algum o navegador cancela o arrasto antes de começar.
    event.dataTransfer.setData('text/plain', node.textContent || ' ');
    event.dataTransfer.setDragImage(dom, 8, 8);
    this.root.classList.add('is-dragging');
  };

  private onDragEnd = () => {
    this.view.dragging = null;
    clearBlockDrag();
    this.root.classList.remove('is-dragging');
    this.hideIndicator();
    this.hide();
  };

  // ── Drop dentro do editor ───────────────────────────────────────────────
  // Tudo daqui para baixo roda em captura, antes do tiptap/ProseMirror.

  /** Alvo do drop: em qual bloco, e se entra antes ou depois dele. */
  private dropAt(event: DragEvent): { pos: number; rect: DOMRect; below: boolean } | null {
    const found = blockAt(this.view, event.clientX, event.clientY);
    if (!found) return null;
    const dom = this.view.nodeDOM(found.pos);
    if (!(dom instanceof HTMLElement)) return null;
    const rect = dom.getBoundingClientRect();

    // Título de toggle: soltar ali quer dizer "dentro do toggle".
    if (found.node.type.name === 'toggleSummary') {
      return { pos: found.pos + found.node.nodeSize + 1, rect, below: true };
    }

    const below = event.clientY > rect.top + rect.height / 2;
    return { pos: below ? found.pos + found.node.nodeSize : found.pos, rect, below };
  }

  private canAccept(event: DragEvent): boolean {
    return !!this.view.dragging || !!event.dataTransfer?.types.includes(PAGE_MIME);
  }

  private onEditorDragOver = (event: DragEvent) => {
    if (!this.canAccept(event)) return;
    const target = this.dropAt(event);
    if (!target) {
      this.hideIndicator();
      return;
    }
    // Sem este preventDefault o navegador nem dispara o drop.
    event.preventDefault();
    if (event.dataTransfer) event.dataTransfer.dropEffect = 'move';
    expandToggleUnder(this.view, event);
    this.showIndicator(target.rect, target.below);
  };

  private onEditorDragLeave = (event: DragEvent) => {
    if (this.view.dom.contains(event.relatedTarget as Node)) return;
    this.hideIndicator();
  };

  private onEditorDrop = (event: DragEvent) => {
    if (!this.canAccept(event)) return;
    const target = this.dropAt(event);
    this.hideIndicator();
    if (!target) return;

    event.preventDefault();
    event.stopPropagation(); // já tratado aqui; o ProseMirror não deve repetir

    const { view } = this;
    const pageId = event.dataTransfer?.getData(PAGE_MIME);
    if (pageId) {
      dropPage(view, this.editor, target.pos, pageId);
      return;
    }

    const dragging = view.dragging;
    if (!dragging) return;
    const { selection } = view.state;
    const move = dragging.move;
    // Soltar dentro do próprio bloco arrastado não faz nada.
    if (move && target.pos >= selection.from && target.pos <= selection.to) {
      view.dragging = null;
      return;
    }

    const tr = view.state.tr;
    let at = dropPoint(view.state.doc, target.pos, dragging.slice) ?? target.pos;
    if (move) {
      tr.delete(selection.from, selection.to);
      at = tr.mapping.map(at);
    }
    tr.replaceRange(at, at, dragging.slice);
    view.dispatch(tr.scrollIntoView());
    view.dragging = null;
    clearBlockDrag();
    this.editor.commands.focus();
  };

  private showIndicator(rect: DOMRect, below: boolean) {
    this.indicator.style.top = `${(below ? rect.bottom : rect.top) - 1}px`;
    this.indicator.style.left = `${rect.left}px`;
    this.indicator.style.width = `${rect.width}px`;
    this.indicator.classList.add('is-visible');
  }

  private hideIndicator() {
    this.indicator.classList.remove('is-visible');
  }
}

/** HTML do nó, no mesmo formato que o editor salva. */
function serializeNode(view: EditorView, node: ProseMirrorNode): string {
  const wrapper = document.createElement('div');
  wrapper.appendChild(DOMSerializer.fromSchema(view.state.schema).serializeNode(node));
  return wrapper.innerHTML;
}

/**
 * Se `pos` cai no TÍTULO de um toggle, devolve a posição dentro do conteúdo
 * dele; senão, null (e quem chama deixa o ProseMirror decidir).
 *
 * É o caso que fazia parecer que "não dá para mover para dentro do toggle": o
 * título é `inline*` e não aceita bloco, então o ProseMirror jogava o bloco
 * para fora. Só este caso é interceptado — para o resto o cálculo nativo do
 * ProseMirror (acima/abaixo conforme a metade da linha) é melhor que o nosso.
 */
function toggleSummaryDropPos(view: EditorView, pos: number): number | null {
  const $pos = view.state.doc.resolve(pos);
  for (let depth = $pos.depth; depth > 0; depth--) {
    if ($pos.node(depth).type.name === 'toggleSummary') return $pos.after(depth) + 1;
  }
  return null;
}

/** Posição de bloco válida mais próxima do drop (para inserir o nó de página). */
function blockDropPos(view: EditorView, pos: number): number {
  const summary = toggleSummaryDropPos(view, pos);
  if (summary !== null) return summary;
  const $pos = view.state.doc.resolve(pos);
  for (let depth = $pos.depth; depth > 0; depth--) {
    if ($pos.node(depth).isTextblock) return $pos.after(depth);
  }
  return pos;
}

/** Toggle recolhido sob o ponteiro abre sozinho, como pasta em gerenciador de arquivos. */
function expandToggleUnder(view: EditorView, event: DragEvent) {
  const found = view.posAtCoords({ left: event.clientX, top: event.clientY });
  if (!found) return;
  const $pos = view.state.doc.resolve(found.inside >= 0 ? found.inside : found.pos);
  for (let depth = $pos.depth; depth > 0; depth--) {
    const node = $pos.node(depth);
    if (node.type.name !== 'toggleList') continue;
    if (node.attrs.open !== false) return;
    view.dispatch(view.state.tr.setNodeMarkup($pos.before(depth), undefined, { ...node.attrs, open: true }));
    return;
  }
}

export const BlockHandle = Extension.create({
  name: 'blockHandle',

  addProseMirrorPlugins() {
    const editor = this.editor;
    return [
      new Plugin({
        key: new PluginKey('blockHandle'),
        view: view => new BlockHandleView(view, editor),
      }),
    ];
  },
});

/**
 * Insere o bloco de uma página existente na posição do drop e reparenta a
 * página para a nota aberta. Se ela já tinha um bloco aqui, o antigo sai — do
 * contrário arrastar para reordenar duplicaria a página.
 */
function dropPage(view: EditorView, editor: Editor, pos: number, pageId: string) {
  const store = useNotesStore();
  const page = store.notes.find(n => n.id === pageId);
  const parentId = store.activeNoteId;
  if (!page || !parentId || pageId === parentId) return;
  // Ciclo: uma página não pode entrar em algo que está dentro dela.
  if (store.descendantIds(pageId).includes(parentId)) return;

  const type = view.state.schema.nodes.subPageLink;
  if (!type) return;

  const previous: number[] = [];
  view.state.doc.descendants((node, at) => {
    if (node.type === type && node.attrs.noteId === pageId) previous.push(at);
  });

  const tr = view.state.tr;
  let insertAt = blockDropPos(view, pos);
  // De trás para frente: apagar o de baixo não invalida as posições de cima.
  for (const at of previous.sort((a, b) => b - a)) {
    const node = view.state.doc.nodeAt(at);
    if (!node) continue;
    tr.delete(at, at + node.nodeSize);
    if (at < insertAt) insertAt -= node.nodeSize;
  }
  tr.insert(insertAt, type.create({ noteId: pageId, title: page.title }));
  view.dispatch(tr);

  // Reparenta depois de inserir: moveNote não duplica o bloco porque encontra
  // este que acabou de entrar no conteúdo.
  store.setDragging(null);
  void store.moveNote(pageId, parentId);
  editor.commands.focus();
}

export default BlockHandle;
