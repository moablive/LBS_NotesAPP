<p align="center">
  <img src="https://img.shields.io/badge/✅_NotesAPP-Conhecimento_e_Anotações-5b8cff?style=for-the-badge&labelColor=0b0f17" alt="NotesAPP" />
</p>

<p align="center">
  <strong>PWA moderna de gestão de conhecimento (Híbrido Notion + Obsidian)</strong><br/>
  Editor de Blocos/Markdown · Grafo de Conexões · Zettelkasten · Dark Mode
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-0.1.0-5b8cff?style=flat-square&labelColor=11151f" alt="Version" />
  <img src="https://img.shields.io/badge/node-%3E%3D20.10-22c55e?style=flat-square&logo=nodedotjs&labelColor=11151f" alt="Node" />
  <img src="https://img.shields.io/badge/pnpm-%3E%3D9.0-f69220?style=flat-square&logo=pnpm&labelColor=11151f" alt="pnpm" />
  <img src="https://img.shields.io/badge/license-private-7a8499?style=flat-square&labelColor=11151f" alt="License" />
  <img src="https://img.shields.io/badge/deploy-docker-2496ED?style=flat-square&logo=docker&labelColor=11151f" alt="Docker" />
</p>

---

## 🛠️ Tech Stack

<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=vue,ts,tailwind,vite,pinia,express,nodejs,postgres,docker,nginx,cloudflare&perline=11&theme=dark" alt="Tech Stack" />
  </a>
</p>

---

## ✨ Funcionalidades

### 📝 Editor Híbrido (Notion-like)
Uma experiência de escrita fluida combinando a facilidade de blocos do Notion com o poder do Markdown.
- Suporte a rich text, listas, to-dos e blocos de código.
- Interface minimalista e focada.

### 🕸️ Grafo de Conhecimento (Obsidian-like)
Visualize como suas ideias se conectam através de uma visualização interativa em grafo.
- Links bidirecionais entre notas (estilo `[[Nome da Nota]]`).
- Tags e metadados para organização profunda.
- Zettelkasten facilitado.

### 📂 Árvore de Diretórios
Organize notas em pastas aninhadas infinitas com a mesma facilidade do explorador de arquivos local.

### 🤖 Assistente Telegram
Capture ideias instantaneamente enviando mensagens (texto ou voz transcrita por IA) para o bot do Telegram. Elas são salvas diretamente no seu Inbox do NotesAPP.

---

## 🏗️ Arquitetura (Monorepo)

```text
NotesAPP/
├── apps/
│   ├── bot/                   # Telegram Bot (Captura Rápida)
│   ├── frontend/              # Vue 3 PWA (Interface Principal)
│   └── backend/               # API Express (Drizzle ORM)
├── packages/
│   ├── api-client/            # Cliente HTTP genérico
│   ├── db/                    # PostgreSQL Schemas (notes, folders, tags)
│   ├── models/                # Tipos Zod compartilhados
│   └── services/              # Lógicas de negócio
```

---

## 🚀 Como Iniciar

```bash
# 1. Configurar .env
cp .env.example .env

# 2. Instalar
pnpm install

# 3. DB Migrations
pnpm db:generate
pnpm db:migrate

# 4. Iniciar Dev Server
pnpm dev
```

## 🔥 Hot reload (modo dev)

Em produção o front é build estático servido por nginx e o backend roda o
código compilado — editar arquivo não muda nada até republicar. Para
desenvolver existe o `docker-compose.dev.yml`, que **não** é usado por
`docker compose up -d` sozinho nem pelo `redeploy.sh`:

```bash
pnpm docker:dev     # docker compose -f docker-compose.yml -f docker-compose.dev.yml up
```

Editou no host, o container reage: `tsx watch` reinicia o backend em ~1 s, e o
Vite troca o módulo no navegador sem recarregar a página.

| Serviço | Onde responde em dev |
|---|---|
| Frontend (Vite) | `http://<host>:5183` |
| Backend (direto) | `http://<host>:5083` |

### O que o override troca

- **Estágio da imagem**: em vez da imagem final (nginx / runtime enxuto), sobe o
  estágio `deps`, que tem as dependências instaladas e **não** tem o código — o
  código vem do bind mount.
