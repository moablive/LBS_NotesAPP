import { Markup } from 'telegraf';
import { noMoabinhoIA, BOTAO_CASA } from '../lib/moabinhoia.js';

// Por enquanto o bot só lista. Captura de nota, voz e lembretes entram depois.
export const menuKeyboard = Markup.keyboard([
  ['📝 Minhas Notas', '🗂️ Meus Workspaces'],
  ...(noMoabinhoIA ? [[BOTAO_CASA]] : []),
  // persistent: o teclado fica sempre aberto, não recolhe quando se digita.
]).resize().persistent();
