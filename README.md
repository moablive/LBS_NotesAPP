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

## 🐳 Deploy via Docker

```bash
docker compose --env-file .env up -d --build
```

*(Desenvolvido na estrutura padrão Astral Wave Label)*
