<template>
  <!-- Teleport para o body por dois motivos: os pais têm overflow-y-auto e
       cortariam um absolute, e dentro do editor o popover cairia numa região
       contenteditable — o ProseMirror engoliria o teclado do campo de busca. -->
  <Teleport to="body">
  <div class="fixed inset-0 z-[140]" @click="emit('close')"></div>
  <div
    class="fixed z-[150] w-[340px] max-w-[calc(100vw-16px)] bg-[var(--bg-card)] border border-black/20 rounded-xl shadow-2xl overflow-hidden"
    :style="{ top: position.y + 'px', left: position.x + 'px' }"
    @click.stop
  >
    <!-- Abas + ações -->
    <div class="flex items-center gap-1 px-2 pt-2 border-b border-[var(--border-soft)]">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        class="px-2.5 py-1.5 text-[13px] font-medium rounded-t-md transition-colors"
        :class="activeTab === tab.id
          ? 'text-[var(--text)] border-b-2 border-[var(--text)] -mb-[1px]'
          : 'text-[var(--muted)] hover:text-[var(--text)]'"
        @click="activeTab = tab.id"
      >
        {{ tab.label }}
      </button>
      <div class="ml-auto flex items-center gap-1 pb-1">
        <button
          v-if="allowEmoji"
          class="p-1.5 rounded text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--bg-hover)] transition-colors"
          title="Aleatório"
          @click="pickRandom"
        >
          <ArrowPathRoundedSquareIcon class="w-4 h-4" />
        </button>
        <button
          v-if="value"
          class="px-2 py-1 rounded text-[12px] text-[var(--muted)] hover:text-[#ff3b30] hover:bg-[#ff3b30]/10 transition-colors"
          @click="emit('remove')"
        >
          Remover
        </button>
      </div>
    </div>

    <!-- Emoji -->
    <div v-if="activeTab === 'emoji'" class="p-2">
      <div class="relative mb-2">
        <MagnifyingGlassIcon class="w-4 h-4 text-[var(--muted)] absolute left-2.5 top-1/2 -translate-y-1/2" />
        <input
          ref="searchInput"
          v-model="query"
          type="text"
          placeholder="Filtrar..."
          class="w-full bg-[var(--bg-hover)] border border-transparent rounded-lg py-1.5 pl-8 pr-3 text-[13px] outline-none text-[var(--text)] placeholder-[var(--muted)] focus:border-[var(--accent)]"
          @keydown.esc="emit('close')"
          @keydown.enter.prevent="applyFirstMatch"
        />
      </div>

      <div class="max-h-[240px] overflow-y-auto custom-scrollbar pr-0.5">
        <!-- Resultado da busca -->
        <template v-if="query.trim()">
          <div v-if="matches.length" class="grid grid-cols-8 gap-0.5">
            <button
              v-for="item in matches"
              :key="'s-' + item.e"
              class="w-9 h-9 flex items-center justify-center text-[20px] rounded hover:bg-[var(--bg-hover)] transition-colors"
              :title="item.k.split(' ')[0]"
              @click="choose(item.e)"
            >{{ item.e }}</button>
          </div>
          <p v-else class="text-[12px] text-[var(--muted)] px-1 py-3 text-center">
            Nenhum emoji para “{{ query }}”.
          </p>
        </template>

        <!-- Navegação por grupos -->
        <template v-else>
          <div v-if="recent.length" class="mb-2">
            <p class="text-[11px] font-bold text-[var(--muted)] uppercase tracking-wide px-1 mb-1">Recentes</p>
            <div class="grid grid-cols-8 gap-0.5">
              <button
                v-for="emoji in recent"
                :key="'r-' + emoji"
                class="w-9 h-9 flex items-center justify-center text-[20px] rounded hover:bg-[var(--bg-hover)] transition-colors"
                @click="choose(emoji)"
              >{{ emoji }}</button>
            </div>
          </div>
          <div v-for="group in EMOJI_GROUPS" :key="group.name" class="mb-2">
            <p class="text-[11px] font-bold text-[var(--muted)] uppercase tracking-wide px-1 mb-1">{{ group.name }}</p>
            <div class="grid grid-cols-8 gap-0.5">
              <button
                v-for="item in group.items"
                :key="group.name + item.e"
                class="w-9 h-9 flex items-center justify-center text-[20px] rounded hover:bg-[var(--bg-hover)] transition-colors"
                :title="item.k.split(' ')[0]"
                @click="choose(item.e)"
              >{{ item.e }}</button>
            </div>
          </div>
        </template>
      </div>
    </div>

    <!-- Upload -->
    <div v-else-if="activeTab === 'upload'" class="p-3">
      <button
        class="w-full border border-dashed border-[var(--border)] rounded-xl py-6 flex flex-col items-center gap-2 text-[var(--muted)] hover:text-[var(--text)] hover:border-[var(--accent)] transition-colors"
        :class="isDragging ? 'border-[var(--accent)] text-[var(--text)] bg-[var(--bg-hover)]' : ''"
        @click="fileInput?.click()"
        @dragover.prevent="isDragging = true"
        @dragleave="isDragging = false"
        @drop.prevent="onDrop"
      >
        <PhotoIcon class="w-6 h-6" />
        <span class="text-[13px] font-medium">Escolher arquivo ou arrastar aqui</span>
        <span class="text-[11px]">PNG, JPG ou GIF · redimensionado automaticamente</span>
      </button>
      <p v-if="error" class="text-[12px] text-[#ff3b30] mt-2">{{ error }}</p>
      <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="onFileSelected" />
    </div>

    <!-- Link -->
    <form v-else class="p-3" @submit.prevent="applyLink">
      <input
        ref="linkInput"
        v-model="link"
        type="url"
        placeholder="https://exemplo.com/imagem.png"
        class="w-full bg-[var(--bg-hover)] border border-transparent rounded-lg px-3 py-2 text-[13px] outline-none text-[var(--text)] placeholder-[var(--muted)] focus:border-[var(--accent)]"
        @keydown.esc="emit('close')"
      />
      <button
        type="submit"
        class="mt-2 w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-[13px] font-semibold rounded-lg py-2 transition-colors disabled:opacity-40"
        :disabled="!link.trim()"
      >
        Aplicar
      </button>
    </form>
  </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue';
