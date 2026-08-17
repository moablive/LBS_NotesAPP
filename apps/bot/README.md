# NotesAPP Bot - Astral Wave Label

Bot de Telegram do NotesAPP. **Por enquanto ele só consulta**: lista as suas
notas e os seus workspaces. Captura de nota, voz e lembretes entram depois.

## O que já funciona 🚀

- **📝 Minhas Notas** (`/notas`, `/list`) — notas ativas, mais recentes primeiro,
  com o workspace de cada uma, ⭐ favorita e 🌱 evergreen.
- **🗂️ Meus Workspaces** (`/workspaces`) — as notas raiz (é o que o site chama de
  workspace) e quantas notas moram dentro de cada uma.
- **Autenticação via LoginHub** — o usuário valida e-mail+senha no LoginHub
  (`app_id=11`) e o bot vincula o `telegram_id` à conta em `user_settings`.
  Quem ainda não vinculou cai no `LOGIN_WIZARD` automaticamente.

## Como os dados são lidos 🔎

O bot fala **direto no Postgres** (`pg`), sem passar pelo backend HTTP.

Um detalhe que importa: o dono de uma nota é o `telegram_id` quando a conta está
vinculada e o `loginhub_id` enquanto não está (ver
`apps/backend/src/middleware/telegram-id.ts`), e o vínculo **não migra** as notas
antigas. Por isso a listagem consulta **as duas chaves** — senão quem começou
pelo site não veria nada no bot.

Workspace não é tabela: é nota com `parent_id IS NULL`, igual ao botão "Criar
Workspace" do site. Notas na lixeira (`deleted_at`) ficam fora das listas.

## Tecnologias 🛠️

TypeScript / Node.js · PostgreSQL (`pg`) · Telegraf · Zod

## Como Executar 🐳

O bot sobe pelo compose da **raiz** do NotesAPP como `app_notesapp_bot` — não
existe compose próprio aqui (havia um, copiado do TodoAPP, que declarava
`bot_todo_bot` e duplicava o nome de container do outro app).

```bash
# na raiz do NotesAPP
docker compose --env-file ../shared.env --env-file .env up -d --build app_notesapp_bot
```

Variáveis: veja `.env.example`. Em produção o `DATABASE_URL` é montado pelo
compose da raiz a partir do `DB_DSN` (`../shared.env`) + `DB_NAME` (`.env`).
