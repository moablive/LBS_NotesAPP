<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue';
import { useNotesStore } from '@/stores/notes';
import { DocumentTextIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/outline';

/**
 * Seletor rápido de página — o Cmd+K do Notion.
 *
 * Tem busca própria em vez de reusar `notesStore.searchQuery`: aquela filtra a
 * árvore da sidebar e fica visível depois de fechar o diálogo, então digitar
 * aqui reescreveria a sidebar por baixo e o usuário voltaria para um app
 * filtrado sem ter pedido.
 *
 * Sem termo digitado, lista o histórico de recentes — abrir e dar Enter volta
 * para a última página, que é o uso mais comum do atalho.
 */
const props = defineProps<{ aberto: boolean }>();
const emit = defineEmits<{ (e: 'fechar'): void }>();

const notesStore = useNotesStore();
const termo = ref('');
const selecionado = ref(0);
const campo = ref<HTMLInputElement | null>(null);
const lista = ref<HTMLElement | null>(null);

/** Quem tinha o foco antes de abrir, para devolvê-lo ao fechar. */
let focoAnterior: HTMLElement | null = null;

const LIMITE = 12;

const resultados = computed(() => {
  const q = termo.value.trim().toLowerCase();
  if (!q) return notesStore.recents.slice(0, LIMITE);
  return notesStore.notes
    .filter(n =>
      n.title.toLowerCase().includes(q) ||
      (n.content && n.content.toLowerCase().includes(q)),
    )
    // Título que casa vem antes de corpo que casa: quem digita "reuni" quer a
    // página chamada Reunião, não as dez que a citam de passagem.
    .sort((a, b) => {
      const ta = a.title.toLowerCase().includes(q) ? 0 : 1;
      const tb = b.title.toLowerCase().includes(q) ? 0 : 1;
      if (ta !== tb) return ta - tb;
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    })
    .slice(0, LIMITE);
});

watch(() => props.aberto, async (estaAberto) => {
  document.body.style.overflow = estaAberto ? 'hidden' : '';
  if (estaAberto) {
    focoAnterior = document.activeElement as HTMLElement | null;
    termo.value = '';
    selecionado.value = 0;
    await nextTick();
    campo.value?.focus();
  } else {
    focoAnterior?.focus?.();
    focoAnterior = null;
  }
});

// A lista encolhe conforme se digita; sem isto o índice fica apontando para
// além do fim e o Enter não abre nada.
watch(resultados, () => { selecionado.value = 0; });

function mover(passo: number) {
  const total = resultados.value.length;
  if (!total) return;
  selecionado.value = (selecionado.value + passo + total) % total;
  nextTick(() => {
    lista.value?.querySelector<HTMLElement>('[data-sel="1"]')
      ?.scrollIntoView({ block: 'nearest' });
  });
}

function abrir(id?: string) {
  const alvo = id ?? resultados.value[selecionado.value]?.id;
  if (!alvo) return;
  notesStore.setActiveNote(alvo);
  emit('fechar');
}
</script>

<template>
  <Transition
    enter-active-class="transition-opacity duration-100"
    enter-from-class="opacity-0"
    leave-active-class="transition-opacity duration-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="aberto"
      class="fixed inset-0 z-50 bg-black/60 flex items-start justify-center pt-[15vh] px-4"
      @click.self="emit('fechar')"
    >
      <div
        class="w-full max-w-xl bg-[var(--bg-card)] border border-[var(--border)] rounded-xl shadow-2xl overflow-hidden"
        @keydown.esc.stop="emit('fechar')"
        @keydown.down.prevent="mover(1)"
        @keydown.up.prevent="mover(-1)"
        @keydown.enter.prevent="abrir()"
      >
        <div class="flex items-center gap-2 px-4 border-b border-[var(--border-soft)]">
          <MagnifyingGlassIcon class="w-4 h-4 text-[var(--muted)] shrink-0" />
          <input
            ref="campo"
            v-model="termo"
            type="text"
            placeholder="Ir para a página…"
            class="flex-1 bg-transparent py-3 text-[14px] outline-none text-[var(--text)] placeholder-[var(--muted)]"
          />
          <kbd class="text-[10px] text-[var(--muted)] border border-[var(--border)] rounded px-1.5 py-0.5">esc</kbd>
        </div>

        <div ref="lista" class="max-h-[50vh] overflow-y-auto custom-scrollbar py-1">
          <p v-if="!resultados.length" class="px-4 py-6 text-center text-[13px] text-[var(--muted)]">
            {{ termo.trim() ? 'Nenhuma página encontrada.' : 'Nenhuma página aberta ainda.' }}
          </p>

          <button
            v-for="(nota, i) in resultados"
            :key="nota.id"
            :data-sel="i === selecionado ? '1' : '0'"
            class="w-full flex items-center gap-2 px-4 py-2 text-left transition-colors"
            :class="i === selecionado ? 'bg-[var(--bg-hover)] text-white' : 'text-[var(--text)] hover:bg-[var(--bg-hover)]'"
            @click="abrir(nota.id)"
            @mousemove="selecionado = i"
          >
            <span class="w-4 h-4 shrink-0 inline-flex items-center justify-center">
              <img
                v-if="nota.icon && (nota.icon.startsWith('http') || nota.icon.startsWith('data:'))"
                :src="nota.icon"
                class="w-4 h-4 rounded-sm object-cover"
              />
              <span v-else-if="nota.icon" class="text-[13px]">{{ nota.icon }}</span>
              <DocumentTextIcon v-else class="w-[14px] h-[14px] text-[var(--muted)]" />
            </span>
            <span class="text-[13px] font-medium truncate">{{ nota.title || 'Sem título' }}</span>
          </button>
        </div>

        <div class="flex items-center gap-3 px-4 py-2 border-t border-[var(--border-soft)] text-[11px] text-[var(--muted)]">
          <span>↑↓ navegar</span>
          <span>↵ abrir</span>
          <span v-if="!termo.trim()">mostrando os recentes</span>
        </div>
      </div>
    </div>
  </Transition>
</template>
