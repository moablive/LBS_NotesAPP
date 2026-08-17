<template>
  <div class="tiptap-editor-wrapper">
    <editor-content :editor="editor" class="prose max-w-none focus:outline-none" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { useEditor, EditorContent, VueRenderer, VueNodeViewRenderer } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import SlashCommands from './slashExtension';
import { SubPageLink } from './subPageNode';
import { ToggleContent, ToggleList, ToggleSummary } from './toggleNode';
import { Callout } from './calloutNode';
import { TrailingNode } from './trailingNode';
import { BlockHandle } from './blockHandle';
import { DEFAULT_CODE_LANGUAGE, lowlight } from './codeLanguages';
import CodeBlockView from './CodeBlockView.vue';
import tippy from 'tippy.js';
import CommandList from './CommandList.vue';
import NoteLinkExtension from './NoteLinkExtension';
import NoteLinkList from './NoteLinkList.vue';
import { useNotesStore } from '@/stores/notes';

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: 'Start writing your thoughts here...',
  }
});

const emit = defineEmits(['update:modelValue', 'blur', 'create-note']);

let popup: any;
let component: any;

const renderCommandList = () => {
  return {
    onStart: (props: any) => {
      component = new VueRenderer(CommandList, {
        props: {
          items: props.items,
          command: props.command,
        },
        editor: props.editor,
      });

      if (!props.clientRect) {
        return;
      }

      popup = tippy('body', {
        getReferenceClientRect: props.clientRect,
        appendTo: () => document.body,
        content: component.element,
        showOnCreate: true,
        interactive: true,
        trigger: 'manual',
        placement: 'bottom-start',
      });
    },

    onUpdate(props: any) {
      component.updateProps({
        items: props.items,
        command: props.command,
      });

      if (!props.clientRect) {
        return;
      }

      popup[0].setProps({
        getReferenceClientRect: props.clientRect,
      });
    },

    onKeyDown(props: any) {
      if (props.event.key === 'Escape') {
        popup[0].hide();
        return true;
      }

      return component.ref?.onKeyDown(props.event);
    },

    onExit() {
      popup[0].destroy();
      component.destroy();
    },
  };
};

let linkPopup: any;
let linkComponent: any;

const renderLinkList = () => {
  return {
    onStart: (props: any) => {
      linkComponent = new VueRenderer(NoteLinkList, {
        props: {
          items: props.items,
          command: props.command,
        },
        editor: props.editor,
      });

      if (!props.clientRect) {
        return;
      }

      linkPopup = tippy('body', {
        getReferenceClientRect: props.clientRect,
        appendTo: () => document.body,
        content: linkComponent.element,
        showOnCreate: true,
        interactive: true,
        trigger: 'manual',
        placement: 'bottom-start',
      });
    },
    onUpdate(props: any) {
      linkComponent.updateProps({
        items: props.items,
        command: props.command,
      });

      if (!props.clientRect) {
        return;
      }

      linkPopup[0].setProps({
        getReferenceClientRect: props.clientRect,
      });
    },
    onKeyDown(props: any) {
      if (props.event.key === 'Escape') {
        linkPopup[0].hide();
        return true;
      }
      return linkComponent.ref?.onKeyDown(props.event);
    },
    onExit() {
      linkPopup[0].destroy();
      linkComponent.destroy();
    },
  };
};

