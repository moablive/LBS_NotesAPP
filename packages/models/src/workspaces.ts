import { z } from 'zod';
import type { Workspace } from '@notesapp/db';

export const createWorkspaceSchema = z.object({
  name: z.string().min(1, 'Name is required').max(120),
  icon: z.string().nullable().optional(),
  order: z.number().int().optional(),
});

export const updateWorkspaceSchema = createWorkspaceSchema.partial();

export type CreateWorkspaceDto = z.infer<typeof createWorkspaceSchema>;
export type UpdateWorkspaceDto = z.infer<typeof updateWorkspaceSchema>;
export type WorkspaceDto = Workspace;
