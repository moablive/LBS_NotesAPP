import { ref } from 'vue';

export type Toast = {
  id: number;
  message: string;
  /** Rótulo do botão de ação. Sem ele o toast é só aviso. */
  actionLabel?: string;
  action?: () => void | Promise<void>;
};

const toasts = ref<Toast[]>([]);
const timers = new Map<number, ReturnType<typeof setTimeout>>();
let seq = 0;

/**
 * Avisos efêmeros no canto, com ação opcional.
 *
 * Existe por causa do excluir: mover para a lixeira sem dizer nada deixa o
 * usuário sem saber se funcionou, e um modal "tem certeza?" a cada exclusão é
 * o oposto de app fluido. O padrão do Notion é agir na hora e oferecer
 * "Desfazer" por alguns segundos — que é o que `restoreNote` já sabia fazer e
 * ninguém expunha.
 */
export function useToast() {
  function dismiss(id: number) {
    const t = timers.get(id);
    if (t) {
      clearTimeout(t);
      timers.delete(id);
    }
    toasts.value = toasts.value.filter(x => x.id !== id);
  }

  function show(message: string, opts: Omit<Toast, 'id' | 'message'> & { duracaoMs?: number } = {}) {
    const id = ++seq;
    const { duracaoMs = opts.action ? 7000 : 3500, ...resto } = opts;
    toasts.value = [...toasts.value, { id, message, ...resto }];
    timers.set(id, setTimeout(() => dismiss(id), duracaoMs));
    return id;
  }

  async function runAction(t: Toast) {
    dismiss(t.id);
    await t.action?.();
  }

  return { toasts, show, dismiss, runAction };
}
