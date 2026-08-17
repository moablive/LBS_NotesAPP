<template>
  <node-view-wrapper class="toggle-block" :data-open="isOpen ? 'true' : 'false'">
    <div class="toggle-block__gutter" contenteditable="false">
      <button
        type="button"
        class="toggle-block__chevron"
        :aria-expanded="isOpen"
        :title="isOpen ? 'Recolher' : 'Expandir'"
        @mousedown.prevent
        @click="toggle"
      >
        <ChevronRightIcon class="w-3.5 h-3.5" />
      </button>

      <!-- Ícone opcional: emoji, upload ou link, igual ao da nota e do callout.
           Sem ícone definido ele só aparece no hover, para não poluir a linha. -->
      <button
        type="button"
        class="toggle-block__icon"
        :class="hasIcon ? 'is-set' : ''"
        :title="hasIcon ? 'Trocar ícone' : 'Adicionar ícone'"
        @mousedown.prevent
        @click="openIconPicker"
      >
        <img v-if="isImageIcon" :src="node.attrs.icon" alt="" />
        <span v-else-if="hasIcon">{{ node.attrs.icon }}</span>
        <FaceSmileIcon v-else class="w-3.5 h-3.5" />
      </button>
    </div>

    <node-view-content class="toggle-block__body" />

    <button
      type="button"
      class="toggle-block__delete"
      contenteditable="false"
      title="Excluir toggle"
      @mousedown.prevent
      @click="remove"
    >
      <TrashIcon class="w-3 h-3" />
    </button>

    <IconPicker
      v-if="iconPickerOpen"
      :anchor="iconAnchor"
      :value="node.attrs.icon"
      :max-dim="128"
      @select="applyIcon"
      @remove="applyIcon(null)"
      @close="iconPickerOpen = false"
    />
  </node-view-wrapper>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { NodeViewContent, NodeViewWrapper, nodeViewProps } from '@tiptap/vue-3';
import { ChevronRightIcon, FaceSmileIcon, TrashIcon } from '@heroicons/vue/24/outline';
import IconPicker from '@/components/IconPicker.vue';

const props = defineProps(nodeViewProps);

const iconPickerOpen = ref(false);
const iconAnchor = ref({ x: 0, y: 0 });

const isOpen = computed(() => props.node.attrs.open !== false);
const hasIcon = computed(() => !!props.node.attrs.icon);
const isImageIcon = computed(() => {
  const icon = props.node.attrs.icon;
  return !!icon && (icon.startsWith('http') || icon.startsWith('data:'));
});

// O corpo é escondido por CSS (data-open="false"), não removido do documento:
// recolher é estado visual, o conteúdo continua salvo e pesquisável.
function toggle() {
  props.updateAttributes({ open: !isOpen.value });
}

function openIconPicker(event: MouseEvent) {
  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
  iconAnchor.value = { x: rect.left, y: rect.bottom + 6 };
  iconPickerOpen.value = true;
}

function applyIcon(icon: string | null) {
  props.updateAttributes({ icon });
  iconPickerOpen.value = false;
}

// Apaga o toggle inteiro. Para só dissolver e manter o conteúdo, o Backspace
// num resumo vazio faz isso (unsetToggleList).
function remove() {
  props.deleteNode();
  props.editor.commands.focus();
}
</script>
