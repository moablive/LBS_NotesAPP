/** Nota do NotesAPP, no recorte que o bot precisa para listar. */
export interface NoteSummary {
  id: string;
  title: string;
  icon: string | null;
  isFavorite: boolean;
  isEvergreen: boolean;
  parentId: string | null;
  /** Título da nota-pai (o workspace, quando a nota está dentro de um). */
  parentTitle: string | null;
  updatedAt: string;
}

/**
 * Workspace = nota raiz (`parent_id IS NULL`). Mesmo conceito do botão
 * "Criar Workspace" do site, que cria uma nota sem pai.
 */
export interface WorkspaceSummary {
  id: string;
  title: string;
  icon: string | null;
  /** Quantas notas diretas moram nele. */
  childCount: number;
  updatedAt: string;
}

/** Resultado paginado: o bot mostra os primeiros N e informa o total. */
export interface Paged<T> {
  items: T[];
  total: number;
}
