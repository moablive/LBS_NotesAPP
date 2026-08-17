import { Node, mergeAttributes } from '@tiptap/core';
import { VueNodeViewRenderer } from '@tiptap/vue-3';
import { Fragment } from '@tiptap/pm/model';
import { TextSelection } from '@tiptap/pm/state';
import ToggleBlockView from './ToggleBlockView.vue';

/**
 * Lista recolhível estilo Notion.
 *
 * São três nós porque o resumo (a linha sempre visível) e o corpo (o que
 * esconde) precisam ser blocos distintos — só assim recolher não apaga nem
 * esconde o título:
 *
 *   toggleList  → <details data-open>
 *     toggleSummary  → <summary>   (inline: o título)
 *     toggleContent  → <div data-toggle-content>  (block+: o conteúdo)
 *
 * A extensão oficial de Details é paga, então o nó é próprio. Serializa como
 * `<details>/<summary>`, que volta a ser lido pelo parseHTML sem perda.
 */

export const ToggleSummary = Node.create({
  name: 'toggleSummary',
  content: 'inline*',
  defining: true,

  parseHTML() {
    return [{ tag: 'summary' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['summary', mergeAttributes({ class: 'toggle-summary' }, HTMLAttributes), 0];
  },

  addKeyboardShortcuts() {
    return {
      // Enter no resumo desce para o conteúdo (e abre o toggle), como no Notion,
      // em vez de tentar criar um segundo resumo — que o schema não permite.
      Enter: ({ editor }) => {
        const { $from, empty } = editor.state.selection;
        if (!empty || $from.parent.type.name !== this.name) return false;
        const summaryEnd = $from.after($from.depth);
        return editor
          .chain()
          .updateAttributes('toggleList', { open: true })
          // +2: entra no toggleContent e no primeiro bloco dele.
          .setTextSelection(summaryEnd + 2)
          .focus()
          .run();
      },
      // Backspace no início de um resumo vazio desfaz o toggle em vez de travar.
      Backspace: ({ editor }) => {
        const { $from, empty } = editor.state.selection;
        if (!empty || $from.parent.type.name !== this.name) return false;
        if ($from.parentOffset !== 0 || $from.parent.content.size > 0) return false;
        return editor.commands.unsetToggleList();
      },
    };
  },
});

export const ToggleContent = Node.create({
  name: 'toggleContent',
  content: 'block+',

  parseHTML() {
    return [{ tag: 'div[data-toggle-content]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes({ 'data-toggle-content': '', class: 'toggle-content' }, HTMLAttributes),
      0,
    ];
  },

  addKeyboardShortcuts() {
    return {
      // Enter num parágrafo vazio no fim do conteúdo sai do toggle. Sem isto, um
      // toggle no fim da nota prende o cursor sem jeito de escrever depois dele.
      Enter: ({ editor }) => {
        const { state } = editor;
        const { $from, empty } = state.selection;
        if (!empty) return false;
        if (!$from.parent.isTextblock || $from.parent.content.size > 0) return false;
        if ($from.depth < 3 || $from.node(-1).type.name !== this.name) return false;

        const content = $from.node(-1);
        const isLastChild = $from.index(-1) === content.childCount - 1;
        // Único bloco: deixa o Enter padrão criar o segundo (sempre sobra saída).
        if (!isLastChild || content.childCount < 2) return false;

        const toggleStart = $from.before(-2);
        const toggleEnd = toggleStart + $from.node(-2).nodeSize;

        return editor
          .chain()
          .command(({ tr, dispatch }) => {
            if (!dispatch) return true;
            const paragraph = state.schema.nodes.paragraph.createAndFill();
            if (!paragraph) return false;
            tr.delete($from.before(), $from.after());
            const insertAt = tr.mapping.map(toggleEnd);
            tr.insert(insertAt, paragraph);
            tr.setSelection(TextSelection.create(tr.doc, insertAt + 1));
            return true;
          })
          .focus()
          .run();
      },
    };
  },
});

export const ToggleList = Node.create({
  name: 'toggleList',
  group: 'block',
  content: 'toggleSummary toggleContent',
  defining: true,

  addAttributes() {
    return {
      open: {
        default: true,
        parseHTML: element => element.getAttribute('data-open') !== 'false',
        renderHTML: attributes => ({
          'data-open': attributes.open ? 'true' : 'false',
          // `open` nativo mantém o HTML salvo legível fora do editor.
          ...(attributes.open ? { open: 'open' } : {}),
        }),
      },
      // Emoji, URL ou data URL — o mesmo formato do ícone da nota e do callout.
      icon: {
        default: null,
        parseHTML: element => element.getAttribute('data-icon') || null,
        renderHTML: attributes => (attributes.icon ? { 'data-icon': attributes.icon } : {}),
      },
    };
  },

  parseHTML() {
    return [{ tag: 'details' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['details', mergeAttributes({ class: 'toggle-block' }, HTMLAttributes), 0];
  },

  addNodeView() {
    return VueNodeViewRenderer(ToggleBlockView);
  },

  addCommands() {
    return {
      /** Cria um toggle vazio e deixa o cursor no resumo. */
      setToggleList:
        () =>
        ({ state, chain }) => {
          const { $from } = state.selection;
          if ($from.depth === 0) return false;

          const block = $from.parent;
          // Parágrafo: a linha vira o resumo do toggle. Outros blocos ficam
          // intactos e o toggle entra depois deles.
          const convert = block.type.name === 'paragraph';
          const at = convert ? $from.before($from.depth) : $from.after($from.depth);
          const range = convert ? { from: at, to: at + block.nodeSize } : { from: at, to: at };
          const text = convert && block.content.size ? block.content.toJSON() : undefined;

          return chain()
            .insertContentAt(range, {
              type: this.name,
              attrs: { open: true },
              content: [
                { type: 'toggleSummary', ...(text ? { content: text } : {}) },
                { type: 'toggleContent', content: [{ type: 'paragraph' }] },
              ],
            })
            // +2: dentro do toggleList e dentro do toggleSummary; o tamanho do
            // texto leva o cursor para o fim do que foi convertido.
            .setTextSelection(at + 2 + (text ? block.content.size : 0))
            .focus()
            .run();
        },

      /** Desfaz o toggle: o resumo volta a ser parágrafo e o conteúdo sobe. */
      unsetToggleList:
        () =>
        ({ state, tr, dispatch }) => {
          const { $from } = state.selection;
          for (let depth = $from.depth; depth > 0; depth--) {
            const node = $from.node(depth);
            if (node.type.name !== this.name) continue;
            if (!dispatch) return true;

            const start = $from.before(depth);
            const summary = node.child(0);
            const content = node.child(1);
            const paragraph = state.schema.nodes.paragraph.create(null, summary.content);
            tr.replaceWith(start, start + node.nodeSize, Fragment.from(paragraph).append(content.content));
            tr.setSelection(TextSelection.create(tr.doc, start + 1));
            return true;
          }
          return false;
        },
    };
  },
});

export default [ToggleList, ToggleSummary, ToggleContent];
