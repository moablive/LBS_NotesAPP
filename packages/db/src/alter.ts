import { db } from "./index.js";
import { sql } from "drizzle-orm";

/**
 * Alterações de schema idempotentes (`pnpm --filter @notesapp/db db:alter`).
 *
 * A pasta ./drizzle é herdada do TodoAPP e não descreve este banco, então as
 * mudanças do NotesAPP moram aqui: tudo com IF NOT EXISTS / WHERE NOT EXISTS,
 * seguro para rodar quantas vezes quiser.
 */
const steps: { label: string; run: () => Promise<unknown> }[] = [
  {
    label: "notes.cover_position_y",
    run: () =>
      db.execute(
        sql`ALTER TABLE "notes" ADD COLUMN IF NOT EXISTS "cover_position_y" integer DEFAULT 50 NOT NULL;`
      ),
  },
  {
    label: "tabela workspaces",
    run: () =>
      db.execute(sql`
        CREATE TABLE IF NOT EXISTS "workspaces" (
          "id" varchar(36) PRIMARY KEY,
          "user_id" varchar(50) NOT NULL,
          "name" varchar(120) NOT NULL,
          "icon" text,
          "order" integer DEFAULT 0 NOT NULL,
          "created_at" timestamp with time zone DEFAULT now() NOT NULL
        );
      `),
  },
  {
    label: "índice workspaces_user_idx",
    run: () =>
      db.execute(
        sql`CREATE INDEX IF NOT EXISTS "workspaces_user_idx" ON "workspaces" ("user_id");`
      ),
  },
  {
    label: "notes.workspace_id",
    run: () =>
      db.execute(sql`
        ALTER TABLE "notes" ADD COLUMN IF NOT EXISTS "workspace_id" varchar(36)
          REFERENCES "workspaces"("id") ON DELETE CASCADE;
      `),
  },
  {
    label: "folders.workspace_id",
    run: () =>
      db.execute(sql`
        ALTER TABLE "folders" ADD COLUMN IF NOT EXISTS "workspace_id" varchar(36)
          REFERENCES "workspaces"("id") ON DELETE CASCADE;
      `),
  },
  {
    label: "índice notes_workspace_idx",
    run: () =>
      db.execute(
        sql`CREATE INDEX IF NOT EXISTS "notes_workspace_idx" ON "notes" ("user_id", "workspace_id");`
      ),
  },
  {
    // Quem já tinha notas ganha um workspace "Pessoal" para não abrir o app vazio.
    label: 'workspace "Pessoal" para donos de notas sem workspace',
    run: () =>
      db.execute(sql`
        INSERT INTO "workspaces" ("id", "user_id", "name", "icon", "order")
        SELECT gen_random_uuid()::text, u.user_id, 'Pessoal', '🗂️', 0
          FROM (
            SELECT DISTINCT user_id FROM "notes" WHERE workspace_id IS NULL
            UNION
            SELECT DISTINCT user_id FROM "folders" WHERE workspace_id IS NULL
          ) u
         WHERE NOT EXISTS (
           SELECT 1 FROM "workspaces" w WHERE w.user_id = u.user_id
         );
      `),
  },
  {
    // Notas órfãs entram no primeiro workspace do dono (senão ficariam invisíveis).
    label: "backfill notes.workspace_id",
    run: () =>
      db.execute(sql`
        UPDATE "notes" n
           SET workspace_id = w.id
          FROM (
            SELECT DISTINCT ON (user_id) id, user_id
              FROM "workspaces"
             ORDER BY user_id, "order" ASC, created_at ASC
          ) w
         WHERE n.user_id = w.user_id
           AND n.workspace_id IS NULL;
      `),
  },
  {
    // Mesma adoção para as pastas (legado), que também são lidas por workspace.
    label: "backfill folders.workspace_id",
    run: () =>
      db.execute(sql`
        UPDATE "folders" f
           SET workspace_id = w.id
          FROM (
            SELECT DISTINCT ON (user_id) id, user_id
              FROM "workspaces"
             ORDER BY user_id, "order" ASC, created_at ASC
          ) w
         WHERE f.user_id = w.user_id
           AND f.workspace_id IS NULL;
      `),
  },
];

async function main() {
  let failed = 0;
  for (const step of steps) {
    try {
      await step.run();
      console.log(`✓ ${step.label}`);
    } catch (e) {
      failed++;
      console.error(`✗ ${step.label}:`, e);
    }
  }
  console.log(failed ? `${failed} passo(s) falharam.` : "Schema atualizado.");
  process.exit(failed ? 1 : 0);
}

main();
