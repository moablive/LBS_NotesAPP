import { Context, Scenes } from 'telegraf';

export interface MyWizardSession extends Scenes.WizardSessionData {
  /** Resto do wizard de senha, removido. Mantido para nao quebrar sessoes vivas. */
  loginEmail?: string;
}

export interface MySession extends Scenes.SceneSession<MyWizardSession> {
  // global session state if needed
}

export interface BotContext extends Context {
  session: MySession;
  scene: Scenes.SceneContextScene<BotContext, MyWizardSession>;
  wizard: Scenes.WizardContextWizard<BotContext>;
}
