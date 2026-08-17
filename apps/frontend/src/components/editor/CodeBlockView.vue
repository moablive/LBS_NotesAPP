<template>
  <node-view-wrapper class="code-block" :data-language="language">
    <!-- contenteditable=false: a barra é UI, não conteúdo do documento -->
    <div class="code-block__bar" contenteditable="false">
      <button type="button" class="code-block__lang" @click="openPicker">
        {{ codeLanguageLabel(language) }}
        <ChevronDownIcon class="w-3 h-3" />
      </button>

      <div class="code-block__actions">
        <button type="button" class="code-block__copy" @click="copy">
          <ClipboardDocumentIcon class="w-3.5 h-3.5" />
          {{ copied ? 'Copiado' : 'Copiar' }}
        </button>
        <button type="button" class="code-block__delete" title="Excluir bloco" @click="remove">
          <TrashIcon class="w-3.5 h-3.5" />
        </button>
      </div>
    </div>

    <pre><node-view-content as="code" :class="`language-${language || DEFAULT_CODE_LANGUAGE}`" /></pre>

    <!-- Modal (teleportada): o bloco tem overflow:hidden pelas bordas
         arredondadas e cortava um dropdown absoluto; além disso o campo de busca
         ficaria dentro do contenteditable, onde o ProseMirror engole o teclado. -->
    <Teleport to="body">
      <div
        v-if="pickerOpen"
        class="fixed inset-0 z-[130] flex items-center justify-center bg-black/60 backdrop-blur-sm"
        @click.self="closePicker"
      >
        <div class="bg-[var(--bg-card)] border border-black/20 rounded-2xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden">
          <div class="p-4 pb-3">
            <h3 class="text-[15px] font-semibold text-[var(--text)] mb-3">Linguagem do bloco</h3>
            <div class="relative">
              <MagnifyingGlassIcon class="w-4 h-4 text-[var(--muted)] absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                ref="searchRef"
                v-model="query"
                type="text"
                placeholder="Buscar linguagem..."
                class="w-full bg-[var(--bg-hover)] border border-transparent rounded-lg py-2 pl-8 pr-3 text-[13px] outline-none text-[var(--text)] placeholder-[var(--muted)] focus:border-[var(--accent)]"
                @keydown.esc.stop.prevent="closePicker"
                @keydown.enter.prevent="applyActive"
                @keydown.down.prevent="move(1)"
                @keydown.up.prevent="move(-1)"
              />
            </div>
          </div>

          <div ref="listRef" class="max-h-[300px] overflow-y-auto custom-scrollbar px-2 pb-2">
            <button
              v-for="(lang, index) in filtered"
              :key="lang.value"
              :data-index="index"
              type="button"
              class="w-full flex items-center justify-between gap-2 px-2.5 py-2 rounded-lg text-[13px] text-left transition-colors"
              :class="[
                index === activeIndex ? 'bg-[var(--bg-hover)]' : 'hover:bg-[var(--bg-hover)]',
                lang.value === language ? 'text-[var(--accent)] font-medium' : 'text-[var(--text)]',
              ]"
              @mouseenter="activeIndex = index"
              @click="select(lang.value)"
            >
              <span>{{ lang.label }}</span>
              <CheckIcon v-if="lang.value === language" class="w-4 h-4" />
            </button>
            <p v-if="!filtered.length" class="text-[12px] text-[var(--muted)] text-center py-4">
              Nenhuma linguagem para “{{ query }}”.
            </p>
          </div>
        </div>
      </div>
    </Teleport>
  </node-view-wrapper>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue';
import { NodeViewContent, NodeViewWrapper, nodeViewProps } from '@tiptap/vue-3';
import {
  CheckIcon,
  ChevronDownIcon,
  ClipboardDocumentIcon,
  MagnifyingGlassIcon,
  TrashIcon,
} from '@heroicons/vue/24/outline';
import { CODE_LANGUAGES, DEFAULT_CODE_LANGUAGE, codeLanguageLabel } from './codeLanguages';

const props = defineProps(nodeViewProps);

const pickerOpen = ref(false);
const query = ref('');
const activeIndex = ref(0);
const copied = ref(false);
const searchRef = ref<HTMLInputElement | null>(null);
const listRef = ref<HTMLElement | null>(null);

const language = computed<string>(() => props.node.attrs.language || DEFAULT_CODE_LANGUAGE);

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase();
  if (!q) return CODE_LANGUAGES;
  return CODE_LANGUAGES.filter(l => l.label.toLowerCase().includes(q) || l.value.includes(q));
});

// Digitar reposiciona o destaque no topo, senão o Enter escolheria um item que
// já saiu da lista filtrada.
watch(query, () => (activeIndex.value = 0));

function openPicker() {
  query.value = '';
  activeIndex.value = Math.max(0, CODE_LANGUAGES.findIndex(l => l.value === language.value));
  pickerOpen.value = true;
  nextTick(() => {
    searchRef.value?.focus();
    scrollActiveIntoView();
  });
}

function closePicker() {
  pickerOpen.value = false;
  props.editor.commands.focus();
}

function move(delta: number) {
  const total = filtered.value.length;
  if (!total) return;
  activeIndex.value = (activeIndex.value + delta + total) % total;
  scrollActiveIntoView();
}

function scrollActiveIntoView() {
  const el = listRef.value?.querySelector<HTMLElement>(`[data-index="${activeIndex.value}"]`);
  el?.scrollIntoView({ block: 'nearest' });
}

function select(value: string) {
  props.updateAttributes({ language: value });
  closePicker();
}

function applyActive() {
  const lang = filtered.value[activeIndex.value];
  if (lang) select(lang.value);
}

// deleteNode vem do nodeViewProps: apaga o nó inteiro, com conteúdo e tudo.
function remove() {
  props.deleteNode();
  props.editor.commands.focus();
}

async function copy() {
  try {
    await navigator.clipboard.writeText(props.node.textContent);
    copied.value = true;
    setTimeout(() => (copied.value = false), 1500);
  } catch (err) {
    // Sem clipboard (contexto não seguro): o usuário ainda pode selecionar à mão.
    console.error('Falha ao copiar:', err);
  }
}
</script>
