import { Router } from 'express';
import { db, schema } from '@notesapp/db';
import { eq, and, sql, isNull, isNotNull } from 'drizzle-orm';
import { createNoteSchema, updateNoteSchema } from '@notesapp/models';
import crypto from 'crypto';
import { ensureWorkspace } from './workspaces.js';

export const notesRouter = Router();


/** O workspace existe e é do usuário? */
async function ownsWorkspace(loginhubId: string, workspaceId: string): Promise<boolean> {
  const rows = await db
    .select({ id: schema.workspaces.id })
    .from(schema.workspaces)
    .where(
      and(eq(schema.workspaces.id, workspaceId), eq(schema.workspaces.userId, loginhubId)),
    )
    .limit(1);
  return rows.length > 0;
}

async function workspaceOfNote(loginhubId: string, noteId: string): Promise<string | null> {
  const rows = await db
    .select({ workspaceId: schema.notes.workspaceId })
    .from(schema.notes)
    .where(and(eq(schema.notes.id, noteId), eq(schema.notes.userId, loginhubId)))
    .limit(1);
  return rows[0]?.workspaceId ?? null;
}

/**
 * Workspace onde a nota deve nascer: o do pai (sub-árvore nunca se divide), o
 * pedido pelo cliente, ou o primeiro do usuário como último recurso.
 */
async function resolveWorkspaceId(
  loginhubId: string,
  requested: string | null,
  parentId: string | null,
): Promise<string | null> {
  if (parentId) {
    const inherited = await workspaceOfNote(loginhubId, parentId);
    if (inherited) return inherited;
  }
  if (requested) return requested;
  const workspaces = await ensureWorkspace(loginhubId);
  return workspaces[0]?.id ?? null;
}

/** Move a nota e TODA a sub-árvore dela para um workspace. */
async function moveSubtreeToWorkspace(
  loginhubId: string,
  noteId: string,
  workspaceId: string,
): Promise<void> {
  await db.execute(sql`
    WITH RECURSIVE sub AS (
      SELECT id FROM notes WHERE id = ${noteId} AND user_id = ${loginhubId}
      UNION ALL
      SELECT n.id FROM notes n JOIN sub ON n.parent_id = sub.id
    )
    UPDATE notes SET workspace_id = ${workspaceId}
    WHERE user_id = ${loginhubId} AND id IN (SELECT id FROM sub)
  `);
}

/**
 * Extrai os IDs de notas linkadas do conteúdo HTML (Grafo).
 */
