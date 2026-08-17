import { Node, mergeAttributes } from '@tiptap/core';
import { VueNodeViewRenderer } from '@tiptap/vue-3';
import { TextSelection } from '@tiptap/pm/state';
import CalloutView from './CalloutView.vue';

/** Cores do callout — os tons ficam no CSS (`.callout[data-color=…]`). */
export const CALLOUT_COLORS: ReadonlyArray<{ value: string; label: string }> = [
  { value: 'gray', label: 'Cinza' },
  { value: 'blue', label: 'Azul' },
  { value: 'green', label: 'Verde' },
  { value: 'yellow', label: 'Amarelo' },
  { value: 'orange', label: 'Laranja' },
  { value: 'red', label: 'Vermelho' },
  { value: 'purple', label: 'Roxo' },
];

export const DEFAULT_CALLOUT_ICON = '💡';

/**
 * Callout (caixa de destaque) estilo Notion, com ícone, cor e recolhimento.
 *
 * Aceita `block+` em vez de só texto: assim dá para colocar lista, código ou
 * até um toggle dentro dele. Recolher esconde tudo menos o primeiro bloco, que
 * fica valendo como título da caixa.
 */
export const Callout = Node.create({
  name: 'callout',
  group: 'block',
  content: 'block+',
  defining: true,

  addAttributes() {
    return {
      icon: {
        default: DEFAULT_CALLOUT_ICON,
        parseHTML: element => element.getAttribute('data-icon') || DEFAULT_CALLOUT_ICON,
        renderHTML: attributes => ({ 'data-icon': attributes.icon || DEFAULT_CALLOUT_ICON }),
      },
      color: {
        default: 'gray',
        parseHTML: element => element.getAttribute('data-color') || 'gray',
        renderHTML: attributes => ({ 'data-color': attributes.color || 'gray' }),
      },
      open: {
        default: true,
        parseHTML: element => element.getAttribute('data-open') !== 'false',
        renderHTML: attributes => ({ 'data-open': attributes.open ? 'true' : 'false' }),
      },
    };
  },

  parseHTML() {
    return [{ tag: 'div[data-callout]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes({ 'data-callout': '', class: 'callout' }, HTMLAttributes),
      0,
    ];
  },

  addNodeView() {
    return VueNodeViewRenderer(CalloutView);
  },

  addCommands() {
    return {
      setCallout:
        (attrs = {}) =>
        ({ state, chain }) => {
          const { $from } = state.selection;
          if ($from.depth === 0) return false;

          const block = $from.parent;
          // Parágrafo: converte a linha (o texto entra na caixa). Qualquer outro
          // bloco — título, código — fica intacto e a caixa entra depois dele.
          const convert = block.type.name === 'paragraph';
          const at = convert ? $from.before($from.depth) : $from.after($from.depth);
          const range = convert ? { from: at, to: at + block.nodeSize } : { from: at, to: at };
          const text = convert && block.content.size ? block.content.toJSON() : undefined;

          return chain()
            .insertContentAt(range, {
              type: this.name,
              attrs: { icon: DEFAULT_CALLOUT_ICON, color: 'gray', open: true, ...attrs },
              content: [{ type: 'paragraph', ...(text ? { content: text } : {}) }],
            })
            // +2: dentro do callout e dentro do primeiro parágrafo; o tamanho do
            // texto move o cursor para o fim do que foi convertido.
            .setTextSelection(at + 2 + (text ? block.content.size : 0))
            .focus()
            .run();
        },

      /** Dissolve a caixa, mantendo os blocos de dentro. */
      unsetCallout:
        () =>
        ({ state, tr, dispatch }) => {
          const { $from } = state.selection;
          for (let depth = $from.depth; depth > 0; depth--) {
            const node = $from.node(depth);
            if (node.type.name !== this.name) continue;
            if (!dispatch) return true;
            const start = $from.before(depth);
            tr.replaceWith(start, start + node.nodeSize, node.content);
            tr.setSelection(TextSelection.create(tr.doc, start + 1));
            return true;
          }
          return false;
        },
    };
  },

  addKeyboardShortcuts() {
    return {
      // Mesma saída do toggle: Enter num parágrafo vazio no fim sai da caixa.
      Enter: ({ editor }) => {
        const { state } = editor;
        const { $from, empty } = state.selection;
        if (!empty) return false;
        if (!$from.parent.isTextblock || $from.parent.content.size > 0) return false;
        if ($from.depth < 2 || $from.node(-1).type.name !== this.name) return false;

        const callout = $from.node(-1);
        const isLastChild = $from.index(-1) === callout.childCount - 1;
        if (!isLastChild || callout.childCount < 2) return false;

        const start = $from.before(-1);
        const end = start + callout.nodeSize;

        return editor
          .chain()
          .command(({ tr, dispatch }) => {
            if (!dispatch) return true;
            const paragraph = state.schema.nodes.paragraph.createAndFill();
            if (!paragraph) return false;
            tr.delete($from.before(), $from.after());
            const insertAt = tr.mapping.map(end);
            tr.insert(insertAt, paragraph);
            tr.setSelection(TextSelection.create(tr.doc, insertAt + 1));
            return true;
          })
          .focus()
          .run();
      },
      // Backspace no início do primeiro bloco vazio dissolve a caixa.
      Backspace: ({ editor }) => {
        const { $from, empty } = editor.state.selection;
        if (!empty || $from.parentOffset !== 0) return false;
        if ($from.depth < 2 || $from.node(-1).type.name !== this.name) return false;
        if ($from.index(-1) !== 0 || $from.parent.content.size > 0) return false;
        return editor.commands.unsetCallout();
      },
    };
  },
});

export default Callout;
