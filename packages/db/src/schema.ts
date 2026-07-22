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
  jsonb,
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

// Pastas para hierarquia estilo Notion
export const folders = pgTable("folders", {
  id: varchar("id", { length: 36 }).primaryKey(),
  userId: varchar("user_id", { length: 50 }).notNull(),
  name: varchar("name", { length: 120 }).notNull(),
  parentId: varchar("parent_id", { length: 36 }), // null para pastas raiz
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
    isEvergreen: boolean("is_evergreen").default(false).notNull(),
    isFavorite: boolean("is_favorite").default(false).notNull(),
    coverImage: text("cover_image"),
    icon: text("icon"),
    
    // Zettelkasten / Reminders
    remindAt: timestamp("remind_at", { withTimezone: true }),
    
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
export const foldersRelations = relations(folders, ({ one, many }) => ({
  parent: one(folders, {
    fields: [folders.parentId],
    references: [folders.id],
    relationName: "parentFolder",
  }),
  children: many(folders, { relationName: "parentFolder" }),
  notes: many(notes),
}));

export const notesRelations = relations(notes, ({ one, many }) => ({
  folder: one(folders, {
    fields: [notes.folderId],
    references: [folders.id],
  }),
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

export type Note = typeof notes.$inferSelect;
export type NewNote = typeof notes.$inferInsert;
export type Folder = typeof folders.$inferSelect;
export type NewFolder = typeof folders.$inferInsert;
export type Tag = typeof tags.$inferSelect;
export type NewTag = typeof tags.$inferInsert;
