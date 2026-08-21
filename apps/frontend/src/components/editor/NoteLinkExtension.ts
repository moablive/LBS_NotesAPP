import { Node, mergeAttributes } from '@tiptap/core';
import Suggestion from '@tiptap/suggestion';
import { PluginKey } from '@tiptap/pm/state';

// Chave própria para esta Suggestion não colidir com a do slashExtension na
// chave padrão `suggestion$` (senão o ProseMirror derruba o editor com
// "Adding different instances of a keyed plugin").
export const noteLinkSuggestionPluginKey = new PluginKey('noteLinkSuggestion');

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
    };
  },

  parseHTML() {
    return [
      {
        tag: 'a[data-note-id]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['a', mergeAttributes(HTMLAttributes), 0];
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
