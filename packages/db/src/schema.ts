import { relations } from "drizzle-orm";
import {
  boolean,
  index,
  text,
  timestamp,
  varchar,
  pgTable,
  integer,
  primaryKey,
} from "drizzle-orm/pg-core";

// Integrações padrão do ecossistema LBS
export const userIntegrations = pgTable(
  "user_integrations",
  {
    telegramId: varchar("telegram_id", { length: 50 }).notNull(),
    appId: integer("app_id").notNull(),
    appUserId: integer("app_user_id").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.telegramId, t.appId] }),
  })
);

export const userSettings = pgTable("user_settings", {
  loginhubId: integer("loginhub_id").primaryKey(),
  telegramId: varchar("telegram_id", { length: 50 }).unique(),
});

/**
 * Passes de uso único que vinculam um Telegram a uma conta já autenticada.
 *
 * O vínculo era feito digitando e-mail, senha e o código do 2FA DENTRO do chat.
 * A senha fica no histórico do Telegram — nos servidores deles, no aparelho e em
 * qualquer backup —, o código do autenticador também, e o bot precisava
 * reimplementar o login do hub inteiro, inclusive o enrolamento de 2FA, que num
 * chat não acontece sem expor o segredo no mesmo canal.
 *
 * Aqui a ordem se inverte: a pessoa já entrou no app pelo PC, com 2FA, e de lá
 * emite um passe. O passe atravessa o chat e é inofensivo — vale poucos minutos,
 * serve uma vez, e não abre nada além de gravar o vínculo.
 *
 * Guardamos o SHA-256 e não o passe: vazamento do banco não entrega passe
 * utilizável, do mesmo jeito que não se guarda senha em texto.
 */
export const telegramLinkTokens = pgTable("telegram_link_tokens", {
  tokenHash: varchar("token_hash", { length: 64 }).primaryKey(),
  loginhubId: integer("loginhub_id").notNull(),
  criadoEm: timestamp("criado_em", { withTimezone: true }).defaultNow().notNull(),
  expiraEm: timestamp("expira_em", { withTimezone: true }).notNull(),
  /** Carimbo do consumo. Não-nulo = já usado, e não serve de novo. */
  usadoEm: timestamp("usado_em", { withTimezone: true }),
});

// Workspaces (ambientes de trabalho estilo Notion): cada um é uma árvore de
// notas independente. O usuário troca de workspace no seletor da sidebar e só
// vê as notas de dentro dele. Apagar o workspace apaga as notas (cascade nas
// FKs abaixo).
export const workspaces = pgTable(
  "workspaces",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    userId: varchar("user_id", { length: 50 }).notNull(),
    name: varchar("name", { length: 120 }).notNull(),
    icon: text("icon"),
    order: integer("order").default(0).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => ({
    userIdx: index("workspaces_user_idx").on(t.userId),
  })
);

// Pastas para hierarquia estilo Notion
export const folders = pgTable("folders", {
  id: varchar("id", { length: 36 }).primaryKey(),
  userId: varchar("user_id", { length: 50 }).notNull(),
  name: varchar("name", { length: 120 }).notNull(),
  parentId: varchar("parent_id", { length: 36 }), // null para pastas raiz
  workspaceId: varchar("workspace_id", { length: 36 }).references(
    () => workspaces.id,
    { onDelete: "cascade" }
  ),
  icon: text("icon"),
  order: integer("order").default(0).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// Anotações (Zettelkasten)
export const notes = pgTable(
  "notes",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    userId: varchar("user_id", { length: 50 }).notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    content: text("content"), // Markdown ou JSON (Tiptap/Milkdown)
    folderId: varchar("folder_id", { length: 36 }).references(() => folders.id, {
      onDelete: "set null",
    }),
    // Workspace a que a nota pertence. Toda a sub-árvore de uma nota vive no
    // mesmo workspace do topo dela.
    workspaceId: varchar("workspace_id", { length: 36 }).references(
      () => workspaces.id,
      { onDelete: "cascade" }
    ),
    isEvergreen: boolean("is_evergreen").default(false).notNull(),
    isFavorite: boolean("is_favorite").default(false).notNull(),
    coverImage: text("cover_image"),
    coverPositionY: integer("cover_position_y").default(50).notNull(),
    icon: text("icon"),
    // Zettelkasten / Reminders
    remindAt: timestamp("remind_at", { withTimezone: true }),

    // Aninhamento infinito estilo Notion: uma nota pode conter outras notas.
    // FK auto-referente com ON DELETE CASCADE → apagar uma nota apaga toda a
    // sub-árvore. null = nota raiz.
    parentId: varchar("parent_id", { length: 36 }).references(
      (): any => notes.id,
      { onDelete: "cascade" }
    ),
    // Ordem entre irmãs na árvore (Notion permite reordenar/arrastar).
    order: integer("order").default(0).notNull(),

    // Lixeira (soft delete): null = ativa; preenchido = na lixeira.
    // Exclusão só remove a linha de vez ao esvaziar/apagar definitivo.
    deletedAt: timestamp("deleted_at", { withTimezone: true }),

    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => ({
    userIdx: index("notes_user_idx").on(t.userId),
    folderIdx: index("notes_folder_idx").on(t.folderId),
    workspaceIdx: index("notes_workspace_idx").on(t.userId, t.workspaceId),
    parentIdx: index("notes_parent_idx").on(t.parentId),
    deletedIdx: index("notes_deleted_idx").on(t.userId, t.deletedAt),
  })
);

// Tags
export const tags = pgTable("tags", {
  id: varchar("id", { length: 36 }).primaryKey(),
  name: varchar("name", { length: 50 }).notNull(),
  color: varchar("color", { length: 20 }),
  userId: varchar("user_id", { length: 50 }).notNull(),
});

// Relação Nota <-> Tag (N:N)
export const noteTags = pgTable(
  "note_tags",
  {
    noteId: varchar("note_id", { length: 36 })
      .notNull()
      .references(() => notes.id, { onDelete: "cascade" }),
    tagId: varchar("tag_id", { length: 36 })
      .notNull()
      .references(() => tags.id, { onDelete: "cascade" }),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.noteId, t.tagId] }),
  })
);