const editor = useEditor({
  content: props.modelValue,
  extensions: [
    StarterKit.configure({ codeBlock: false }),
    NoteLinkExtension.configure({
      suggestion: {
        char: '[[',
        items: ({ query }: { query: string }) => {
          const store = useNotesStore();
          return store.notes
            .filter(n => n.title.toLowerCase().includes(query.toLowerCase()))
            .slice(0, 10);
        },
        render: renderLinkList,
        command: ({ editor, range, props }: any) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .insertContent([
              {
                type: 'noteLink',
                attrs: { 'data-note-id': props.id },
                content: [{ type: 'text', text: props.title || 'Sem título' }],
              },
              { type: 'text', text: ' ' },
            ])
            .run();
        },
      },
    }),
    // codeBlock desligado: quem cuida dele é o CodeBlockLowlight abaixo, que
    // adiciona destaque de sintaxe ao mesmo nó (`codeBlock`).
    CodeBlockLowlight.extend({
      addNodeView() {
        return VueNodeViewRenderer(CodeBlockView);
      },
      addKeyboardShortcuts() {
        return {
          ...this.parent?.(),
          // Tab dentro do código indenta em vez de tirar o foco do editor.
          Tab: () => {
            if (!this.editor.isActive(this.name)) return false;
            return this.editor.commands.insertContent('  ');
          },
        };
      },
    }).configure({ lowlight, defaultLanguage: DEFAULT_CODE_LANGUAGE }),
    ToggleList,
    ToggleSummary,
    ToggleContent,
    Callout,
    SubPageLink,
    TrailingNode,
    BlockHandle,
    Placeholder.configure({
      placeholder: props.placeholder,
    }),
    SlashCommands.configure({
      suggestion: {
        items: ({ query }: { query: string }) => {
          return [
            {
              title: 'Heading 1',
              description: 'Big section heading.',
              icon: '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h8M4 18V6M12 18V6M17 12h3M17 18v-6M20 18v-6"/></svg>',
              command: ({ editor, range }: any) => {
                editor.chain().focus().deleteRange(range).setNode('heading', { level: 1 }).run();
              },
            },
            {
              title: 'Heading 2',
              description: 'Medium section heading.',
              icon: '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h8M4 18V6M12 18V6M17 12h4M17 18v-6M21 18v-6"/></svg>',
              command: ({ editor, range }: any) => {
                editor.chain().focus().deleteRange(range).setNode('heading', { level: 2 }).run();
              },
            },
            {
              title: 'Heading 3',
              description: 'Small section heading.',
              icon: '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h8M4 18V6M12 18V6M17 12h5M17 18v-6M22 18v-6"/></svg>',
              command: ({ editor, range }: any) => {
                editor.chain().focus().deleteRange(range).setNode('heading', { level: 3 }).run();
              },
            },
            {
              title: 'Bullet List',
              description: 'Create a simple bulleted list.',
              icon: '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>',
              command: ({ editor, range }: any) => {
                editor.chain().focus().deleteRange(range).toggleBulletList().run();
              },
            },
            {
              title: 'Code',
              description: 'Bloco de código com destaque de sintaxe.',
              icon: '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
              command: ({ editor, range }: any) => {
                editor.chain().focus().deleteRange(range).setCodeBlock().run();
              },
            },
            {
              title: 'Toggle list',
              description: 'Lista recolhível, estilo Notion.',
              icon: '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 6 13 10 9 14"/><line x1="17" y1="10" x2="21" y2="10"/><line x1="9" y1="19" x2="21" y2="19"/></svg>',
              command: ({ editor, range }: any) => {
                editor.chain().focus().deleteRange(range).setToggleList().run();
              },
            },
            {
              title: 'Callout',
              description: 'Caixa de destaque com ícone e cor.',
              icon: '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><line x1="8" y1="9" x2="8" y2="9.01"/><line x1="12" y1="9" x2="17" y2="9"/><line x1="8" y1="14" x2="17" y2="14"/></svg>',
              command: ({ editor, range }: any) => {
                editor.chain().focus().deleteRange(range).setCallout().run();
              },
            },
            {
              title: 'Page',
              description: 'Cria uma página dentro desta.',
              icon: '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>',
              command: ({ editor, range }: any) => {
                editor.chain().focus().deleteRange(range).run();
                // O DashboardView cria a nota filha e chama de volta com o id
                // dela para o link entrar aqui, no conteúdo da nota PAI.
                emit('create-note', (id: string, title: string) => {
                  editor
                    .chain()
                    .focus()
                    .insertContent([
                      { type: 'subPageLink', attrs: { noteId: id, title } },
                      // subPageLink é bloco atômico: sem o parágrafo seguinte o
                      // cursor ficaria preso e não haveria onde continuar escrevendo.
                      { type: 'paragraph' },
                    ])
                    .run();
                });
              },
            },
          ].filter(item => item.title.toLowerCase().includes(query.toLowerCase()));
        },
        render: renderCommandList,
      },
    }),
  ],
  onUpdate: () => {
    emit('update:modelValue', editor.value?.getHTML() || '');
  },
  onBlur: () => {
    emit('blur');
  },
});

