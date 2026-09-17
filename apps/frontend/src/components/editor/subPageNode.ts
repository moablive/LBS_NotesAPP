import { Node, mergeAttributes } from '@tiptap/core';
import { VueNodeViewRenderer } from '@tiptap/vue-3';
import SubPageBlock from './SubPageBlock.vue';
import { SUB_PAGE_FALLBACK_TITLE } from './subPageHtml';

/**
 * Sub-página dentro do conteúdo da nota (estilo Notion).
 *
 * Por que um nó próprio: o StarterKit não traz a extensão Link, então o
 * `<a data-note-id="…">` que o comando "/Page" inseria não existia no schema do
 * ProseMirror e era descartado — sobrava só o texto do título, sem link nenhum.
 *
 * É um nó de BLOCO (e não inline): no Notion a página filha é uma linha própria,
 * arrastável, e não um trecho de texto. O NodeView (SubPageBlock.vue) lê título
 * e ícone da store, então renomear a filha atualiza o bloco na hora.
 */
export const SubPageLink = Node.create({
  name: 'subPageLink',
  group: 'block',
  atom: true,
  selectable: true,
  draggable: true,

  addAttributes() {
    return {
      noteId: {
        default: null,
        parseHTML: (element) => element.getAttribute('data-note-id'),
        renderHTML: (attributes) =>
          attributes.noteId ? { 'data-note-id': attributes.noteId } : {},
      },
      title: {
        default: SUB_PAGE_FALLBACK_TITLE,
        // Ao recarregar o HTML salvo o título vem do texto do link; o 📄 é
        // decoração do render e não deve entrar de novo no atributo.
        parseHTML: (element) =>
          element.textContent?.replace(/^\s*📄\s*/, '').trim() || SUB_PAGE_FALLBACK_TITLE,
        renderHTML: () => ({}),
      },
    };
  },

  parseHTML() {
    // `a.sub-page-link`, e NÃO `a[data-note-id]`: o noteLink (o link inline de
    // `[[nota]]`) também serializa com `data-note-id`, então a regra genérica
    // casava nos dois nós. Com prioridades iguais, quem vencia era o noteLink
    // — registrado antes no TiptapEditor —, e todo bloco de sub-página voltava
    // do banco como link inline, perdendo o título (noteLink é atom) e
    // quebrando o `getHTML()` seguinte. Resultado prático: a página dentro da
    // página sumia sozinha depois de reabrir.
    //
    // A classe já era emitida pelo `subPageBlockHtml` e pelo `renderHTML` daqui
    // desde sempre, então conteúdo antigo continua sendo reconhecido.
    return [{ tag: 'a.sub-page-link', priority: 60 }];
  },

  renderHTML({ HTMLAttributes, node }) {
    return [
      'a',
      mergeAttributes({ href: '#', class: 'sub-page-link' }, HTMLAttributes),
      `📄 ${node.attrs.title || SUB_PAGE_FALLBACK_TITLE}`,
    ];
  },

  addNodeView() {
    return VueNodeViewRenderer(SubPageBlock);
  },
});

export default SubPageLink;
