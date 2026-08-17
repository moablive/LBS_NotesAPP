<template>
  <div>
    <div
      class="group flex items-center gap-1 rounded-md pr-1 cursor-pointer transition-colors select-none"
      :class="[
        isActive ? 'bg-[var(--bg-hover)] text-white' : 'text-[var(--text)] hover:bg-[var(--bg-hover)]',
        isDropTarget ? 'ring-1 ring-[var(--accent)] ring-inset bg-[var(--bg-hover)]' : ''
      ]"
      :style="{ paddingLeft: depth * 14 + 4 + 'px' }"
      draggable="true"
      tabindex="0"
      @keydown.delete.stop="deleteItem"
      @keydown.backspace.stop="deleteItem"
      @click="select"
      @dragstart="onDragStart"
      @dragend="onDragEnd"
      @dragover.prevent="onDragOver"
      @dragleave="isDropTarget = false"
      @drop.prevent="onDrop"
    >
      <!-- Chevron / spacer -->
      <button
        v-if="hasChildren"
        class="w-4 h-4 flex items-center justify-center text-[var(--muted)] hover:text-[var(--text)] shrink-0"
        @click.stop="notesStore.toggleExpanded(noteId)"
      >
        <ChevronRightIcon class="w-3 h-3 transition-transform" :class="expanded ? 'rotate-90' : ''" />
      </button>
      <span v-else class="w-4 h-4 shrink-0"></span>

      <!-- Icon -->
      <span class="w-4 h-4 shrink-0 inline-flex items-center justify-center">
        <img
          v-if="note && note.icon && (note.icon.startsWith('http') || note.icon.startsWith('data:'))"
          :src="note.icon"
          class="w-4 h-4 rounded-sm object-cover"
        />
        <span v-else-if="note && note.icon" class="text-[13px] leading-none">{{ note.icon }}</span>
        <DocumentTextIcon v-else class="w-[14px] h-[14px] text-[var(--muted)]" />
      </span>

      <!-- Title -->
      <span class="text-[13px] font-medium truncate flex-1 py-1">{{ note?.title || 'Sem título' }}</span>

      <!-- Add sub-note -->
      <button
        class="w-5 h-5 flex items-center justify-center rounded text-[var(--muted)] hover:text-[var(--text)] hover:bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
        title="Adicionar sub-nota"
        @click.stop="addChild"
      >
        <PlusIcon class="w-3.5 h-3.5" />
      </button>
    </div>

    <!-- Children (recursive) -->
    <div v-if="expanded && hasChildren">
      <NoteTreeItem
        v-for="child in children"
        :key="child.id"
        :note-id="child.id"
        :depth="depth + 1"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useNotesStore } from '@/stores/notes';
import { ChevronRightIcon, DocumentTextIcon, PlusIcon } from '@heroicons/vue/24/outline';

defineOptions({ name: 'NoteTreeItem' });

const props = defineProps<{ noteId: string; depth: number }>();

const notesStore = useNotesStore();
const isDropTarget = ref(false);

const note = computed(() => notesStore.notes.find(n => n.id === props.noteId) || null);
const children = computed(() => notesStore.childrenOf(props.noteId));
const hasChildren = computed(() => children.value.length > 0);
const expanded = computed(() => !!notesStore.expandedIds[props.noteId]);
const isActive = computed(() => notesStore.activeNoteId === props.noteId);

function select() {
  notesStore.setActiveNote(props.noteId);
}

async function addChild() {
  await notesStore.addNote('Sem título', null, props.noteId);
  notesStore.expand(props.noteId);
  // addNote já define a sub-nota como ativa.
}

function onDragStart(e: DragEvent) {
  notesStore.setDragging(props.noteId);
  e.dataTransfer?.setData('text/plain', props.noteId);
  if (e.dataTransfer) e.dataTransfer.effectAllowed = 'move';
}

function onDragEnd() {
  notesStore.setDragging(null);
  isDropTarget.value = false;
}

function canDrop(): boolean {
  const dragging = notesStore.draggingId;
  if (!dragging || dragging === props.noteId) return false;
  // Não pode soltar sobre uma descendente da nota arrastada (evita ciclo).
  return !notesStore.descendantIds(dragging).includes(props.noteId);
}

function onDragOver() {
  isDropTarget.value = canDrop();
}

async function onDrop() {
  isDropTarget.value = false;
  const dragging = notesStore.draggingId;
  if (!dragging || !canDrop()) return;
  await notesStore.moveNote(dragging, props.noteId);
  notesStore.setDragging(null);
}
</script>
