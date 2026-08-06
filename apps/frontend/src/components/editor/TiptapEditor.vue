<template>
  <div class="tiptap-editor-wrapper">
    <editor-content :editor="editor" class="prose max-w-none focus:outline-none" />
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, watch } from 'vue';
import { useEditor, EditorContent, VueRenderer } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import SlashCommands from './slashExtension';
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
    StarterKit,
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
              title: 'Page',
              description: 'Embed a sub-page inside this note.',
              icon: '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>',
              command: ({ editor, range }: any) => {
                editor.chain().focus().deleteRange(range).run();
                emit('create-note');
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
  min-height: 500px;
}
.tiptap-editor-wrapper .ProseMirror p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: var(--muted);
  pointer-events: none;
  height: 0;
}
</style>
