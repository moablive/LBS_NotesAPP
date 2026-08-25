import pg from 'pg';
import type { NoteSummary, Paged, WorkspaceSummary } from '../models/index.js';

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

/**
 * Chaves de dono a consultar para um telegramId.
 *
 * O backend resolve o dono da nota como `user_settings.telegram_id` quando o
 * Telegram está vinculado, e como o `loginhub_id` enquanto não está
 * (ver middleware/telegram-id.ts). Como o vínculo NÃO migra as notas antigas,
 * quem já usava o site antes de vincular tem notas gravadas sob o loginhub_id
 * e notas novas sob o telegramId. Consultar as duas chaves é o que faz a
 * listagem mostrar tudo que é do usuário.
 */
async function ownerKeys(telegramId: string): Promise<string[]> {
  const result = await pool.query(
    'SELECT loginhub_id FROM user_settings WHERE telegram_id = $1 LIMIT 1',
    [telegramId]
  );
  const loginhubId = result.rows[0]?.loginhub_id;
  return loginhubId == null ? [] : [String(loginhubId)];
}

export const botApi = {
  /**
   * Troca o passe do deep link pelo vinculo `telegram_id -> loginhub_id`.
   *
   * Unica chamada HTTP deste cliente — o resto fala direto com o Postgres. E de
   * proposito: a regra do passe (hash guardado em vez do passe, validade, uso
   * unico com a corrida resolvida no proprio UPDATE) mora no backend, dono do
   * schema. Reimplementar aqui daria duas copias de uma verificacao de
   * seguranca, livres para divergir.
   */
  consumirPasseDeVinculo: async (token: string, telegramId: string): Promise<{ loginhubId: number }> => {
    const res = await fetch(`${process.env.BACKEND_API_URL ?? 'http://notesapp_backend:3000/api'}/bot/consume-link-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.BOT_SERVICE_KEY ?? '',
      },
      body: JSON.stringify({ token, telegramId }),
    });
    if (!res.ok) {
      const corpo = await res.json().catch(() => ({}));
      throw new Error((corpo as { message?: string }).message ?? `HTTP ${res.status}`);
    }
    return (await res.json()) as { loginhubId: number };
  },

  /** Usuário já vinculou o Telegram? (login via bot, padrão MoneyAPP) */
  getUserByTelegramId: async (telegramId: string): Promise<{ loginhubId: number } | null> => {
    const result = await pool.query(
      'SELECT loginhub_id FROM user_settings WHERE telegram_id = $1 LIMIT 1',
      [telegramId]
    );
    const row = result.rows[0];
    return row ? { loginhubId: row.loginhub_id } : null;
  },

  /**
   * Vincula o telegramId ao usuário do LoginHub.
   * ⚠️ NÃO migrar tasks/task_groups/reminder_settings aqui: essas tabelas são do
   * TodoAPP e NÃO existem no banco notesapp — o UPDATE dava 42P01, ROLLBACK e o
   * login inteiro falhava.
   */
  linkTelegram: async (loginhubId: number, telegramId: string): Promise<void> => {
    await pool.query(
      `INSERT INTO user_settings (loginhub_id, telegram_id) VALUES ($1, $2)
       ON CONFLICT (loginhub_id) DO UPDATE SET telegram_id = EXCLUDED.telegram_id`,
      [loginhubId, telegramId]
    );
  },

  /**
   * Workspaces = linhas da tabela `workspaces` (ambientes de trabalho do site),
   * com a contagem de notas ativas dentro de cada um. Antes daqui saíam as notas
   * raiz, que era o que fazia papel de workspace antes da tabela existir.
   */
  listWorkspaces: async (telegramId: string, limit = 30): Promise<Paged<WorkspaceSummary>> => {
    const keys = await ownerKeys(telegramId);
    const result = await pool.query(
      `SELECT w.id,
              w.name AS title,
              w.icon,
              COALESCE(
                (SELECT max(n.updated_at) FROM notes n
                  WHERE n.workspace_id = w.id AND n.deleted_at IS NULL),
                w.created_at
              ) AS updated_at,
              (SELECT count(*) FROM notes n
                WHERE n.workspace_id = w.id AND n.deleted_at IS NULL) AS child_count,
              count(*) OVER () AS total
         FROM workspaces w
        WHERE w.user_id = ANY($1)
        ORDER BY w."order" ASC, w.created_at ASC
        LIMIT $2`,
      [keys, limit]
    );

    return {
      total: Number(result.rows[0]?.total ?? 0),
      items: result.rows.map((row) => ({
        id: row.id,
        title: row.title,
        icon: row.icon ?? null,
        childCount: Number(row.child_count ?? 0),
        updatedAt: row.updated_at.toISOString(),
      })),
    };
  },

  /** Notas ativas (fora da lixeira), mais recentes primeiro. */
  listNotes: async (telegramId: string, limit = 20): Promise<Paged<NoteSummary>> => {
    const keys = await ownerKeys(telegramId);
    const result = await pool.query(
      `SELECT n.id,
              n.title,
              n.icon,
              n.is_favorite,
              n.is_evergreen,
              n.parent_id,
              n.updated_at,
              p.title AS parent_title,
              count(*) OVER () AS total
         FROM notes n
         LEFT JOIN notes p ON p.id = n.parent_id
        WHERE n.user_id = ANY($1)
          AND n.deleted_at IS NULL
        ORDER BY n.updated_at DESC
        LIMIT $2`,
      [keys, limit]
    );

    return {
      total: Number(result.rows[0]?.total ?? 0),
      items: result.rows.map((row) => ({
        id: row.id,
        title: row.title,
        icon: row.icon ?? null,
        isFavorite: row.is_favorite,
        isEvergreen: row.is_evergreen,
        parentId: row.parent_id ?? null,
        parentTitle: row.parent_title ?? null,
        updatedAt: row.updated_at.toISOString(),
      })),
    };
  },
};
