import { z } from 'zod';
import type { Note } from '@notesapp/db';

export const createNoteSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255),
  content: z.string().nullable().optional(),
  folderId: z.string().nullable().optional(), // Using string since DB schema uses varchar(36)
  parentId: z.string().nullable().optional(),
  isEvergreen: z.boolean().optional(),
  isFavorite: z.boolean().optional(),
  coverImage: z.string().nullable().optional(),
  icon: z.string().nullable().optional(),
});

export const updateNoteSchema = createNoteSchema.partial().extend({
  id: z.string().optional()
});

export type CreateNoteDto = z.infer<typeof createNoteSchema>;
export type UpdateNoteDto = z.infer<typeof updateNoteSchema>;
export type NoteDto = Note;
