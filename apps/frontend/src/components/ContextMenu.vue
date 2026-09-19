<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="opacity-0 scale-95"
      leave-active-class="transition duration-75 ease-in"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="menu.isOpen.value"
        ref="menuEl"
        class="fixed z-[200] min-w-[210px] py-1 rounded-lg border border-[var(--border)] bg-[var(--bg)] shadow-2xl shadow-black/60 origin-top-left"
        :style="{ left: pos.left + 'px', top: pos.top + 'px' }"
        @click.stop
        @contextmenu.prevent
      >
        <template v-for="(item, i) in menu.items.value" :key="i">
          <div v-if="item.dividerBefore" class="my-1 border-t border-[var(--border)]"></div>
          <button
            class="w-full flex items-center gap-2.5 px-3 py-[6px] text-[13px] text-left transition-colors"
            :class="item.danger
              ? 'text-[#ff3b30] hover:bg-[#ff3b30]/10'
              : 'text-[var(--text)] hover:bg-[var(--bg-hover)]'"
            @click="run(item)"
          >
            <component :is="item.icon" v-if="item.icon" class="w-4 h-4 shrink-0 opacity-80" />
            <span class="flex-1 truncate">{{ item.label }}</span>
            <span v-if="item.shortcut" class="text-[11px] text-[var(--muted)] shrink-0 pl-3">{{ item.shortcut }}</span>
          </button>
        </template>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
import { useContextMenu, type ContextMenuItem } from '@/composables/useContextMenu';

const menu = useContextMenu();
const menuEl = ref<HTMLElement | null>(null);
const pos = ref({ left: 0, top: 0 });

/**
 * Posiciona só depois de medir. Menu ancorado no cursor perto do rodapé da
 * sidebar — que é justamente onde ficam as notas mais recentes — sairia da
 * tela pela borda de baixo e teria o item "Excluir" inalcançável.
 */
watch(menu.isOpen, async (aberto) => {
  if (!aberto) return;
  pos.value = { left: menu.x.value, top: menu.y.value };
  await nextTick();
  const el = menuEl.value;
  if (!el) return;
  const r = el.getBoundingClientRect();
  const margem = 8;
  let left = menu.x.value;
  let top = menu.y.value;
  if (left + r.width + margem > window.innerWidth) {
    left = Math.max(margem, window.innerWidth - r.width - margem);
  }
  if (top + r.height + margem > window.innerHeight) {
    top = Math.max(margem, window.innerHeight - r.height - margem);
  }
  pos.value = { left, top };
});

async function run(item: ContextMenuItem) {
  menu.close();
  await item.action();
}

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') menu.close();
}

function onScroll() {
  // Rolar a árvore com o menu aberto deixaria o popup flutuando longe da linha
  // que ele representa — fechar é o que todo app nativo faz.
  if (menu.isOpen.value) menu.close();
}

onMounted(() => {
  window.addEventListener('click', menu.close);
  window.addEventListener('resize', menu.close);
  window.addEventListener('keydown', onKey);
  // `capture`: o scroll acontece na sidebar, não na window, e scroll não borbulha.
  window.addEventListener('scroll', onScroll, true);
});

onUnmounted(() => {
  window.removeEventListener('click', menu.close);
  window.removeEventListener('resize', menu.close);
  window.removeEventListener('keydown', onKey);
  window.removeEventListener('scroll', onScroll, true);
});
</script>