watch(() => props.modelValue, (value) => {
  const isSame = editor.value?.getHTML() === value;
  if (!isSame && editor.value) {
    editor.value.commands.setContent(value, false);
  }
});

onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy();
  }
});
</script>

<style>
/* Tiptap styles */
.tiptap-editor-wrapper .ProseMirror {
  outline: none;
  /* Era 500px: empurrava a lista de sub-páginas (renderizada depois do editor)
     para fora da viewport, e a página filha parecia não existir. */
  min-height: 180px;
}
/* Bloco de sub-página (nó subPageLink, renderizado por SubPageBlock.vue) */
.tiptap-editor-wrapper .ProseMirror .sub-page-block.ProseMirror-selectednode {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
  border-radius: 8px;
}

/* ══ Chrome dos blocos ══════════════════════════════════════════════════════
   Cores da paleta Dracula (as variáveis vêm de styles/dracula.css). Só os
   blocos usam essa paleta; sidebar, modais e o resto do app seguem o tema do
   app (--bg, --accent…), senão a interface ficaria com dois temas brigando.

   Transições: 180ms com easing suave e nada de movimento — o que aparece no
   hover só faz fade. Versões anteriores usavam 120-150ms lineares com fundo de
   alto contraste, o que dava aquele efeito "seco". ────────────────────────── */
.tiptap-editor-wrapper {
  --block-ui: var(--dracula-comment);
  --block-ui-strong: var(--dracula-fg);
  --block-ui-bg: rgba(53, 55, 70, 0.55);
  --block-ease: cubic-bezier(0.25, 0.8, 0.35, 1);
}

/* ── Alça de bloco (+ e ⠿), montada no body pelo blockHandle ───────────── */
.block-handle {
  position: fixed;
  z-index: 60;
  display: flex;
  align-items: center;
  gap: 1px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.18s cubic-bezier(0.25, 0.8, 0.35, 1);
}
.block-handle.is-visible {
  opacity: 1;
  pointer-events: auto;
}
.block-handle.is-dragging {
  opacity: 0.55;
}
.block-handle__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.35rem;
  height: 1.5rem;
  border-radius: 5px;
  color: var(--dracula-comment);
  transition:
    background 0.18s cubic-bezier(0.25, 0.8, 0.35, 1),
    color 0.18s cubic-bezier(0.25, 0.8, 0.35, 1);
}
.block-handle__btn svg {
  width: 1rem;
  height: 1rem;
}
.block-handle__btn:hover {
  background: rgba(53, 55, 70, 0.55);
  color: var(--dracula-fg);
}
.block-handle__btn--drag {
  cursor: grab;
}
.block-handle__btn--drag:active {
  cursor: grabbing;
}

/* Linha que mostra onde o bloco vai cair. É nossa, não o dropcursor do
   ProseMirror: ele depende de eventos de drag que o tiptap não deixa passar
   quando o ponteiro está sobre um node view. */
.block-drop-indicator {
  position: fixed;
  z-index: 61;
  height: 2px;
  border-radius: 2px;
  background: var(--dracula-purple);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.14s cubic-bezier(0.25, 0.8, 0.35, 1);
}
.block-drop-indicator.is-visible {
  opacity: 0.9;
}

