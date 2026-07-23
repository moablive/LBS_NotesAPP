CREATE TABLE IF NOT EXISTS "folders" (
  "id" varchar(36) PRIMARY KEY,
  "user_id" varchar(50) NOT NULL,
  "name" varchar(120) NOT NULL,
  "parent_id" varchar(36),
  "icon" text,
  "order" integer DEFAULT 0 NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "notes" (
  "id" varchar(36) PRIMARY KEY,
  "user_id" varchar(50) NOT NULL,
  "title" varchar(255) NOT NULL,
  "content" text,
  "folder_id" varchar(36) REFERENCES "folders"("id") ON DELETE SET NULL,
  "is_evergreen" boolean DEFAULT false NOT NULL,
  "is_favorite" boolean DEFAULT false NOT NULL,
  "cover_image" text,
  "icon" text,
  "remind_at" timestamp with time zone,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS "notes_user_idx" ON "notes" ("user_id");
CREATE INDEX IF NOT EXISTS "notes_folder_idx" ON "notes" ("folder_id");

CREATE TABLE IF NOT EXISTS "tags" (
  "id" varchar(36) PRIMARY KEY,
  "name" varchar(50) NOT NULL,
  "color" varchar(20),
  "user_id" varchar(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS "note_tags" (
  "note_id" varchar(36) NOT NULL REFERENCES "notes"("id") ON DELETE CASCADE,
  "tag_id" varchar(36) NOT NULL REFERENCES "tags"("id") ON DELETE CASCADE,
  PRIMARY KEY ("note_id", "tag_id")
);

CREATE TABLE IF NOT EXISTS "note_links" (
  "source_note_id" varchar(36) NOT NULL REFERENCES "notes"("id") ON DELETE CASCADE,
  "target_note_id" varchar(36) NOT NULL REFERENCES "notes"("id") ON DELETE CASCADE,
  PRIMARY KEY ("source_note_id", "target_note_id")
);
