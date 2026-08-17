import { defineStore } from 'pinia';
import { api } from '@/api/client';
import type { NoteDto, FolderDto, UpdateNoteDto, WorkspaceDto } from '@notesapp/models';
import {
  contentHasSubPage,
  stripSubPageBlock,
  subPageBlockHtml,
} from '@/components/editor/subPageHtml';

const ACTIVE_WORKSPACE_KEY = 'notes_active_workspace';

export const useNotesStore = defineStore('notes', {
  state: () => ({
    notes: [] as NoteDto[],
    trash: [] as NoteDto[],
    folders: [] as FolderDto[],
    // Workspaces (ambientes de trabalho): cada um tem sua própria árvore. O
    // ativo fica no localStorage para o app reabrir onde o usuário parou.
    workspaces: [] as WorkspaceDto[],
    activeWorkspaceId: localStorage.getItem(ACTIVE_WORKSPACE_KEY) as string | null,
    isLoading: false,
    selectedFolderId: null as string | null,
    searchQuery: '',
    activeNoteId: null as string | null,
    // Notas expandidas na árvore lateral (id -> aberto?).
    expandedIds: {} as Record<string, boolean>,
    // Nota sendo arrastada (drag-and-drop na árvore).
    draggingId: null as string | null,
    // Graph links and backlinks state
    graphEdges: [] as { sourceNoteId: string, targetNoteId: string }[],
    backlinks: [] as NoteDto[],
    isGraphVisible: false,
  }),
  actions: {
    /**
     * Carrega os workspaces do usuário e garante um ativo válido. O backend
     * cria um "Pessoal" na primeira visita, então a lista nunca volta vazia.
     */
    async fetchWorkspaces() {
      this.workspaces = await api.get<WorkspaceDto[]>('/workspaces');
      const stillExists = this.workspaces.some(w => w.id === this.activeWorkspaceId);
      if (!stillExists) {
        this.activeWorkspaceId = this.workspaces[0]?.id ?? null;
        this.persistActiveWorkspace();
      }
      return this.workspaces;
    },
    persistActiveWorkspace() {
      if (this.activeWorkspaceId) {
        localStorage.setItem(ACTIVE_WORKSPACE_KEY, this.activeWorkspaceId);
      } else {
        localStorage.removeItem(ACTIVE_WORKSPACE_KEY);
      }
    },
    /** Troca de workspace: fecha a nota aberta e recarrega a árvore do novo. */
    async setActiveWorkspace(workspaceId: string) {
      if (this.activeWorkspaceId === workspaceId) return;
      this.activeWorkspaceId = workspaceId;
      this.persistActiveWorkspace();
      this.activeNoteId = null;
      this.expandedIds = {};
      this.searchQuery = '';
      await Promise.all([this.fetchAll(), this.fetchTrash()]);
    },
    async addWorkspace(name: string, icon: string | null = null) {
      const workspace = await api.post<WorkspaceDto>('/workspaces', { name, icon });
      this.workspaces.push(workspace);
      await this.setActiveWorkspace(workspace.id);
      return workspace;
    },
    async updateWorkspace(workspaceId: string, data: { name?: string; icon?: string | null }) {
      const updated = await api.patch<WorkspaceDto>(`/workspaces/${workspaceId}`, data);
      const idx = this.workspaces.findIndex(w => w.id === workspaceId);
      if (idx !== -1) this.workspaces[idx] = updated;
      return updated;
    },
    /** Apaga o workspace e as notas dele (cascade no banco). */
    async deleteWorkspace(workspaceId: string) {
      await api.delete(`/workspaces/${workspaceId}`);
      this.workspaces = this.workspaces.filter(w => w.id !== workspaceId);
      if (this.activeWorkspaceId === workspaceId) {
        this.activeWorkspaceId = null;
        const next = this.workspaces[0]?.id;
        if (next) {
          await this.setActiveWorkspace(next);
        } else {
          this.persistActiveWorkspace();
          this.notes = [];
        }
      }
    },
    /** Query string do workspace ativo (o backend filtra por ela). */
    workspaceQuery(): string {
      return this.activeWorkspaceId ? `?workspaceId=${encodeURIComponent(this.activeWorkspaceId)}` : '';
    },
    async fetchAll() {
      this.isLoading = true;
      try {
        const scope = this.workspaceQuery();
        const [notes, folders] = await Promise.all([
          api.get<NoteDto[]>(`/notes${scope}`),
          api.get<FolderDto[]>(`/folders${scope}`),
        ]);
        this.notes = notes;
        this.folders = folders;
      } finally {
        this.isLoading = false;
      }
    },
    async addNote(
      title: string,
      folderId: string | null = null,
      parentId: string | null = null,
      // activate=false mantém a nota atual aberta — necessário quando ainda
      // precisamos escrever no editor do PAI depois de criar a filha.
      activate = true,
    ) {
      const note = await api.post<NoteDto>('/notes', {
        title,
        folderId,
        parentId,
        workspaceId: this.activeWorkspaceId,
        content: '',
      });
      this.notes.unshift(note);
      if (activate) this.activeNoteId = note.id;
      return note;
    },
    async updateNoteFields(noteId: string, data: UpdateNoteDto) {
      const updated = await api.patch<NoteDto>(`/notes/${noteId}`, data);
      const idx = this.notes.findIndex(n => n.id === noteId);
      if (idx !== -1) this.notes[idx] = updated;
      return updated;
    },
    /**
     * Payload de escrita de uma nota. Leva título e conteúdo juntos porque os
     * dois ficam só em memória (v-model) até o blur — gravar um sem o outro
     * descartaria o que o usuário acabou de digitar.
     *
     * Título vazio é omitido: o backend valida min(1) e rejeitaria o request
     * inteiro, levando o conteúdo com ele.
     */
    noteWritePayload(note: NoteDto, content?: string): UpdateNoteDto {
      const payload: UpdateNoteDto = { content: content ?? note.content ?? '' };
      if ((note.title || '').trim()) payload.title = note.title;
      return payload;
    },
    /** Persiste título + conteúdo que o editor mantém em memória. */
    async saveNote(noteId: string) {
      const note = this.notes.find(n => n.id === noteId);
      if (!note) return;
      await this.updateNoteFields(noteId, this.noteWritePayload(note));
    },
    /**
     * Grava o bloco da filha no fim do conteúdo do pai. É isto que faz a página
     * aparecer DENTRO da outra (estilo Notion) e não só aninhada na árvore.
     */
    async linkSubPage(parentId: string, childId: string, childTitle?: string | null) {
      const parent = this.notes.find(n => n.id === parentId);
      if (!parent || contentHasSubPage(parent.content, childId)) return;
      const content = (parent.content || '') + subPageBlockHtml(childId, childTitle);
      await this.updateNoteFields(parentId, this.noteWritePayload(parent, content));
    },
    /**
     * Acrescenta um bloco (HTML já serializado pelo editor) ao fim de outra
     * página. É o destino do arrasto de um bloco para a árvore lateral: quem
     * chama apaga o original da nota de origem.
     */
    async appendBlockToNote(noteId: string, html: string) {
      const note = this.notes.find(n => n.id === noteId);
      if (!note || !html) return;
      await this.updateNoteFields(noteId, this.noteWritePayload(note, (note.content || '') + html));
    },
    /** Tira o bloco da filha do conteúdo do pai (nota movida ou excluída). */
    async unlinkSubPage(parentId: string, childId: string) {
      const parent = this.notes.find(n => n.id === parentId);
      if (!parent || !contentHasSubPage(parent.content, childId)) return;
      const content = stripSubPageBlock(parent.content || '', childId);
      await this.updateNoteFields(parentId, this.noteWritePayload(parent, content));
    },
    /**
     * Cria uma sub-página já vinculada no corpo do pai. Usado pelos botões "+"
     * (árvore e header), que antes só definiam o parentId — a filha nascia
     * invisível dentro do pai.
     *
     * Não ativa a filha: quem chama decide, porque o vínculo precisa ser gravado
     * enquanto o pai ainda é a nota aberta.
     */
    async createSubPage(parentId: string, title = 'Sem título') {
      const child = await this.addNote(title, null, parentId, false);
      await this.linkSubPage(parentId, child.id, child.title);
      this.expand(parentId);
      return child;
    },
    /** Ids de todas as descendentes (filhas, netas, …) de uma nota. */
    descendantIds(noteId: string): string[] {
      const acc: string[] = [];
      const walk = (pid: string) => {
        for (const n of this.notes) {
          if (n.parentId === pid) {
            acc.push(n.id);
            walk(n.id);
          }
        }
      };
      walk(noteId);
      return acc;
    },
    async fetchTrash() {
      this.trash = await api.get<NoteDto[]>(`/notes/trash${this.workspaceQuery()}`);
    },
    // Mover para a lixeira (soft delete). A sub-árvore vai junto no backend;
    // espelhamos removendo-a das notas ativas em memória.
    async deleteNote(noteId: string) {
      const parentId = this.notes.find(n => n.id === noteId)?.parentId ?? null;
      const toRemove = new Set<string>([noteId, ...this.descendantIds(noteId)]);
      await api.delete(`/notes/${noteId}`);
      this.notes = this.notes.filter(n => !toRemove.has(n.id));
      if (this.activeNoteId && toRemove.has(this.activeNoteId)) {
        this.activeNoteId = null;
      }
      // Sem isto o pai ficaria com um bloco apontando para nota inexistente.
      if (parentId) await this.unlinkSubPage(parentId, noteId);
      await this.fetchTrash();
    },
    // Restaurar da lixeira (a sub-árvore volta; o pai pode ser normalizado
    // para raiz no backend). Recarrega ativos + lixeira para refletir tudo.
    async restoreNote(noteId: string) {
      await api.post(`/notes/${noteId}/restore`, {});
      await Promise.all([this.fetchAll(), this.fetchTrash()]);
    },
    // Apagar definitivamente uma nota da lixeira (remove a linha; cascata na FK).
    async permanentDelete(noteId: string) {
      await api.delete(`/notes/${noteId}/permanent`);
      await this.fetchTrash();
    },
    async emptyTrash() {
      await api.post(`/notes/trash/empty${this.workspaceQuery()}`, {});
      this.trash = [];
    },
    async fetchLinks() {
      try {
        this.graphEdges = await api.get<{ sourceNoteId: string, targetNoteId: string }[]>('/notes/links');
      } catch (err) {
        console.error('Failed to fetch graph links', err);
      }
    },
    async fetchBacklinks(noteId: string) {
      try {
        this.backlinks = await api.get<NoteDto[]>(`/notes/${noteId}/backlinks`);
      } catch (err) {
        console.error('Failed to fetch backlinks', err);
      }
    },
    toggleGraphVisible() {
      this.isGraphVisible = !this.isGraphVisible;
    },
    /** Move uma nota para um novo pai (null = raiz), no fim das irmãs. */
    async moveNote(noteId: string, newParentId: string | null) {
      if (noteId === newParentId) return;
      const note = this.notes.find(n => n.id === noteId);
      if (!note) return;
      if (note.parentId === newParentId) return; // nada mudou
      // Guarda de ciclo: o novo pai não pode ser a própria nota nem uma descendente.
      if (newParentId) {
        const desc = new Set(this.descendantIds(noteId));
        if (desc.has(newParentId)) return;
      }
      const order = this.notes.filter(
        n => n.parentId === newParentId && n.id !== noteId,
      ).length;
      const oldParentId = note.parentId ?? null;
      const title = note.title;
      await this.updateNoteFields(noteId, { parentId: newParentId, order });
      // O bloco segue a nota: sai do corpo do pai antigo e entra no do novo.
      if (oldParentId) await this.unlinkSubPage(oldParentId, noteId);
      if (newParentId) {
        await this.linkSubPage(newParentId, noteId, title);
        this.expand(newParentId);
      }
    },
    async toggleFavorite(noteId: string) {
      const note = this.notes.find(n => n.id === noteId);
      if (!note) return;
      await this.updateNoteFields(noteId, { isFavorite: !(note as any).isFavorite });
    },
    toggleExpanded(noteId: string) {
      this.expandedIds[noteId] = !this.expandedIds[noteId];
    },
    expand(noteId: string) {
      this.expandedIds[noteId] = true;
    },
    setDragging(noteId: string | null) {
      this.draggingId = noteId;
    },
    async addFolder(name: string, parentId: string | null = null, icon: string | null = null) {
      const folder = await api.post<FolderDto>('/folders', { name, parentId, icon });
      this.folders.push(folder);
      return folder;
    },
    async updateFolder(folderId: string, data: { name?: string, icon?: string, parentId?: string | null }) {
      const updated = await api.patch<FolderDto>(`/folders/${folderId}`, data);
      const idx = this.folders.findIndex(f => f.id === folderId);
      if (idx !== -1) {
        this.folders[idx] = updated;
      }
      return updated;
    },
    async deleteFolder(folderId: string) {
      await api.delete(`/folders/${folderId}`);
      this.folders = this.folders.filter(f => f.id !== folderId);
      if (this.selectedFolderId === folderId) {
        this.selectedFolderId = null;
      }
    },
    setFolderFilter(folderId: string | null) {
      this.selectedFolderId = folderId;
    },
    setSearchQuery(query: string) {
      this.searchQuery = query;
    },
    setActiveNote(noteId: string | null) {
      this.activeNoteId = noteId;
      if (noteId) {
        this.fetchBacklinks(noteId);
      } else {
        this.backlinks = [];
      }
    },
    async reorderFolders(newFolders: FolderDto[]) {
      const originalFolders = [...this.folders];
      this.folders = newFolders;
      try {
        await api.post('/folders/reorder', { folderIds: newFolders.map(f => f.id) });
      } catch (err) {
        this.folders = originalFolders;
        console.error(err);
      }
    },
  },
  getters: {
    // Filhas diretas de um pai (null = raízes da árvore), ordenadas.
    childrenOf(state) {
      return (parentId: string | null): NoteDto[] =>
        state.notes
          .filter(n => (n.parentId ?? null) === parentId)
          .sort((a, b) => {
            const ao = (a as any).order ?? 0;
            const bo = (b as any).order ?? 0;
            if (ao !== bo) return ao - bo;
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          });
    },
    // Notas raiz (parentId nulo).
    treeRoots(): NoteDto[] {
      return this.childrenOf(null);
    },
    // Notas marcadas como favoritas (para a seção Favorites, estilo Notion).
    favorites(state): NoteDto[] {
      return state.notes
        .filter(n => (n as any).isFavorite)
        .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    },
    // Busca plana (usada na sidebar quando há termo de pesquisa).
    searchMatches(state): NoteDto[] {
      const query = state.searchQuery.trim().toLowerCase();
      if (!query) return [];
      return state.notes.filter(n =>
        n.title.toLowerCase().includes(query) ||
        (n.content && n.content.toLowerCase().includes(query)),
      );
    },
    filteredNotes(state) {
      if (state.searchQuery.trim()) {
        const query = state.searchQuery.toLowerCase();
        return state.notes.filter(n =>
          n.title.toLowerCase().includes(query) ||
          (n.content && n.content.toLowerCase().includes(query))
        );
      }
      return state.notes.filter(n => n.folderId === state.selectedFolderId).sort((a, b) => {
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      });
    },
    activeNote(state) {
      if (!state.activeNoteId) return null;
      return state.notes.find(n => n.id === state.activeNoteId) || null;
    }
  }
});
