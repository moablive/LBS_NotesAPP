<template>
  <node-view-wrapper
    class="callout"
    :data-color="node.attrs.color || 'gray'"
    :data-open="isOpen ? 'true' : 'false'"
  >
    <div class="callout__gutter" contenteditable="false">
      <!-- Só faz sentido recolher quando há mais de um bloco: o primeiro fica
           sempre visível, valendo como título da caixa. -->
      <button
        v-if="node.childCount > 1"
        type="button"
        class="callout__chevron"
        :aria-expanded="isOpen"
        :title="isOpen ? 'Recolher' : 'Expandir'"
        @mousedown.prevent
        @click="props.updateAttributes({ open: !isOpen })"
      >
        <ChevronRightIcon class="w-3 h-3" />
      </button>

      <button
        type="button"
        class="callout__icon"
        title="Trocar ícone"
        @mousedown.prevent
        @click="openIconPicker"
      >
        <img v-if="isImageIcon" :src="node.attrs.icon" alt="" />
        <span v-else>{{ node.attrs.icon || DEFAULT_CALLOUT_ICON }}</span>
      </button>

      <button
        type="button"
        class="callout__color"
        title="Excluir caixa"
        @mousedown.prevent
        @click="remove"
      >
        <TrashIcon class="w-3.5 h-3.5" />
      </button>

      <div ref="colorRef" class="callout__color-wrap">
        <button
          type="button"
          class="callout__color"
          title="Cor da caixa"
          @mousedown.prevent
          @click="colorOpen = !colorOpen"
        >
          <SwatchIcon class="w-3.5 h-3.5" />
        </button>
        <div v-if="colorOpen" class="callout__color-menu">
          <button
            v-for="option in CALLOUT_COLORS"
            :key="option.value"
            type="button"
            class="callout__color-option"
            :data-color="option.value"
            :title="option.label"
            @mousedown.prevent
            @click="selectColor(option.value)"
          >
            <CheckIcon v-if="(node.attrs.color || 'gray') === option.value" class="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>

    <node-view-content class="callout__body" />

    <IconPicker
      v-if="iconPickerOpen"
      :anchor="iconAnchor"
      :value="node.attrs.icon"
      :max-dim="128"
      @select="applyIcon"
      @remove="applyIcon(DEFAULT_CALLOUT_ICON)"
      @close="iconPickerOpen = false"
    />
  </node-view-wrapper>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { NodeViewContent, NodeViewWrapper, nodeViewProps } from '@tiptap/vue-3';
import { onClickOutside } from '@vueuse/core';
import { CheckIcon, ChevronRightIcon, SwatchIcon, TrashIcon } from '@heroicons/vue/24/outline';
import IconPicker from '@/components/IconPicker.vue';
import { CALLOUT_COLORS, DEFAULT_CALLOUT_ICON } from './calloutNode';

const props = defineProps(nodeViewProps);

const colorOpen = ref(false);
const colorRef = ref<HTMLElement | null>(null);
const iconPickerOpen = ref(false);
const iconAnchor = ref({ x: 0, y: 0 });

const isOpen = computed(() => props.node.attrs.open !== false);
const isImageIcon = computed(() => {
  const icon = props.node.attrs.icon;
  return !!icon && (icon.startsWith('http') || icon.startsWith('data:'));
});

onClickOutside(colorRef, () => (colorOpen.value = false));

function openIconPicker(event: MouseEvent) {
  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
  iconAnchor.value = { x: rect.left, y: rect.bottom + 6 };
  iconPickerOpen.value = true;
}

function applyIcon(icon: string) {
  props.updateAttributes({ icon });
  iconPickerOpen.value = false;
}

function remove() {
  props.deleteNode();
  props.editor.commands.focus();
}

function selectColor(color: string) {
  props.updateAttributes({ color });
  colorOpen.value = false;
}
</script>