function extractLinks(content: string): string[] {
  if (!content) return [];
  const matches = [...content.matchAll(/<a[^>]*data-note-id=["']([a-f0-9-]+)["']/gi)];
  return [...new Set(matches.map(m => m[1]).filter((id): id is string => !!id))];
}

/**
 * Valida um parentId proposto para uma nota:
 *  - o pai precisa existir e pertencer ao mesmo usuário;
 *  - não pode ser a própria nota (self-parent);
 *  - não pode criar ciclo (o pai não pode ser descendente da nota).
 * Retorna uma mensagem de erro (string) se inválido, ou null se ok.
 */
async function validateParent(
  loginhubId: string,
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
    const rows: { id: string, parentId: string | null }[] = await db
      .select({ id: schema.notes.id, parentId: schema.notes.parentId })
      .from(schema.notes)
      .where(and(eq(schema.notes.id, current), eq(schema.notes.userId, loginhubId)))
      .limit(1);
    const row = rows[0];
    if (!row) return 'nota pai inexistente';
    if (selfId && row.id === selfId) return 'movimento criaria um ciclo na árvore';
    current = row.parentId;
  }
  return null;
}

import { max as maxFn } from 'drizzle-orm';

async function nextOrder(
  loginhubId: string,
  parentId: string | null,
  workspaceId: string | null,
): Promise<number> {
  const rows = await db
    .select({ max: maxFn(schema.notes.order) })
    .from(schema.notes)
    .where(
      and(
        eq(schema.notes.userId, loginhubId),
        parentId === null
          ? isNull(schema.notes.parentId)
          : eq(schema.notes.parentId, parentId),
        // Notas raiz são ordenadas dentro do próprio workspace.
        ...(parentId === null && workspaceId
          ? [eq(schema.notes.workspaceId, workspaceId)]
          : []),
      ),
    );
  return (rows[0]?.max ?? -1) + 1;
}

/** `?workspaceId=` — filtra pelo workspace ativo; ausente = todos (bot/legado). */
function workspaceFilter(req: any) {
  const workspaceId = typeof req.query.workspaceId === 'string' ? req.query.workspaceId : null;
  return workspaceId ? [eq(schema.notes.workspaceId, workspaceId)] : [];
}

notesRouter.get('/', async (req, res) => {
  const loginhubId = String(req.user!.loginhubId);
  const notes = await db.query.notes.findMany({
    where: and(
      eq(schema.notes.userId, loginhubId),
      isNull(schema.notes.deletedAt),
      ...workspaceFilter(req),
    ),
    orderBy: (notes, { asc, desc }) => [asc(notes.order), desc(notes.updatedAt)],
  });
  res.json(notes);
});

// Busca as arestas do grafo para todas as notas do usuário atual
notesRouter.get('/links', async (req, res) => {
  const telegramId = (req as any).telegramId;

  // Como noteLinks tem sourceNoteId, garantimos que a origem pertence ao usuário
  // e não está deletada.
  const edges = await db
    .select({
      sourceNoteId: schema.noteLinks.sourceNoteId,
      targetNoteId: schema.noteLinks.targetNoteId,
    })
    .from(schema.noteLinks)
    .innerJoin(schema.notes, eq(schema.noteLinks.sourceNoteId, schema.notes.id))
    .where(and(
      eq(schema.notes.userId, telegramId),
      isNull(schema.notes.deletedAt)
    ));

  res.json(edges);
});

// Busca as notas que referenciam a nota atual (Backlinks)
notesRouter.get('/:id/backlinks', async (req, res) => {
  const telegramId = (req as any).telegramId;

  const backlinks = await db
    .select({
      id: schema.notes.id,
      title: schema.notes.title,
      icon: schema.notes.icon,
    })
    .from(schema.notes)
    .innerJoin(schema.noteLinks, eq(schema.notes.id, schema.noteLinks.sourceNoteId))
    .where(and(
      eq(schema.noteLinks.targetNoteId, req.params.id),
      eq(schema.notes.userId, telegramId),
      isNull(schema.notes.deletedAt)
    ))
    .orderBy(schema.notes.updatedAt);

  res.json(backlinks);
});

// Notas na lixeira (soft-deleted), mais recentes primeiro.
notesRouter.get('/trash', async (req, res) => {
  const loginhubId = String(req.user!.loginhubId);
  const notes = await db.query.notes.findMany({
    where: and(
      eq(schema.notes.userId, loginhubId),
      isNotNull(schema.notes.deletedAt),
      ...workspaceFilter(req),
    ),
    orderBy: (notes, { desc }) => [desc(notes.deletedAt)],
  });
  res.json(notes);
});

notesRouter.post('/', async (req, res) => {
  const loginhubId = String(req.user!.loginhubId);
  const parsed = createNoteSchema.parse(req.body);
  const parentId = parsed.parentId || null;

  if (parentId) {
    const err = await validateParent(loginhubId, parentId, null);
    if (err) return res.status(400).json({ error: 'invalid_parent', message: err });
  }

  if (parsed.workspaceId && !(await ownsWorkspace(loginhubId, parsed.workspaceId))) {
    return res.status(400).json({ error: 'invalid_workspace' });
  }

  const id = crypto.randomUUID(); // NotesAPP uses full UUID, or 36 length for id
  const workspaceId = await resolveWorkspaceId(loginhubId, parsed.workspaceId || null, parentId);
  const order = parsed.order ?? (await nextOrder(loginhubId, parentId, workspaceId));

  const inserted = await db.insert(schema.notes).values({
    id,
    userId: loginhubId,
    title: parsed.title,
    content: parsed.content || null,
    folderId: parsed.folderId || null,
    parentId,
    workspaceId,
    order,
    isEvergreen: parsed.isEvergreen || false,
    isFavorite: parsed.isFavorite || false,
    coverImage: parsed.coverImage || null,
    coverPositionY: parsed.coverPositionY ?? 50,
    icon: parsed.icon || null,
  }).returning();

  // Graph links sync
  if (parsed.content) {
    const targetIds = extractLinks(parsed.content);
    if (targetIds.length > 0) {
      const linkValues = targetIds.map(targetId => ({
        sourceNoteId: id,
        targetNoteId: targetId
      }));
      await db.insert(schema.noteLinks).values(linkValues).onConflictDoNothing();
    }
  }

  res.status(201).json(inserted[0]);
});

notesRouter.patch('/:id', async (req, res) => {
  const loginhubId = String(req.user!.loginhubId);
  const parsed = updateNoteSchema.parse(req.body);

  if (parsed.parentId !== undefined && parsed.parentId) {
    const err = await validateParent(loginhubId, parsed.parentId, req.params.id);
    if (err) return res.status(400).json({ error: 'invalid_parent', message: err });
  }

  // Mudou de pai ou de workspace? A nota inteira (com a sub-árvore) muda de
  // workspace: explicitamente, ou herdando o do novo pai.
  let targetWorkspaceId: string | null = null;
  if (parsed.workspaceId !== undefined || parsed.parentId !== undefined) {
    if (parsed.workspaceId) {
      if (!(await ownsWorkspace(loginhubId, parsed.workspaceId))) {
        return res.status(400).json({ error: 'invalid_workspace' });
      }
      targetWorkspaceId = parsed.workspaceId;
    } else if (parsed.parentId) {
      targetWorkspaceId = await workspaceOfNote(loginhubId, parsed.parentId);
    }
  }

  const updates: any = { updatedAt: new Date() };
  if (targetWorkspaceId) updates.workspaceId = targetWorkspaceId;
  if (parsed.title !== undefined) updates.title = parsed.title;
  if (parsed.content !== undefined) updates.content = parsed.content || null;
  if (parsed.folderId !== undefined) updates.folderId = parsed.folderId || null;
  if (parsed.parentId !== undefined) updates.parentId = parsed.parentId || null;
  if (parsed.order !== undefined) updates.order = parsed.order;
  if (parsed.isEvergreen !== undefined) updates.isEvergreen = parsed.isEvergreen;
  if (parsed.isFavorite !== undefined) updates.isFavorite = parsed.isFavorite;
  if (parsed.coverImage !== undefined) updates.coverImage = parsed.coverImage || null;
  // Reposicionamento da capa (0–100%). Sem isto o PATCH descartava o valor e a
  // posição voltava para 50% no próximo fetch.
  if (parsed.coverPositionY !== undefined) updates.coverPositionY = parsed.coverPositionY;
  if (parsed.icon !== undefined) updates.icon = parsed.icon || null;

  const updated = await db.update(schema.notes)
    .set(updates)
    .where(and(eq(schema.notes.id, req.params.id), eq(schema.notes.userId, loginhubId)))
    .returning();

  if (!updated.length) return res.status(404).json({ error: 'not_found' });

  // Graph links sync
  if (parsed.content !== undefined) {
    await db.delete(schema.noteLinks).where(eq(schema.noteLinks.sourceNoteId, req.params.id));

    const targetIds = extractLinks(parsed.content || '');
    if (targetIds.length > 0) {
      const linkValues = targetIds.map(targetId => ({
        sourceNoteId: req.params.id,
        targetNoteId: targetId
      }));
      await db.insert(schema.noteLinks).values(linkValues).onConflictDoNothing();
    }
  }

  if (targetWorkspaceId) {
    await moveSubtreeToWorkspace(loginhubId, req.params.id, targetWorkspaceId);
  }

  res.json(updated[0]);
});

// Mover para a LIXEIRA (soft delete). A nota e TODA a sua sub-árvore recebem
// deleted_at — nada é removido de fato; dá para restaurar depois.
notesRouter.delete('/:id', async (req, res) => {
  const loginhubId = String(req.user!.loginhubId);
  await db.execute(sql`
    WITH RECURSIVE sub AS (
      SELECT id FROM notes WHERE id = ${req.params.id} AND user_id = ${loginhubId}
      UNION ALL
      SELECT n.id FROM notes n JOIN sub ON n.parent_id = sub.id
    )
    UPDATE notes SET deleted_at = now(), updated_at = now()
    WHERE user_id = ${loginhubId} AND id IN (SELECT id FROM sub)
  `);
  res.status(204).send();
});

// Restaurar da lixeira: limpa deleted_at da nota e da sua sub-árvore. Se o pai
// original sumiu ou ainda está na lixeira, a nota volta como raiz (evita ficar
// invisível pendurada num pai inexistente).
notesRouter.post('/:id/restore', async (req, res) => {
  const loginhubId = String(req.user!.loginhubId);
  await db.execute(sql`
    WITH RECURSIVE sub AS (
      SELECT id FROM notes WHERE id = ${req.params.id} AND user_id = ${loginhubId}
      UNION ALL
      SELECT n.id FROM notes n JOIN sub ON n.parent_id = sub.id
    )
    UPDATE notes SET deleted_at = NULL, updated_at = now()
    WHERE user_id = ${loginhubId} AND id IN (SELECT id FROM sub)
  `);
  await db.execute(sql`
    UPDATE notes SET parent_id = NULL
    WHERE id = ${req.params.id} AND user_id = ${loginhubId} AND parent_id IS NOT NULL
      AND parent_id NOT IN (
        SELECT id FROM notes WHERE user_id = ${loginhubId} AND deleted_at IS NULL
      )
  `);
  const rows = await db
    .select()
    .from(schema.notes)
    .where(and(eq(schema.notes.id, req.params.id), eq(schema.notes.userId, loginhubId)))
    .limit(1);
  if (!rows.length) return res.status(404).json({ error: 'not_found' });
  res.json(rows[0]);
});

// Apagar DEFINITIVAMENTE (só a partir da lixeira). Remove a linha de vez; a
// FK notes_parent_id_fkey (ON DELETE CASCADE) leva junto a sub-árvore.
notesRouter.delete('/:id/permanent', async (req, res) => {
  const loginhubId = String(req.user!.loginhubId);
  await db.delete(schema.notes)
    .where(and(eq(schema.notes.id, req.params.id), eq(schema.notes.userId, loginhubId)));
  res.status(204).send();
});

// Esvaziar a lixeira: apaga definitivamente tudo que está com deleted_at
// (restrito ao workspace quando vem `?workspaceId=`).
notesRouter.post('/trash/empty', async (req, res) => {
  const loginhubId = String(req.user!.loginhubId);
  await db.delete(schema.notes)
    .where(and(
      eq(schema.notes.userId, loginhubId),
      isNotNull(schema.notes.deletedAt),
      ...workspaceFilter(req),
    ));
  res.status(204).send();
});
