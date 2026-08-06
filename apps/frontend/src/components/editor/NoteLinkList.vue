<template>
  <div class="bg-[var(--bg-card)] border border-black/20 rounded-xl shadow-2xl p-1 w-64 max-h-64 overflow-y-auto custom-scrollbar">
    <div v-if="items.length === 0" class="px-3 py-2 text-[13px] text-[var(--muted)]">
      Nenhuma nota encontrada.
    </div>
    <button
      v-else
      v-for="(item, index) in items"
      :key="item.id"
      class="w-full text-left flex items-center gap-2 px-3 py-1.5 rounded-lg text-[13px] hover:bg-[var(--bg-hover)] transition-colors"
      :class="{ 'bg-[var(--bg-hover)]': index === selectedIndex }"
      @click="selectItem(index)"
      @mouseenter="selectedIndex = index"
    >
      <span class="w-4 h-4 shrink-0 inline-flex items-center justify-center">
        <img v-if="item.icon && (item.icon.startsWith('http') || item.icon.startsWith('data:'))" :src="item.icon" class="w-4 h-4 rounded-sm object-cover" />
        <span v-else-if="item.icon" class="text-[13px]">{{ item.icon }}</span>
        <svg v-else class="w-4 h-4 text-[var(--muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      </span>
      <span class="truncate flex-1 text-[var(--text)]">{{ item.title || 'Sem título' }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps({
  items: {
    type: Array as () => any[],
    required: true,
  },
  command: {
    type: Function,
    required: true,
  },
});

const selectedIndex = ref(0);

watch(() => props.items, () => {
  selectedIndex.value = 0;
});

const selectItem = (index: number) => {
  const item = props.items[index];
  if (item) {
    props.command(item);
  }
};

const onKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'ArrowUp') {
    selectedIndex.value = (selectedIndex.value + props.items.length - 1) % props.items.length;
    return true;
  }
  if (event.key === 'ArrowDown') {
    selectedIndex.value = (selectedIndex.value + 1) % props.items.length;
    return true;
  }
  if (event.key === 'Enter') {
    selectItem(selectedIndex.value);
    return true;
  }
  return false;
};

defineExpose({ onKeyDown });
</script>
