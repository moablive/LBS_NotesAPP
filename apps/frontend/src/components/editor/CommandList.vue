<template>
  <div class="bg-[var(--bg-card)] border border-[var(--border-soft)] rounded-lg shadow-xl overflow-hidden min-w-[240px] max-w-[320px] max-h-[320px] flex flex-col z-50">
    <div class="px-3 py-2 text-xs font-semibold text-[var(--muted)] uppercase tracking-wider bg-[var(--bg)] border-b border-[var(--border-soft)]">
      Basic Blocks
    </div>
    <div class="flex-1 overflow-y-auto custom-scrollbar p-1">
      <button
        v-for="(item, index) in items"
        :key="index"
        class="w-full text-left px-3 py-2 rounded-md hover:bg-[var(--bg-hover)] transition-colors flex items-center gap-3"
        :class="{ 'bg-[var(--bg-hover)] text-white': index === selectedIndex, 'text-[var(--text)]': index !== selectedIndex }"
        @click="selectItem(index)"
      >
        <div class="w-8 h-8 rounded border border-[var(--border-soft)] bg-[var(--bg)] flex items-center justify-center shrink-0">
          <span v-if="item.icon" v-html="item.icon" class="w-4 h-4 text-[var(--text)]"></span>
        </div>
        <div class="flex-1 min-w-0">
          <div class="font-medium text-sm truncate">{{ item.title }}</div>
          <div class="text-xs text-[var(--muted)] truncate">{{ item.description }}</div>
        </div>
      </button>
    </div>
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
    selectedIndex.value = ((selectedIndex.value + props.items.length) - 1) % props.items.length;
    event.preventDefault();
    return true;
  }
  if (event.key === 'ArrowDown') {
    selectedIndex.value = (selectedIndex.value + 1) % props.items.length;
    event.preventDefault();
    return true;
  }
  if (event.key === 'Enter') {
    selectItem(selectedIndex.value);
    event.preventDefault();
    return true;
  }
  return false;
};

defineExpose({
  onKeyDown,
});
</script>
