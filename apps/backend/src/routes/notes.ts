import { Router } from 'express';
import { db, schema } from '@notesapp/db';
import { eq, and } from 'drizzle-orm';
import { createNoteSchema, updateNoteSchema } from '@notesapp/models';
import crypto from 'crypto';
import { resolveTelegramId } from '../middleware/telegram-id.js';

export const notesRouter = Router();

notesRouter.use(resolveTelegramId);

notesRouter.get('/', async (req, res) => {
  const telegramId = (req as any).telegramId;
  const notes = await db.query.notes.findMany({
    where: eq(schema.notes.userId, telegramId),
    orderBy: (notes, { desc }) => [desc(notes.updatedAt)],
  });
  res.json(notes);
});

notesRouter.post('/', async (req, res) => {
  const telegramId = (req as any).telegramId;
  const parsed = createNoteSchema.parse(req.body);
  const id = crypto.randomUUID(); // NotesAPP uses full UUID, or 36 length for id
  
  const inserted = await db.insert(schema.notes).values({
    id,
    userId: telegramId,
    title: parsed.title,
    content: parsed.content || null,
    folderId: parsed.folderId || null,
    parentId: parsed.parentId || null,
    isEvergreen: parsed.isEvergreen || false,
    isFavorite: parsed.isFavorite || false,
    coverImage: parsed.coverImage || null,
    icon: parsed.icon || null,
  }).returning();
  
  res.status(201).json(inserted[0]);
});

notesRouter.patch('/:id', async (req, res) => {
  const telegramId = (req as any).telegramId;
  const parsed = updateNoteSchema.parse(req.body);
  
  const updates: any = { updatedAt: new Date() };
  if (parsed.title !== undefined) updates.title = parsed.title;
  if (parsed.content !== undefined) updates.content = parsed.content || null;
  if (parsed.folderId !== undefined) updates.folderId = parsed.folderId || null;
  if (parsed.parentId !== undefined) updates.parentId = parsed.parentId || null;
  if (parsed.isEvergreen !== undefined) updates.isEvergreen = parsed.isEvergreen;
  if (parsed.isFavorite !== undefined) updates.isFavorite = parsed.isFavorite;
  if (parsed.coverImage !== undefined) updates.coverImage = parsed.coverImage || null;
  if (parsed.icon !== undefined) updates.icon = parsed.icon || null;

  const updated = await db.update(schema.notes)
    .set(updates)
    .where(and(eq(schema.notes.id, req.params.id), eq(schema.notes.userId, telegramId)))
    .returning();
    
  if (!updated.length) return res.status(404).json({ error: 'not_found' });
  res.json(updated[0]);
});

notesRouter.delete('/:id', async (req, res) => {
  const telegramId = (req as any).telegramId;
  await db.delete(schema.notes)
    .where(and(eq(schema.notes.id, req.params.id), eq(schema.notes.userId, telegramId)));
  res.status(204).send();
});
