import { Router } from 'express';
import { db, schema } from '@notesapp/db';
import { eq, and } from 'drizzle-orm';
import { createFolderSchema, updateFolderSchema, reorderFoldersSchema } from '@notesapp/models';
import crypto from 'crypto';

export const foldersRouter = Router();


foldersRouter.get('/', async (req, res) => {
  const loginhubId = String(req.user!.loginhubId);
  // `?workspaceId=` restringe ao workspace ativo; ausente = todas.
  const workspaceId = typeof req.query.workspaceId === 'string' ? req.query.workspaceId : null;
  const folders = await db.query.folders.findMany({
    where: and(
      eq(schema.folders.userId, loginhubId),
      ...(workspaceId ? [eq(schema.folders.workspaceId, workspaceId)] : []),
    ),
    orderBy: (folders, { asc, desc }) => [asc(folders.order), desc(folders.createdAt)],
  });
  res.json(folders);
});

foldersRouter.post('/', async (req, res) => {
  const loginhubId = String(req.user!.loginhubId);
  const parsed = createFolderSchema.parse(req.body);
  const id = crypto.randomUUID();
  
  const inserted = await db.insert(schema.folders).values({
    id,
    userId: loginhubId,
    name: parsed.name,
    parentId: parsed.parentId || null,
    workspaceId: parsed.workspaceId || null,
    icon: parsed.icon || null,
    order: parsed.order || 0,
  }).returning();
  
  res.status(201).json(inserted[0]);
});

foldersRouter.patch('/:id', async (req, res) => {
  const loginhubId = String(req.user!.loginhubId);
  const parsed = updateFolderSchema.parse(req.body);
  
  const updates: any = {};
  if (parsed.name !== undefined) updates.name = parsed.name;
  if (parsed.parentId !== undefined) updates.parentId = parsed.parentId || null;
  if (parsed.workspaceId !== undefined) updates.workspaceId = parsed.workspaceId || null;
  if (parsed.icon !== undefined) updates.icon = parsed.icon || null;
  if (parsed.order !== undefined) updates.order = parsed.order;

  const updated = await db.update(schema.folders)
    .set(updates)
    .where(and(eq(schema.folders.id, req.params.id), eq(schema.folders.userId, loginhubId)))
    .returning();
    
  if (!updated.length) return res.status(404).json({ error: 'not_found' });
  res.json(updated[0]);
});

foldersRouter.delete('/:id', async (req, res) => {
  const loginhubId = String(req.user!.loginhubId);
  await db.delete(schema.folders)
    .where(and(eq(schema.folders.id, req.params.id), eq(schema.folders.userId, loginhubId)));
  res.status(204).send();
});

foldersRouter.post('/reorder', async (req, res) => {
  const loginhubId = String(req.user!.loginhubId);
  const parsed = reorderFoldersSchema.parse(req.body);
  
  await db.transaction(async (tx) => {
    let order = 0;
    for (const folderId of parsed.folderIds) {
      await tx.update(schema.folders)
        .set({ order })
        .where(and(
          eq(schema.folders.id, folderId),
          eq(schema.folders.userId, loginhubId)
        ));
      order++;
    }
  });

  res.status(204).send();
});
