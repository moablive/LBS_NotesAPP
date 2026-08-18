# AGENTS.md

## Cursor Cloud specific instructions

NotesAPP is a pnpm workspace monorepo (Node >=20.10, pnpm 9): a Vue 3 PWA
(`apps/frontend`), an Express + Drizzle API (`apps/backend`), an optional
Telegram bot (`apps/bot`), and shared libs under `packages/*`. PostgreSQL is
required. Standard commands live in the root `package.json` (`pnpm dev`,
`pnpm build`, `pnpm lint`, `pnpm typecheck`) and each package's `package.json`.

### Services

| Service | Start command | Notes |
| --- | --- | --- |
| Backend API | `pnpm --filter @notesapp/backend dev` | `tsx watch`, port `3000`, health at `/health`. |
| Frontend PWA | `pnpm --filter @notesapp/frontend dev` | Vite, port `5173`, proxies `/api` → `http://localhost:3000`. |
| Telegram bot (optional) | `pnpm --filter notes-bot dev` | Needs a real `TELEGRAM_BOT_TOKEN`; not needed for the web app. |

### Non-obvious setup caveats

1. **PostgreSQL is not in `docker-compose.yml`** (compose expects an external
   `server_db_postgres` container on the external `awl_network`). For local dev a
   local PostgreSQL 16 cluster is used instead. It is installed in the base
   environment but **must be started each boot**:
   `sudo pg_ctlcluster 16 main start`. A `notesapp` database and `notesapp`
   role (password `notesapp`) already exist. DSN:
   `postgres://notesapp:notesapp@localhost:5432/notesapp`.
2. **Env files are gitignored and already present** (recreate if missing):
   `apps/backend/.env` (`DATABASE_URL`, `JWT_SECRET` — must be ≥32 chars,
   `LOGINHUB_APP_ID=11`) and `packages/db/.env` (`DATABASE_URL`). Env is loaded
   via `dotenv` from each package's own cwd.
3. **Do not use `pnpm db:migrate` / `init.sql` to build the schema.** The
   committed Drizzle migrations in `packages/db/drizzle` are stale TodoAPP
   leftovers that don't match the NotesAPP schema (`db:migrate` fails with
   `relation "user_settings" does not exist`), and root `init.sql` is
   incomplete. The source of truth is `packages/db/src/schema.ts`; create/sync
   the schema with `pnpm --filter @notesapp/db exec drizzle-kit push`.
4. **`@loginhub/schema` resolves via a machine-specific tarball path** baked into
   `pnpm-lock.yaml`: `/server/dashboard/packages/schema/loginhub-schema-1.0.0.tgz`.
   The committed tarball `packages/loginhub-schema/loginhub-schema-1.0.0.tgz` is
   copied there by the update script. If `pnpm install` errors with `ENOENT ...
   loginhub-schema-1.0.0.tgz`, re-copy that file to the expected path.
5. **Shared libs `@loginhub/schema` and `@loginhub/api-client` compile to
   `dist/`** (gitignored) and are consumed via built output, so they must be
   built before the frontend/lint can resolve them (the update script does this).
   All `@notesapp/*` packages run straight from TS source (no build needed).
6. **Auth requires a LoginHub-issued JWT.** Protected `/api/*` routes need a
   Bearer HS256 JWT signed with the backend `JWT_SECRET`, payload
   `{ sub, email, app_id }` where `app_id` must equal `LOGINHUB_APP_ID`. The
   `/api/auth/login` proxy and the frontend UI login both call the **external
   LoginHub service**, which is not in this repo and is unavailable in cloud — so
   full UI login can't be exercised here. To test the API / core features, mint a
   JWT locally with the `jsonwebtoken` package and the same `JWT_SECRET`.

### Known pre-existing issues (not environment problems)

- `pnpm lint` fails at `apps/frontend`: its `lint` script calls `eslint` but
  ESLint is not a declared dependency and there is no ESLint config in the repo.
  Lint passes for `@loginhub/schema` and `@loginhub/api-client`.
- `pnpm typecheck` fails at `apps/frontend` (`vue-tsc`) due to existing TS errors
  in `src/components/editor/*` and `src/views/DashboardView.vue`. Backend and db
  typecheck cleanly.
- `pnpm build` succeeds for every package (frontend uses `vite build`/esbuild,
  which does not run the strict `vue-tsc` check).
- `GET /api/notes/links` and `/api/notes/:id/backlinks` read `req.telegramId`
  (never set) instead of the user id, so they return `[]`; graph edges are still
  persisted in the `note_links` table on note create/update.
