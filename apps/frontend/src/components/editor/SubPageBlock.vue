<template>
  <node-view-wrapper class="sub-page-block" :data-note-id="node.attrs.noteId">
    <div
      contenteditable="false"
      class="flex items-center gap-2 my-1 px-2 py-1.5 rounded-lg cursor-pointer select-none transition-colors hover:bg-[var(--bg-hover)]"
      :class="note ? '' : 'opacity-50 cursor-default'"
      @click="open"
    >
      <span class="w-5 h-5 shrink-0 inline-flex items-center justify-center">
        <img v-if="imageIcon" :src="imageIcon" class="w-5 h-5 rounded-sm object-cover" />
        <span v-else-if="emojiIcon" class="text-[15px] leading-none">{{ emojiIcon }}</span>
        <DocumentTextIcon v-else class="w-4 h-4 text-[var(--muted)]" />
      </span>
      <span
        class="text-[14px] font-medium text-[var(--text)] underline decoration-[var(--border-soft)] underline-offset-2 truncate"
      >
        {{ displayTitle }}
      </span>
      <span v-if="!note" class="text-[11px] text-[var(--muted)] shrink-0">(removida)</span>
    </div>
  </node-view-wrapper>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, watch } from 'vue';
import { NodeViewWrapper, nodeViewProps } from '@tiptap/vue-3';
import { DocumentTextIcon } from '@heroicons/vue/24/outline';
import { useNotesStore } from '@/stores/notes';
import { SUB_PAGE_FALLBACK_TITLE } from './subPageHtml';

const props = defineProps(nodeViewProps);
const notesStore = useNotesStore();

const noteId = computed<string | null>(() => props.node.attrs.noteId ?? null);
const note = computed(() =>
  noteId.value ? notesStore.notes.find(n => n.id === noteId.value) || null : null,
);

const icon = computed(() => note.value?.icon || null);
const imageIcon = computed(() =>
  icon.value && (icon.value.startsWith('http') || icon.value.startsWith('data:'))
    ? icon.value
    : null,
);
const emojiIcon = computed(() => (icon.value && !imageIcon.value ? icon.value : null));

// Título ao vivo: o attr gravado no HTML é só um retrato do momento da criação,
// então renomear a filha deixaria o bloco desatualizado.
const displayTitle = computed(
  () => note.value?.title || props.node.attrs.title || SUB_PAGE_FALLBACK_TITLE,
);

// Alinha o attr (o que vai para o banco) com o título atual, para a busca por
// conteúdo achar o nome certo. O nextTick evita despachar a transação no meio
// do setContent do editor; o guard `alive` cobre a troca de nota nesse intervalo,
// quando este bloco já saiu do documento.
let alive = true;
onBeforeUnmount(() => {
  alive = false;
});

const syncTitle = () => {
  if (!alive || !props.editor || props.editor.isDestroyed || !props.editor.isEditable) return;
  const current = note.value?.title;
  if (current && current !== props.node.attrs.title) props.updateAttributes({ title: current });
};
onMounted(() => nextTick(syncTitle));
watch(displayTitle, () => nextTick(syncTitle));

// Abrir a filha: salva o pai primeiro, senão o que foi digitado desde o último
// blur se perderia ao trocar de nota.
const open = async () => {
  const target = note.value;
  if (!target) return;
  const current = notesStore.activeNoteId;
  if (current && current !== target.id) await notesStore.saveNote(current);
  notesStore.setActiveNote(target.id);
};
</script>
