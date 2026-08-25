import { Router } from 'express';
import { notesRouter } from './notes.js';
import { workspacesRouter } from './workspaces.js';
import { foldersRouter } from './folders.js';
import { userRouter } from './user.js';
import { pushRouter } from './push.js';
import { remindersRouter } from './reminders.js';
import { requireAuth } from '../middleware/auth.js';
import { db } from '@notesapp/db';
import { schema } from '@notesapp/db';
import { eq } from 'drizzle-orm';

export const apiRouter = Router();

// O proxy `POST /auth/login` foi removido: o frontend fala direto com o
// LoginHUB pelo auth-kit (`lib/hubAuthClient.ts`), e a CORS do hub ja libera
// *.astralwavelabel.com. Repassar o login por aqui so acrescentava um salto e
// uma copia do contrato — que ficou desatualizada quando o hub passou a
// responder tres desfechos em vez de um.

// /bot e /prefs foram removidos: consultavam `schema.tasks` e `schema.userPrefs`,
// tabelas do TodoAPP que não existem no NotesAPP (o bot fala direto no Postgres,
// e o app não tem kanban/calendário para configurar).
apiRouter.use(requireAuth);
apiRouter.use(async (req, _res, next) => {
  // auto-create user_settings if not exists
  if (req.user) {
    const existing = await db.query.userSettings.findFirst({
      where: eq(schema.userSettings.loginhubId, req.user.loginhubId),
    });
    if (!existing) {
      await db.insert(schema.userSettings).values({ loginhubId: req.user.loginhubId }).onConflictDoNothing();
    }
  }
  next();
});

apiRouter.use('/user', userRouter);
apiRouter.use('/workspaces', workspacesRouter);
apiRouter.use('/notes', notesRouter);
apiRouter.use('/folders', foldersRouter);
apiRouter.use('/push', pushRouter);
apiRouter.use('/reminders', remindersRouter);
