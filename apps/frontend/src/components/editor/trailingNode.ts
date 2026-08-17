import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';

/**
 * Mantém sempre um parágrafo vazio no fim do documento.
 *
 * Sem isto, um bloco de código (ou toggle, callout, sub-página) no fim da nota
 * não deixa como escrever depois dele: não existe posição de texto após o
 * último nó, então clicar na área vazia abaixo não faz nada e a seta para baixo
 * não tem para onde ir. O StarterKit não traz esse comportamento.
 *
 * A regra é: se o último nó não é um parágrafo, acrescenta um. Depois de
 * inserir, o último nó já é um parágrafo — não há laço.
 */
export const TrailingNode = Extension.create({
  name: 'trailingNode',

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey(this.name),
        appendTransaction: (transactions, _oldState, newState) => {
          if (!transactions.some(tr => tr.docChanged)) return null;
          const last = newState.doc.lastChild;
          if (!last || last.type.name === 'paragraph') return null;
          const paragraph = newState.schema.nodes.paragraph.createAndFill();
          if (!paragraph) return null;
          return newState.tr.insert(newState.doc.content.size, paragraph);
        },
      }),
    ];
  },
});

export default TrailingNode;
