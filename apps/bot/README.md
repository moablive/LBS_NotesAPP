# NotesAPP Bot - Astral Wave Label

Um bot de Telegram assistente para captura rápida de anotações (Inbox) e pesquisa na sua base de conhecimento (Zettelkasten), integrado ao NotesAPP.

## Funcionalidades Principais 🚀

- **Captura Rápida (Inbox):** Envie mensagens de texto e elas viram notas na sua Inbox do NotesAPP instantaneamente.
- **Transcrição de Voz (Groq):** Envie áudios para o bot. Ele transcreve a sua voz usando o modelo Whisper-Large-V3 (via Groq API) e salva a ideia para você.
- **Inteligência Local (Ollama):** Classificação inteligente e estruturação das anotações antes de salvá-las no banco.
- **Autenticação Segura:** Usuários validam acesso via LoginHub para vincular sua conta do Telegram de forma segura.

## Tecnologias Utilizadas 🛠️

- **Linguagem:** TypeScript / Node.js
- **Banco de Dados:** PostgreSQL (`pg`)
- **Framework Bot:** Telegraf
- **Transcrição STT:** GroqCloud API (Whisper)
- **Motor de Inteligência LLM:** Ollama Local API
- **Validação e Tipagem:** Zod

## Como Executar 🐳

```bash
# O bot sobe junto com o restante do monorepo no docker-compose da raiz
docker compose up -d --build
```
