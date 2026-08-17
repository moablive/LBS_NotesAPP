import { Router } from 'express';
import { db, schema } from '@notesapp/db';
import { eq, and, asc, isNull, max as maxFn } from 'drizzle-orm';
import { createWorkspaceSchema, updateWorkspaceSchema } from '@notesapp/models';
import crypto from 'crypto';

export const workspacesRouter = Router();


const DEFAULT_WORKSPACE = { name: 'Pessoal', icon: '🗂️' };

function listWorkspaces(loginhubId: string) {
  return db
    .select()
    .from(schema.workspaces)
    .where(eq(schema.workspaces.userId, loginhubId))
    .orderBy(asc(schema.workspaces.order), asc(schema.workspaces.createdAt));
}

async function nextOrder(loginhubId: string): Promise<number> {
  const rows = await db
    .select({ max: maxFn(schema.workspaces.order) })
    .from(schema.workspaces)
    .where(eq(schema.workspaces.userId, loginhubId));
  return (rows[0]?.max ?? -1) + 1;
}

async function insertWorkspace(loginhubId: string, name: string, icon: string | null) {
  const inserted = await db
    .insert(schema.workspaces)
    .values({
      id: crypto.randomUUID(),
      userId: loginhubId,
      name,
      icon,
      order: await nextOrder(loginhubId),
    })
    .returning();
  return inserted[0];
}

/**
 * Garante que o usuário tenha ao menos um workspace e que nenhuma nota fique
 * órfã (workspace_id NULL ⇒ invisível na sidebar). Usado pelo GET daqui e pelas
 * rotas de notas, então o app se conserta sozinho mesmo sem rodar o backfill.
 */
export async function ensureWorkspace(loginhubId: string) {
  const existing = await listWorkspaces(loginhubId);
  const workspaces = existing.length
    ? existing
    : [await insertWorkspace(loginhubId, DEFAULT_WORKSPACE.name, DEFAULT_WORKSPACE.icon)];

  await db
    .update(schema.notes)
    .set({ workspaceId: workspaces[0]?.id })
    .where(and(eq(schema.notes.userId, loginhubId), isNull(schema.notes.workspaceId)));

  await db
    .update(schema.folders)
    .set({ workspaceId: workspaces[0]?.id })
    .where(and(eq(schema.folders.userId, loginhubId), isNull(schema.folders.workspaceId)));

  return workspaces;
}

workspacesRouter.get('/', async (req, res) => {
  const loginhubId = String(req.user!.loginhubId);
  res.json(await ensureWorkspace(loginhubId));
});

workspacesRouter.post('/', async (req, res) => {
  const loginhubId = String(req.user!.loginhubId);
  const parsed = createWorkspaceSchema.parse(req.body);
  const created = await insertWorkspace(loginhubId, parsed.name, parsed.icon || null);
  res.status(201).json(created);
});

workspacesRouter.patch('/:id', async (req, res) => {
  const loginhubId = String(req.user!.loginhubId);
  const parsed = updateWorkspaceSchema.parse(req.body);

  const updates: any = {};
  if (parsed.name !== undefined) updates.name = parsed.name;
  if (parsed.icon !== undefined) updates.icon = parsed.icon || null;
  if (parsed.order !== undefined) updates.order = parsed.order;

  const updated = await db
    .update(schema.workspaces)
    .set(updates)
    .where(and(eq(schema.workspaces.id, req.params.id), eq(schema.workspaces.userId, loginhubId)))
    .returning();

  if (!updated.length) return res.status(404).json({ error: 'not_found' });
  res.json(updated[0]);
});

// Apagar um workspace leva as notas dele (FK ON DELETE CASCADE). O último não
// pode ser apagado — o app precisa de algum lugar para as notas existirem.
workspacesRouter.delete('/:id', async (req, res) => {
  const loginhubId = String(req.user!.loginhubId);
  const all = await listWorkspaces(loginhubId);

  if (!all.some((w) => w.id === req.params.id)) {
    return res.status(404).json({ error: 'not_found' });
  }
  if (all.length <= 1) {
    return res.status(400).json({
      error: 'last_workspace',
      message: 'não é possível apagar o único workspace',
    });
  }

  await db
    .delete(schema.workspaces)
    .where(and(eq(schema.workspaces.id, req.params.id), eq(schema.workspaces.userId, loginhubId)));

  res.status(204).send();
});
