<template>
  <Teleport to="body">
    <div class="fixed bottom-4 left-4 z-[300] flex flex-col gap-2 pointer-events-none">
      <TransitionGroup
        enter-active-class="transition duration-150 ease-out"
        enter-from-class="opacity-0 translate-y-2"
        leave-active-class="transition duration-150 ease-in"
        leave-to-class="opacity-0 translate-y-2"
        move-class="transition duration-150"
      >
        <div
          v-for="t in toast.toasts.value"
          :key="t.id"
          class="pointer-events-auto flex items-center gap-3 pl-3.5 pr-2 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--bg)] shadow-2xl shadow-black/60 max-w-[380px]"
        >
          <span class="text-[13px] text-[var(--text)] flex-1">{{ t.message }}</span>
          <button
            v-if="t.action"
            class="text-[12px] font-semibold text-[var(--accent)] hover:underline shrink-0 px-1"
            @click="toast.runAction(t)"
          >
            {{ t.actionLabel || 'Desfazer' }}
          </button>
          <button
            class="text-[var(--muted)] hover:text-[var(--text)] shrink-0 p-1 transition-colors"
            title="Fechar"
            @click="toast.dismiss(t.id)"
          >
            <XMarkIcon class="w-3.5 h-3.5" />
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { XMarkIcon } from '@heroicons/vue/24/outline';
import { useToast } from '@/composables/useToast';

const toast = useToast();
</script>