/* ── Toggle (lista recolhível) ─────────────────────────────────────────── */
.tiptap-editor-wrapper .toggle-block {
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.3rem;
  margin: 0.15rem 0;
}
.tiptap-editor-wrapper .toggle-block__gutter {
  display: flex;
  align-items: center;
  gap: 1px;
  height: 1.7rem;
}
.tiptap-editor-wrapper .toggle-block__chevron,
.tiptap-editor-wrapper .toggle-block__icon,
.tiptap-editor-wrapper .toggle-block__delete {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  color: var(--block-ui);
  transition:
    background 0.18s var(--block-ease),
    color 0.18s var(--block-ease),
    opacity 0.18s var(--block-ease);
}
.tiptap-editor-wrapper .toggle-block__chevron {
  width: 1.15rem;
  height: 1.4rem;
}
.tiptap-editor-wrapper .toggle-block__chevron:hover,
.tiptap-editor-wrapper .toggle-block__icon:hover {
  background: var(--block-ui-bg);
  color: var(--block-ui-strong);
}
.tiptap-editor-wrapper .toggle-block__chevron svg {
  transition: transform 0.18s var(--block-ease);
}
.tiptap-editor-wrapper .toggle-block[data-open='true'] .toggle-block__chevron svg {
  transform: rotate(90deg);
}
/* Ícone: só ocupa presença visual quando existe; vazio aparece no hover. */
.tiptap-editor-wrapper .toggle-block__icon {
  width: 1.5rem;
  height: 1.5rem;
  font-size: 0.95rem;
  line-height: 1;
  opacity: 0;
}
.tiptap-editor-wrapper .toggle-block__icon.is-set,
.tiptap-editor-wrapper .toggle-block:hover .toggle-block__icon {
  opacity: 1;
}
.tiptap-editor-wrapper .toggle-block__icon img {
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 4px;
  object-fit: cover;
}
.tiptap-editor-wrapper .toggle-block__delete {
  position: absolute;
  top: 0.2rem;
  right: 0;
  width: 1.1rem;
  height: 1.3rem;
  opacity: 0;
}
.tiptap-editor-wrapper .toggle-block:hover .toggle-block__delete {
  opacity: 0.75;
}
.tiptap-editor-wrapper .toggle-block__delete:hover {
  opacity: 1;
  background: var(--block-ui-bg);
  color: var(--dracula-red);
}
/* `<summary>` fora de `<details>` viria com marcador de lista do navegador. */
.tiptap-editor-wrapper .toggle-summary {
  display: block;
  list-style: none;
}
.tiptap-editor-wrapper .toggle-summary::marker,
.tiptap-editor-wrapper .toggle-summary::-webkit-details-marker {
  display: none;
  content: none;
}
.tiptap-editor-wrapper .toggle-content {
  padding-left: 0.15rem;
}
/* Recolher é só visual: o conteúdo continua no documento (e na busca). */
.tiptap-editor-wrapper .toggle-block[data-open='false'] .toggle-content {
  display: none;
}