import {
  ArrowPathRoundedSquareIcon,
  MagnifyingGlassIcon,
  PhotoIcon,
} from '@heroicons/vue/24/outline';
import { ALL_EMOJIS, EMOJI_GROUPS, searchEmojis } from './emojiData';
import { scaleImageFile } from '@/composables/useImageScale';

/**
 * Picker único de ícone/imagem — usado no ícone da nota, na capa, no ícone do
 * workspace e no callout, para todos abrirem a mesma coisa.
 *
 * Sempre devolve uma string em `select`: emoji, URL ou data URL. Quem chama
 * decide onde gravar.
 */
const props = withDefaults(
  defineProps<{
    /** Onde abrir (clique que originou o popover). */
    anchor: { x: number; y: number };
    /** Valor atual — habilita o "Remover". */
    value?: string | null;
    /** Capa/banner não aceita emoji: só Upload e Link. */
    allowEmoji?: boolean;
    /** Maior lado da imagem depois do redimensionamento. */
    maxDim?: number;
  }>(),
  { value: null, allowEmoji: true, maxDim: 256 },
);

const emit = defineEmits<{
  (e: 'select', value: string): void;
  (e: 'remove'): void;
  (e: 'close'): void;
}>();

const RECENT_KEY = 'notes_recent_emojis';
const RECENT_MAX = 16;
const WIDTH = 340;
const HEIGHT = 380;

type TabId = 'emoji' | 'upload' | 'link';

const tabs = computed(() =>
  [
    ...(props.allowEmoji ? [{ id: 'emoji' as TabId, label: 'Emoji' }] : []),
    { id: 'upload' as TabId, label: 'Upload' },
    { id: 'link' as TabId, label: 'Link' },
  ],
);

const activeTab = ref<TabId>(props.allowEmoji ? 'emoji' : 'upload');
const query = ref('');
const link = ref('');
const error = ref('');
const isDragging = ref(false);
const searchInput = ref<HTMLInputElement | null>(null);
const linkInput = ref<HTMLInputElement | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);

// Mantém o popover inteiro dentro da viewport.
const position = computed(() => ({
  x: Math.max(8, Math.min(props.anchor.x, window.innerWidth - WIDTH - 8)),
  y: Math.max(8, Math.min(props.anchor.y, window.innerHeight - HEIGHT - 8)),
}));

const matches = computed(() => searchEmojis(query.value));

const recent = ref<string[]>(readRecent());

function readRecent(): string[] {
  try {
    const raw = JSON.parse(localStorage.getItem(RECENT_KEY) || '[]');
    return Array.isArray(raw) ? raw.filter(v => typeof v === 'string').slice(0, RECENT_MAX) : [];
  } catch {
    return [];
  }
}

function rememberRecent(emoji: string) {
  const next = [emoji, ...recent.value.filter(e => e !== emoji)].slice(0, RECENT_MAX);
  recent.value = next;
  localStorage.setItem(RECENT_KEY, JSON.stringify(next));
}

function choose(emoji: string) {
  rememberRecent(emoji);
  emit('select', emoji);
}

function applyFirstMatch() {
  const first = matches.value[0];
  if (first) choose(first.e);
}

function pickRandom() {
  const pool = ALL_EMOJIS;
  choose(pool[Math.floor(Math.random() * pool.length)].e);
}

function applyLink() {
  const url = link.value.trim();
  if (url) emit('select', url);
}

async function handleFile(file?: File | null) {
  if (!file) return;
  error.value = '';
  try {
    const mime = props.maxDim > 512 ? 'image/jpeg' : 'image/png';
    emit('select', await scaleImageFile(file, props.maxDim, mime, 0.85));
  } catch (err) {
    error.value = 'Não foi possível processar a imagem.';
    console.error('Falha ao processar imagem:', err);
  }
}

async function onFileSelected(e: Event) {
  const input = e.target as HTMLInputElement;
  const file = input.files?.[0];
  input.value = ''; // permite re-selecionar o mesmo arquivo
  await handleFile(file);
}

async function onDrop(e: DragEvent) {
  isDragging.value = false;
  await handleFile(e.dataTransfer?.files?.[0]);
}

onMounted(() => {
  nextTick(() => (activeTab.value === 'emoji' ? searchInput : linkInput).value?.focus());
});
</script>
