import { Router } from 'express';
import { db, schema } from '@notesapp/db';
import { eq, and } from 'drizzle-orm';
import { createFolderSchema, updateFolderSchema, reorderFoldersSchema } from '@notesapp/models';
import crypto from 'crypto';
import { resolveTelegramId } from '../middleware/telegram-id.js';

export const foldersRouter = Router();

foldersRouter.use(resolveTelegramId);

foldersRouter.get('/', async (req, res) => {
  const telegramId = (req as any).telegramId;
  const folders = await db.query.folders.findMany({
    where: eq(schema.folders.userId, telegramId),
    orderBy: (folders, { asc, desc }) => [asc(folders.order), desc(folders.createdAt)],
  });
  res.json(folders);
});

foldersRouter.post('/', async (req, res) => {
  const telegramId = (req as any).telegramId;
  const parsed = createFolderSchema.parse(req.body);
  const id = crypto.randomUUID();
  
  const inserted = await db.insert(schema.folders).values({
    id,
    userId: telegramId,
    name: parsed.name,
    parentId: parsed.parentId || null,
    icon: parsed.icon || null,
    order: parsed.order || 0,
  }).returning();
  
  res.status(201).json(inserted[0]);
});

foldersRouter.patch('/:id', async (req, res) => {
  const telegramId = (req as any).telegramId;
  const parsed = updateFolderSchema.parse(req.body);
  
  const updates: any = {};
  if (parsed.name !== undefined) updates.name = parsed.name;
  if (parsed.parentId !== undefined) updates.parentId = parsed.parentId || null;
  if (parsed.icon !== undefined) updates.icon = parsed.icon || null;
  if (parsed.order !== undefined) updates.order = parsed.order;

  const updated = await db.update(schema.folders)
    .set(updates)
    .where(and(eq(schema.folders.id, req.params.id), eq(schema.folders.userId, telegramId)))
    .returning();
    
  if (!updated.length) return res.status(404).json({ error: 'not_found' });
  res.json(updated[0]);
});

foldersRouter.delete('/:id', async (req, res) => {
  const telegramId = (req as any).telegramId;
  await db.delete(schema.folders)
    .where(and(eq(schema.folders.id, req.params.id), eq(schema.folders.userId, telegramId)));
  res.status(204).send();
});

foldersRouter.post('/reorder', async (req, res) => {
  const telegramId = (req as any).telegramId;
  const parsed = reorderFoldersSchema.parse(req.body);
  
  await db.transaction(async (tx) => {
    let order = 0;
    for (const folderId of parsed.folderIds) {
      await tx.update(schema.folders)
        .set({ order })
        .where(and(
          eq(schema.folders.id, folderId),
          eq(schema.folders.userId, telegramId)
        ));
      order++;
    }
  });

  res.status(204).send();
});
