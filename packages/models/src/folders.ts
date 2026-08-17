import { z } from 'zod';
import type { Folder } from '@notesapp/db';

export const createFolderSchema = z.object({
  name: z.string().min(1, 'Name is required').max(120),
  parentId: z.string().nullable().optional(),
  workspaceId: z.string().nullable().optional(),
  icon: z.string().nullable().optional(),
  order: z.number().int().optional(),
});

export const updateFolderSchema = createFolderSchema.partial().extend({
  id: z.string().optional()
});

export const reorderFoldersSchema = z.object({
  folderIds: z.array(z.string()),
});

export type CreateFolderDto = z.infer<typeof createFolderSchema>;
export type UpdateFolderDto = z.infer<typeof updateFolderSchema>;
export type FolderDto = Folder;
