import { Router } from 'express';
import { db, schema } from '@notesapp/db';
import { eq, and, sql, isNull, isNotNull } from 'drizzle-orm';
import { createNoteSchema, updateNoteSchema } from '@notesapp/models';
import crypto from 'crypto';
import { resolveTelegramId } from '../middleware/telegram-id.js';

export const notesRouter = Router();

notesRouter.use(resolveTelegramId);

/**
 * Valida um parentId proposto para uma nota:
 *  - o pai precisa existir e pertencer ao mesmo usuário;
 *  - não pode ser a própria nota (self-parent);
 *  - não pode criar ciclo (o pai não pode ser descendente da nota).
 * Retorna uma mensagem de erro (string) se inválido, ou null se ok.
 */
async function validateParent(
  telegramId: string,
  parentId: string,
  selfId: string | null,
): Promise<string | null> {
  if (selfId && parentId === selfId) return 'a nota não pode ser pai de si mesma';

  // Sobe a cadeia de ancestrais do pai proposto. Se encontrar selfId, é ciclo.
  let current: string | null = parentId;
  const seen = new Set<string>();
  while (current) {
    if (seen.has(current)) break; // proteção contra dado já cíclico
    seen.add(current);
    const rows = await db
      .select({ id: schema.notes.id, parentId: schema.notes.parentId })
      .from(schema.notes)
      .where(and(eq(schema.notes.id, current), eq(schema.notes.userId, telegramId)))
      .limit(1);
    const row = rows[0];
    if (!row) return 'nota pai inexistente';
    if (selfId && row.id === selfId) return 'movimento criaria um ciclo na árvore';
    current = row.parentId;
  }
  return null;
}

/** Próxima posição (order) entre as irmãs do mesmo pai. */
async function nextOrder(telegramId: string, parentId: string | null): Promise<number> {
  const rows = await db
    .select({ max: sql<number>`coalesce(max(${schema.notes.order}), -1)` })
    .from(schema.notes)
    .where(
      and(
        eq(schema.notes.userId, telegramId),
        parentId === null
          ? sql`${schema.notes.parentId} is null`
          : eq(schema.notes.parentId, parentId),
      ),
    );
  return (rows[0]?.max ?? -1) + 1;
}

notesRouter.get('/', async (req, res) => {
  const telegramId = (req as any).telegramId;
  const notes = await db.query.notes.findMany({
    where: and(eq(schema.notes.userId, telegramId), isNull(schema.notes.deletedAt)),
    orderBy: (notes, { asc, desc }) => [asc(notes.order), desc(notes.updatedAt)],
  });
  res.json(notes);
});

// Notas na lixeira (soft-deleted), mais recentes primeiro.
notesRouter.get('/trash', async (req, res) => {
  const telegramId = (req as any).telegramId;
  const notes = await db.query.notes.findMany({
    where: and(eq(schema.notes.userId, telegramId), isNotNull(schema.notes.deletedAt)),
    orderBy: (notes, { desc }) => [desc(notes.deletedAt)],
  });
  res.json(notes);
});

notesRouter.post('/', async (req, res) => {
  const telegramId = (req as any).telegramId;
  const parsed = createNoteSchema.parse(req.body);
  const parentId = parsed.parentId || null;

  if (parentId) {
    const err = await validateParent(telegramId, parentId, null);
    if (err) return res.status(400).json({ error: 'invalid_parent', message: err });
  }

  const id = crypto.randomUUID(); // NotesAPP uses full UUID, or 36 length for id
  const order = parsed.order ?? (await nextOrder(telegramId, parentId));

  const inserted = await db.insert(schema.notes).values({
    id,
    userId: telegramId,
    title: parsed.title,
    content: parsed.content || null,
    folderId: parsed.folderId || null,
    parentId,
    order,
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

  if (parsed.parentId !== undefined && parsed.parentId) {
    const err = await validateParent(telegramId, parsed.parentId, req.params.id);
    if (err) return res.status(400).json({ error: 'invalid_parent', message: err });
  }

  const updates: any = { updatedAt: new Date() };
  if (parsed.title !== undefined) updates.title = parsed.title;
  if (parsed.content !== undefined) updates.content = parsed.content || null;
  if (parsed.folderId !== undefined) updates.folderId = parsed.folderId || null;
  if (parsed.parentId !== undefined) updates.parentId = parsed.parentId || null;
  if (parsed.order !== undefined) updates.order = parsed.order;
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

// Mover para a LIXEIRA (soft delete). A nota e TODA a sua sub-árvore recebem
// deleted_at — nada é removido de fato; dá para restaurar depois.
notesRouter.delete('/:id', async (req, res) => {
  const telegramId = (req as any).telegramId;
  await db.execute(sql`
    WITH RECURSIVE sub AS (
      SELECT id FROM notes WHERE id = ${req.params.id} AND user_id = ${telegramId}
      UNION ALL
      SELECT n.id FROM notes n JOIN sub ON n.parent_id = sub.id
    )
    UPDATE notes SET deleted_at = now(), updated_at = now()
    WHERE user_id = ${telegramId} AND id IN (SELECT id FROM sub)
  `);
  res.status(204).send();
});

// Restaurar da lixeira: limpa deleted_at da nota e da sua sub-árvore. Se o pai
// original sumiu ou ainda está na lixeira, a nota volta como raiz (evita ficar
// invisível pendurada num pai inexistente).
notesRouter.post('/:id/restore', async (req, res) => {
  const telegramId = (req as any).telegramId;
  await db.execute(sql`
    WITH RECURSIVE sub AS (
      SELECT id FROM notes WHERE id = ${req.params.id} AND user_id = ${telegramId}
      UNION ALL
      SELECT n.id FROM notes n JOIN sub ON n.parent_id = sub.id
    )
    UPDATE notes SET deleted_at = NULL, updated_at = now()
    WHERE user_id = ${telegramId} AND id IN (SELECT id FROM sub)
  `);
  await db.execute(sql`
    UPDATE notes SET parent_id = NULL
    WHERE id = ${req.params.id} AND user_id = ${telegramId} AND parent_id IS NOT NULL
      AND parent_id NOT IN (
        SELECT id FROM notes WHERE user_id = ${telegramId} AND deleted_at IS NULL
      )
  `);
  const rows = await db
    .select()
    .from(schema.notes)
    .where(and(eq(schema.notes.id, req.params.id), eq(schema.notes.userId, telegramId)))
    .limit(1);
  if (!rows.length) return res.status(404).json({ error: 'not_found' });
  res.json(rows[0]);
});

// Apagar DEFINITIVAMENTE (só a partir da lixeira). Remove a linha de vez; a
// FK notes_parent_id_fkey (ON DELETE CASCADE) leva junto a sub-árvore.
notesRouter.delete('/:id/permanent', async (req, res) => {
  const telegramId = (req as any).telegramId;
  await db.delete(schema.notes)
    .where(and(eq(schema.notes.id, req.params.id), eq(schema.notes.userId, telegramId)));
  res.status(204).send();
});

// Esvaziar a lixeira: apaga definitivamente tudo que está com deleted_at.
notesRouter.post('/trash/empty', async (req, res) => {
  const telegramId = (req as any).telegramId;
  await db.delete(schema.notes)
    .where(and(eq(schema.notes.userId, telegramId), isNotNull(schema.notes.deletedAt)));
  res.status(204).send();
});