/* ── Callout (caixa de destaque) ───────────────────────────────────────── */
.tiptap-editor-wrapper .callout {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.6rem;
  margin: 0.6rem 0;
  padding: 0.75rem 0.9rem;
  border-radius: 10px;
  border: 1px solid var(--callout-border, var(--dracula-guide));
  background: var(--callout-bg, rgba(53, 55, 70, 0.5));
}
.tiptap-editor-wrapper .callout__gutter {
  display: flex;
  align-items: center;
  gap: 0.15rem;
  height: 1.6rem;
}
.tiptap-editor-wrapper .callout__chevron,
.tiptap-editor-wrapper .callout__color,
.tiptap-editor-wrapper .callout__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  color: var(--block-ui);
  transition:
    background 0.18s var(--block-ease),
    color 0.18s var(--block-ease),
    opacity 0.18s var(--block-ease);
}
.tiptap-editor-wrapper .callout__chevron,
.tiptap-editor-wrapper .callout__color {
  width: 1.15rem;
  height: 1.15rem;
}
.tiptap-editor-wrapper .callout__chevron svg {
  transition: transform 0.18s var(--block-ease);
}
.tiptap-editor-wrapper .callout[data-open='true'] .callout__chevron svg {
  transform: rotate(90deg);
}
.tiptap-editor-wrapper .callout__icon {
  width: 1.6rem;
  height: 1.6rem;
  font-size: 1.05rem;
  line-height: 1;
}
.tiptap-editor-wrapper .callout__icon img {
  width: 1.35rem;
  height: 1.35rem;
  border-radius: 4px;
  object-fit: cover;
}
.tiptap-editor-wrapper .callout__icon:hover,
.tiptap-editor-wrapper .callout__chevron:hover {
  background: var(--block-ui-bg);
  color: var(--block-ui-strong);
}
/* Cor e excluir só aparecem no hover, para a caixa ficar limpa ao ler. */
.tiptap-editor-wrapper .callout__color {
  opacity: 0;
}
.tiptap-editor-wrapper .callout:hover .callout__color {
  opacity: 0.75;
}
.tiptap-editor-wrapper .callout__color:hover {
  opacity: 1;
  background: var(--block-ui-bg);
  color: var(--block-ui-strong);
}
.tiptap-editor-wrapper .callout__color-wrap {
  position: relative;
}
.tiptap-editor-wrapper .callout__color-menu {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  z-index: 30;
  display: flex;
  gap: 0.25rem;
  padding: 0.35rem;
  border-radius: 8px;
  background: var(--dracula-bg);
  border: 1px solid var(--dracula-guide);
  box-shadow: 0 10px 26px rgba(0, 0, 0, 0.4);
}
.tiptap-editor-wrapper .callout__color-option {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.15rem;
  height: 1.15rem;
  border-radius: 50%;
  color: var(--dracula-fg);
  border: 1px solid var(--callout-border);
  background: var(--callout-bg);
  transition: transform 0.18s var(--block-ease);
}
.tiptap-editor-wrapper .callout__color-option:hover {
  transform: scale(1.12);
}
.tiptap-editor-wrapper .callout__body > *:first-child {
  margin-top: 0;
}
.tiptap-editor-wrapper .callout__body > *:last-child {
  margin-bottom: 0;
}
/* Recolhido: sobra o primeiro bloco, que faz papel de título da caixa. */
.tiptap-editor-wrapper .callout[data-open='false'] .callout__body > *:not(:first-child) {
  display: none;
}

/* Paleta do callout — tons do Dracula (fundo 13%, borda 32%). */
.tiptap-editor-wrapper [data-color='gray'] {
  --callout-bg: rgba(98, 114, 164, 0.13);
  --callout-border: rgba(98, 114, 164, 0.32);
}
.tiptap-editor-wrapper [data-color='blue'] {
  --callout-bg: rgba(139, 233, 253, 0.13);
  --callout-border: rgba(139, 233, 253, 0.32);
}
.tiptap-editor-wrapper [data-color='green'] {
  --callout-bg: rgba(80, 250, 123, 0.13);
  --callout-border: rgba(80, 250, 123, 0.32);
}
.tiptap-editor-wrapper [data-color='yellow'] {
  --callout-bg: rgba(241, 250, 140, 0.13);
  --callout-border: rgba(241, 250, 140, 0.32);
}
.tiptap-editor-wrapper [data-color='orange'] {
  --callout-bg: rgba(255, 184, 108, 0.13);
  --callout-border: rgba(255, 184, 108, 0.32);
}
.tiptap-editor-wrapper [data-color='red'] {
  --callout-bg: rgba(255, 85, 85, 0.13);
  --callout-border: rgba(255, 85, 85, 0.32);
}
.tiptap-editor-wrapper [data-color='purple'] {
  --callout-bg: rgba(189, 147, 249, 0.13);
  --callout-border: rgba(189, 147, 249, 0.32);
}
</style>
