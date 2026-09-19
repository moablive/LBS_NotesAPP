<template>
  <div>
    <div
      class="group flex items-center gap-1 rounded-md pr-1 cursor-pointer transition-colors select-none"
      :class="[
        isActive ? 'bg-[var(--bg-hover)] text-white' : 'text-[var(--text)] hover:bg-[var(--bg-hover)]',
        isDropTarget ? 'ring-1 ring-[var(--accent)] ring-inset bg-[var(--bg-hover)]' : ''
      ]"
      :style="{ paddingLeft: depth * 14 + 4 + 'px' }"
      :draggable="isRenaming ? 'false' : 'true'"
      tabindex="0"
      @keydown="onKeydown"
      @click="select"
      @dblclick.stop="startRename"
      @contextmenu="openMenu($event)"
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

      <!-- Title (vira input no rename) -->
      <input
        v-if="isRenaming"
        ref="renameInput"
        v-model="renameValue"
        class="text-[13px] font-medium flex-1 min-w-0 py-1 bg-[var(--bg)] border border-[var(--accent)] rounded px-1 outline-none text-[var(--text)]"
        @click.stop
        @dblclick.stop
        @keydown.enter.prevent="commitRename"
        @keydown.esc.prevent="cancelRename"
        @blur="commitRename"
      />
      <span v-else class="text-[13px] font-medium truncate flex-1 py-1">{{ note?.title || 'Sem título' }}</span>

      <!-- Ações da linha. `opacity-0 group-hover:opacity-100` sem `hidden`: o
           espaço fica reservado, então a linha não "pula" ao passar o mouse. -->
      <button
        class="w-5 h-5 flex items-center justify-center rounded text-[var(--muted)] hover:text-[var(--text)] hover:bg-black/20 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity shrink-0"
        title="Mais ações"
        @click.stop="openMenu($event)"
      >
        <EllipsisHorizontalIcon class="w-4 h-4" />
      </button>

      <!-- Add sub-note -->
      <button
        class="w-5 h-5 flex items-center justify-center rounded text-[var(--muted)] hover:text-[var(--text)] hover:bg-black/20 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity shrink-0"
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
import { computed, nextTick, ref } from 'vue';
import { useNotesStore } from '@/stores/notes';
import { useContextMenu } from '@/composables/useContextMenu';
import { useToast } from '@/composables/useToast';
import {
  ChevronRightIcon,
  DocumentTextIcon,
  PlusIcon,
  EllipsisHorizontalIcon,
  PencilSquareIcon,
  DocumentDuplicateIcon,
  StarIcon,
  TrashIcon,
} from '@heroicons/vue/24/outline';

defineOptions({ name: 'NoteTreeItem' });

const props = defineProps<{ noteId: string; depth: number }>();

const notesStore = useNotesStore();
const menu = useContextMenu();
const toast = useToast();
const isDropTarget = ref(false);

const note = computed(() => notesStore.notes.find(n => n.id === props.noteId) || null);
const children = computed(() => notesStore.childrenOf(props.noteId));
const hasChildren = computed(() => children.value.length > 0);
const expanded = computed(() => !!notesStore.expandedIds[props.noteId]);
const isActive = computed(() => notesStore.activeNoteId === props.noteId);

function select() {
  if (isRenaming.value) return;
  notesStore.setActiveNote(props.noteId);
}

async function addChild() {
  // `createSubPage` e não `addNote`: o "+" antigo só definia o parentId, então
  // a filha aparecia na árvore mas nascia invisível DENTRO do pai — sem o bloco
  // de sub-página no corpo dele. A ordem importa: o vínculo é gravado no
  // conteúdo do pai, que precisa continuar sendo a nota aberta até lá.
  const filha = await notesStore.createSubPage(props.noteId);
  notesStore.expand(props.noteId);
  if (filha) notesStore.setActiveNote(filha.id);
}

/* ---------------------------------------------------------------- rename --- */

const isRenaming = ref(false);
const renameValue = ref('');
const renameInput = ref<HTMLInputElement | null>(null);

async function startRename() {
  if (!note.value) return;
  renameValue.value = note.value.title || '';
  isRenaming.value = true;
  await nextTick();
  renameInput.value?.focus();
  renameInput.value?.select();
}

async function commitRename() {
  if (!isRenaming.value) return;
  isRenaming.value = false;
  const novo = renameValue.value.trim();
  // Título vazio é rejeitado pelo backend (min(1)); tratar como cancelar é
  // melhor que estourar um erro por causa de um Enter apressado.
  if (!novo || !note.value || novo === note.value.title) return;
  await notesStore.updateNoteFields(props.noteId, { title: novo });
}

function cancelRename() {
  isRenaming.value = false;
}

/* --------------------------------------------------------------- excluir --- */

async function deleteItem() {
  const titulo = note.value?.title || 'Sem título';
  const netas = notesStore.descendantIds(props.noteId).length;
  await notesStore.deleteNote(props.noteId);
  toast.show(
    netas > 0
      ? `"${titulo}" e ${netas} sub-página${netas > 1 ? 's' : ''} foram para a lixeira`
      : `"${titulo}" foi para a lixeira`,
    {
      actionLabel: 'Desfazer',
      action: () => notesStore.restoreNote(props.noteId),
    },
  );
}

/* ------------------------------------------------------------------ menu --- */

function openMenu(ev: MouseEvent) {
  ev.preventDefault();
  ev.stopPropagation();
  const favorita = !!note.value?.isFavorite;
  menu.open(ev, [
    { label: 'Renomear', icon: PencilSquareIcon, shortcut: 'F2', action: startRename },
    { label: 'Duplicar', icon: DocumentDuplicateIcon, action: async () => { await notesStore.duplicateNote(props.noteId); } },
    {
      label: favorita ? 'Remover dos favoritos' : 'Adicionar aos favoritos',
      icon: StarIcon,
      action: () => notesStore.toggleFavorite(props.noteId),
    },
    { label: 'Nova sub-página', icon: PlusIcon, action: addChild },
    { label: 'Excluir', icon: TrashIcon, shortcut: 'Del', danger: true, dividerBefore: true, action: deleteItem },
  ]);
}

/* -------------------------------------------------------------- teclado --- */

function onKeydown(e: KeyboardEvent) {
  // O input de rename fica DENTRO da linha, então o keydown dele borbulha até
  // aqui: sem esta guarda, apagar uma letra com Backspace apagaria a nota.
  if (isRenaming.value || (e.target as HTMLElement)?.tagName === 'INPUT') return;

  if (e.key === 'Delete' || e.key === 'Backspace') {
    e.preventDefault();
    e.stopPropagation();
    deleteItem();
  } else if (e.key === 'F2') {
    e.preventDefault();
    e.stopPropagation();
    startRename();
  }
}

/* ----------------------------------------------------------------- drag --- */

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
