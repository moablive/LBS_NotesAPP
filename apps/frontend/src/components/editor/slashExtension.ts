import { Extension } from '@tiptap/core'
import Suggestion from '@tiptap/suggestion'
import { PluginKey } from '@tiptap/pm/state'

// Chave própria: sem ela, esta Suggestion e a do NoteLinkExtension colidem na
// chave padrão `suggestion$`, e o ProseMirror lança "Adding different instances
// of a keyed plugin" ao montar o editor (quebrando a nota inteira).
export const slashSuggestionPluginKey = new PluginKey('slashSuggestion')

export default Extension.create({
  name: 'slashCommands',

  addOptions() {
    return {
      suggestion: {
        char: '/',
        command: ({ editor, range, props }: any) => {
          props.command({ editor, range })
        },
      },
    }
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
        pluginKey: slashSuggestionPluginKey,
      }),
    ]
  },
})