// Links entre notas (Para o Grafo estilo Obsidian)
export const noteLinks = pgTable(
  "note_links",
  {
    sourceNoteId: varchar("source_note_id", { length: 36 })
      .notNull()
      .references(() => notes.id, { onDelete: "cascade" }),
    targetNoteId: varchar("target_note_id", { length: 36 })
      .notNull()
      .references(() => notes.id, { onDelete: "cascade" }),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.sourceNoteId, t.targetNoteId] }),
  })
);

// Padrão LBS para bots
export const pushSubscriptions = pgTable(
  "push_subscriptions",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    userId: varchar("user_id", { length: 50 }).notNull(),
    endpoint: text("endpoint").notNull().unique(),
    p256dh: text("p256dh").notNull(),
    auth: text("auth").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => ({ userIdx: index("push_subscriptions_user_idx").on(t.userId) })
);

export const reminderSettings = pgTable("reminder_settings", {
  userId: varchar("user_id", { length: 50 }).primaryKey(),
  notifyPush: boolean("notify_push").default(true).notNull(),
  notifyTelegram: boolean("notify_telegram").default(true).notNull(),
  displayName: varchar("display_name", { length: 60 }),
  
  // Notas para rever hoje (Daily Digest)
  dailyDigestEnabled: boolean("daily_digest_enabled").default(true).notNull(),
  dailyDigestTime: varchar("daily_digest_time", { length: 5 }).default("08:00").notNull(),

  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// Relacionamentos (Drizzle)
export const workspacesRelations = relations(workspaces, ({ many }) => ({
  notes: many(notes),
  folders: many(folders),
}));

export const foldersRelations = relations(folders, ({ one, many }) => ({
  parent: one(folders, {
    fields: [folders.parentId],
    references: [folders.id],
    relationName: "parentFolder",
  }),
  children: many(folders, { relationName: "parentFolder" }),
  workspace: one(workspaces, {
    fields: [folders.workspaceId],
    references: [workspaces.id],
  }),
  notes: many(notes),
}));

export const notesRelations = relations(notes, ({ one, many }) => ({
  folder: one(folders, {
    fields: [notes.folderId],
    references: [folders.id],
  }),
  workspace: one(workspaces, {
    fields: [notes.workspaceId],
    references: [workspaces.id],
  }),
  parent: one(notes, {
    fields: [notes.parentId],
    references: [notes.id],
    relationName: "parentNote",
  }),
  children: many(notes, { relationName: "parentNote" }),
  tags: many(noteTags),
  outgoingLinks: many(noteLinks, { relationName: "sourceNote" }),
  incomingLinks: many(noteLinks, { relationName: "targetNote" }),
}));

export const tagsRelations = relations(tags, ({ many }) => ({
  notes: many(noteTags),
}));

export const noteTagsRelations = relations(noteTags, ({ one }) => ({
  note: one(notes, {
    fields: [noteTags.noteId],
    references: [notes.id],
  }),
  tag: one(tags, {
    fields: [noteTags.tagId],
    references: [tags.id],
  }),
}));

export const noteLinksRelations = relations(noteLinks, ({ one }) => ({
  sourceNote: one(notes, {
    fields: [noteLinks.sourceNoteId],
    references: [notes.id],
    relationName: "sourceNote",
  }),
  targetNote: one(notes, {
    fields: [noteLinks.targetNoteId],
    references: [notes.id],
    relationName: "targetNote",
  }),
}));

export type Workspace = typeof workspaces.$inferSelect;
export type NewWorkspace = typeof workspaces.$inferInsert;
export type Note = typeof notes.$inferSelect;
export type NewNote = typeof notes.$inferInsert;
export type Folder = typeof folders.$inferSelect;
export type NewFolder = typeof folders.$inferInsert;
export type Tag = typeof tags.$inferSelect;
export type NewTag = typeof tags.$inferInsert;
export type TelegramLinkToken = typeof telegramLinkTokens.$inferSelect;
export type NewTelegramLinkToken = typeof telegramLinkTokens.$inferInsert;
