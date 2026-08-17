import { Markup } from 'telegraf';

// Por enquanto o bot só lista. Captura de nota, voz e lembretes entram depois.
export const menuKeyboard = Markup.keyboard([
  ['📝 Minhas Notas', '🗂️ Meus Workspaces'],
]).resize();
