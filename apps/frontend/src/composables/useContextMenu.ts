import { ref, shallowRef, type Component } from 'vue';

export type ContextMenuItem = {
  label: string;
  icon?: Component;
  /** Texto à direita, só informativo ("Del", "F2"). Não registra atalho. */
  shortcut?: string;
  danger?: boolean;
  /** Linha divisória acima deste item. */
  dividerBefore?: boolean;
  action: () => void | Promise<void>;
};

/**
 * Estado de UM menu para o app inteiro, desenhado uma vez no App.vue.
 *
 * Menu por linha da árvore seria o caminho óbvio e está errado por dois
 * motivos: a sidebar tem `overflow-y-auto`, então o popup seria recortado na
 * primeira linha visível; e cada linha montaria o próprio listener de
 * clique-fora — com algumas centenas de notas isso é centenas de listeners no
 * document para um menu que só pode estar aberto uma vez.
 */
const isOpen = ref(false);
const x = ref(0);
const y = ref(0);
const items = shallowRef<ContextMenuItem[]>([]);

export function useContextMenu() {
  /**
   * `origin` é o evento do botão direito (abre no cursor, como no Notion) ou o
   * elemento do botão `•••` (abre ancorado embaixo dele).
   */
  function open(origin: MouseEvent | HTMLElement, menuItems: ContextMenuItem[]) {
    if (origin instanceof MouseEvent) {
      origin.preventDefault();
      origin.stopPropagation();
      x.value = origin.clientX;
      y.value = origin.clientY;
    } else {
      const r = origin.getBoundingClientRect();
      x.value = r.left;
      y.value = r.bottom + 4;
    }
    items.value = menuItems;
    isOpen.value = true;
  }

  function close() {
    isOpen.value = false;
    items.value = [];
  }

  return { isOpen, x, y, items, open, close };
}
