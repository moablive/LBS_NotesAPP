import { Context, Scenes } from 'telegraf';

export interface MyWizardSession extends Scenes.WizardSessionData {
  /** E-mail digitado no LOGIN_WIZARD, guardado entre os passos. */
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
