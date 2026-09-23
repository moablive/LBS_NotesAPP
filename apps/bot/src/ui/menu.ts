import { Markup } from 'telegraf';
import { noMeuBruxo, BOTAO_CASA } from '../lib/meubruxo.js';

// Por enquanto o bot só lista. Captura de nota, voz e lembretes entram depois.
export const menuKeyboard = Markup.keyboard([
  ['📝 Minhas Notas', '🗂️ Meus Workspaces'],
  ...(noMeuBruxo ? [[BOTAO_CASA]] : []),
  // persistent: o teclado fica sempre aberto, não recolhe quando se digita.
]).resize().persistent();
