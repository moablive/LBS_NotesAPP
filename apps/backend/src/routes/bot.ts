import { Router } from 'express';
import { db } from '@notesapp/db';
import { schema } from '@notesapp/db';
import { eq } from 'drizzle-orm';

export const botRouter = Router();

botRouter.get('/notes', async (req, res) => {
  const { telegramId } = req.query;
  
  if (typeof telegramId !== 'string' || !telegramId) {
    return res.status(400).json({ error: 'telegramId is required' });
  }

  const notesList = await db.query.notes.findMany({
    where: eq(schema.notes.userId, telegramId),
    orderBy: (notes, { asc, desc }) => [asc(notes.order), desc(notes.createdAt)],
  });

  return res.json(notesList);
});