- **Comando**: `pnpm ... dev` no lugar do `nginx`/`pnpm start`.
- **Volumes**: a raiz do repositório vai para dentro do container, e cada
  `node_modules` ganha um **volume anônimo** que o protege. Sem isso o
  `node_modules` do host cobriria o do container — e o do host foi resolvido
  para outra plataforma, então o Vite morre no boot. **Workspace novo em
  `apps/` ou `packages/` exige linha nova na âncora `x-hot-reload`.**
- **Imagem com nome próprio** (sufixo `-dev`): sem isso o compose reaproveita a
  imagem de produção já tagueada com o mesmo nome, ignora o `target:` e o
  container sobe com o nginx, morrendo em `pnpm: not found`.
- **Proxy `/api`**: em produção quem encaminha é o nginx; em dev ele sai do
  caminho e quem assume é o próprio Vite, via `DEV_API_TARGET`.

### Quando ainda é preciso rebuildar

O hot reload cobre **código**. Mudança em `package.json` (dependências),
`Dockerfile`, `.env` ou no próprio compose exige recriar:

```bash
docker compose ... down -v && docker compose ... up -d --build
```

O `-v` não é opcional: `--build` reconstrói a imagem, mas o **volume anônimo
sobrevive com o `node_modules` antigo** e continua sendo montado por cima.

---

## 🏷️ Versionamento e aviso de nova versão

Toda publicação incrementa a versão e a mostra no app. Serve para duas coisas:
saber de fora qual build está no ar, e avisar quem está com o app aberto que
saiu build novo — quem instala na tela inicial fica semanas sem recarregar de
verdade, rodando código antigo sem saber.

### O fluxo

```
VERSION (0.0.1)                       ← fonte da verdade, versionada no git
   │  node scripts/bump-version.mjs
   ▼
0.0.2 + APP_BUILD_DATE
   │
   └─▶ .env  (APP_VERSION, APP_BUILD_DATE)   ← lido pelo --env-file do deploy
              │
              ├─▶ backend  APP_VERSION       → GET /health
              └─▶ frontend VITE_APP_VERSION  → build-arg, congelado no bundle
                             │
                             ▼
                   useVersionCheck compara os dois
                             │  divergiu?
                             ▼
                   UpdateBanner: "Nova versão disponível"
```

### Comandos

| Comando | Efeito |
|---|---|
| `node scripts/bump-version.mjs` | `0.0.1` → `0.0.2` (patch) |
| `node scripts/bump-version.mjs --minor` | `0.0.9` → `0.1.0` |
| `node scripts/bump-version.mjs --major` | `0.1.4` → `1.0.0` |
| `node scripts/bump-version.mjs --set 2.5.0` | define manualmente |

O `VERSION` é a fonte da verdade e é versionado; o `.env` é espelho gerado —
**não edite `APP_VERSION` à mão.** Depois do bump, republique normalmente
(`redeploy.sh`, que já roda com `--build`): é o rebuild que carrega a versão
nova para dentro do bundle do front.

### Onde aparece

| Onde | O quê |
|---|---|
| `GET /health` | `{ version, buildDate }` — público, é o que o front consulta |
| Canto inferior direito | badge `v0.0.2`; o *tooltip* mostra a data do build |
| Banner, quando diverge | "Nova versão disponível" com **Depois** / **Atualizar agora** |

### Como funciona por dentro

- `apps/frontend/src/composables/useVersionCheck.ts` pergunta ao `/health` a
  cada 5 min (só com a aba visível) e ao voltar o foco para o app — que é o
  momento mais provável de haver deploy esperando. Usa `fetch` puro: o cliente
  HTTP do app derruba a sessão em qualquer 401, e uma checagem de fundo não pode
  ter esse poder.
- **O aviso é uma sugestão, não um reload automático.** Recarregar sozinho
  jogaria fora formulário meio preenchido; quem decide é o usuário.
- O `nginx.conf` do front encaminha `/health` ao backend de propósito. Sem essa
  `location`, o caminho cairia no *SPA fallback* e devolveria o `index.html` —
  JSON esperado, HTML recebido, e o banner nunca apareceria.
- Sem `APP_VERSION` no ambiente (dev local), a checagem se desliga sozinha: sem
  baseline, toda comparação seria falso positivo.

---

## 🐳 Deploy via Docker

```bash
docker compose --env-file .env up -d --build
```

*(Desenvolvido na estrutura padrão Astral Wave Label)*
