import { Node, mergeAttributes } from '@tiptap/core';
import Suggestion from '@tiptap/suggestion';
import { PluginKey } from '@tiptap/pm/state';

// Chave própria para esta Suggestion não colidir com a do slashExtension na
// chave padrão `suggestion$` (senão o ProseMirror derruba o editor com
// "Adding different instances of a keyed plugin").
export const noteLinkSuggestionPluginKey = new PluginKey('noteLinkSuggestion');

const SEM_TITULO = 'Sem título';

export default Node.create({
  name: 'noteLink',

  group: 'inline',
  inline: true,
  selectable: true,
  atom: true,

  addAttributes() {
    return {
      'data-note-id': {
        default: null,
      },
      class: {
        default: 'note-link text-[var(--accent)] cursor-pointer hover:underline',
      },
      // O título é ATRIBUTO, não conteúdo: este nó é `atom`, e nó atômico não
      // guarda filhos. Antes o título era passado como `content: [text]` na
      // inserção e o ProseMirror o descartava — o link aparecia vazio.
      title: {
        default: SEM_TITULO,
        parseHTML: (element) => element.textContent?.trim() || SEM_TITULO,
        renderHTML: () => ({}),
      },
    };
  },

  parseHTML() {
    // `:not(.sub-page-link)` separa este nó do bloco de sub-página, que também
    // serializa com `data-note-id`. Sem isto os dois disputam o mesmo HTML e o
    // bloco de sub-página volta do banco como link inline.
    return [
      {
        tag: 'a[data-note-id]:not(.sub-page-link)',
      },
    ];
  },

  renderHTML({ HTMLAttributes, node }) {
    // Sem buraco de conteúdo (`0`): num nó atômico o ProseMirror recusa com
    // "Content hole not allowed in a leaf node spec" e derruba o getHTML()
    // inteiro — o que travava o salvamento da nota, não só deste link.
    return ['a', mergeAttributes(HTMLAttributes), node.attrs.title || SEM_TITULO];
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
        pluginKey: noteLinkSuggestionPluginKey,
      }),
    ];
  },
});
