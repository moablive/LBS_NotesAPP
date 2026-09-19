<template>
  <div>
    <div
      class="group relative flex items-center gap-1 rounded-md pr-1 cursor-pointer transition-colors select-none"
      :class="[
        isSelected
          ? 'bg-[var(--accent)]/20 text-white'
          : isActive ? 'bg-[var(--bg-hover)] text-white' : 'text-[var(--text)] hover:bg-[var(--bg-hover)]',
        zona === 'dentro' ? 'ring-1 ring-[var(--accent)] ring-inset bg-[var(--bg-hover)]' : ''
      ]"
      :style="{ paddingLeft: depth * 14 + 4 + 'px' }"
      :draggable="isRenaming ? 'false' : 'true'"
      tabindex="0"
      @keydown="onKeydown"
      @click="select($event)"
      @dblclick.stop="startRename"
      @contextmenu="openMenu($event)"
      @dragstart="onDragStart"
      @dragend="onDragEnd"
      @dragover.prevent="onDragOver"
      @dragleave="zona = null"
      @drop.prevent="onDrop"
    >
      <!-- Barra de insercao. So aparece nas bordas: no meio da linha o arrasto
           continua ANINHANDO, que e o gesto antigo e nao foi tirado. -->
      <div
        v-if="zona === 'antes' || zona === 'depois'"
        class="absolute left-0 right-0 h-0.5 bg-[var(--accent)] rounded-full pointer-events-none z-10"
        :class="zona === 'antes' ? '-top-px' : '-bottom-px'"
        :style="{ marginLeft: depth * 14 + 4 + 'px' }"
      >
        <span class="absolute -left-1 -top-[3px] w-2 h-2 rounded-full bg-[var(--accent)]"></span>
      </div>

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
/** Onde o arrasto vai cair: antes desta linha, dentro dela, ou depois. */
type Zona = 'antes' | 'dentro' | 'depois';
const zona = ref<Zona | null>(null);

const note = computed(() => notesStore.notes.find(n => n.id === props.noteId) || null);
const children = computed(() => notesStore.childrenOf(props.noteId));
const hasChildren = computed(() => children.value.length > 0);
const expanded = computed(() => !!notesStore.expandedIds[props.noteId]);
const isActive = computed(() => notesStore.activeNoteId === props.noteId);
const isSelected = computed(() => notesStore.selectedIds.includes(props.noteId));

/**
 * Clique simples abre a nota; com modificador, seleciona.
 *
 * Abrir E selecionar no mesmo gesto seria ambíguo: Ctrl+clique para marcar
 * cinco notas trocaria a nota aberta cinco vezes, recarregando o editor a cada
 * uma. Por isso o caminho com modificador NÃO chama `setActiveNote`.
 */
function select(e: MouseEvent) {
  if (isRenaming.value) return;
  if (e.shiftKey) {
    e.preventDefault();          // sem isto o navegador seleciona o texto das linhas
    notesStore.selectRange(props.noteId);
    return;
  }
  if (e.ctrlKey || e.metaKey) {
    notesStore.toggleSelected(props.noteId);
    return;
  }
  notesStore.clearSelection();
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
  zona.value = null;
}

function canDrop(): boolean {
  const dragging = notesStore.draggingId;
  if (!dragging || dragging === props.noteId) return false;
  // Não pode soltar sobre uma descendente da nota arrastada (evita ciclo).
  return !notesStore.descendantIds(dragging).includes(props.noteId);
}

/**
 * Onde o ponteiro está DENTRO da linha decide o gesto.
 *
 * O quarto de cima e o de baixo inserem entre irmãs; a metade do meio aninha,
 * que era o único comportamento até aqui. A faixa de 25% é o que o Notion usa
 * — menos que isso e virar filha por engano vira rotina, mais que isso e
 * reordenar fica difícil em linha de 26px.
 */
function onDragOver(e: DragEvent) {
  if (!canDrop()) {
    zona.value = null;
    return;
  }
  const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
  const y = e.clientY - r.top;
  if (y < r.height * 0.25) zona.value = 'antes';
  else if (y > r.height * 0.75) zona.value = 'depois';
  else zona.value = 'dentro';
}

async function onDrop() {
  const alvo = zona.value;
  zona.value = null;
  const dragging = notesStore.draggingId;
  if (!dragging || !alvo || !canDrop()) return;

  if (alvo === 'dentro') {
    await notesStore.moveNote(dragging, props.noteId);
  } else {
    // Índice DESTA nota entre as irmãs, já sem a arrastada: com ela ainda na
    // lista, mover uma nota para baixo dentro do mesmo pai erraria por um.
    const pai = note.value?.parentId ?? null;
    const irmas = notesStore.childrenOf(pai).filter(n => n.id !== dragging);
    const i = irmas.findIndex(n => n.id === props.noteId);
    if (i === -1) return;
    await notesStore.reorderNote(dragging, pai, alvo === 'antes' ? i : i + 1);
  }
  notesStore.setDragging(null);
}
</script>
