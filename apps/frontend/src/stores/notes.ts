import { defineStore } from 'pinia';
import { api } from '@/api/client';
import type { NoteDto, FolderDto, UpdateNoteDto } from '@notesapp/models';

export const useNotesStore = defineStore('notes', {
  state: () => ({
    notes: [] as NoteDto[],
    trash: [] as NoteDto[],
    folders: [] as FolderDto[],
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
    async fetchAll() {
      this.isLoading = true;
      try {
        const [notes, folders] = await Promise.all([
          api.get<NoteDto[]>('/notes'),
          api.get<FolderDto[]>('/folders'),
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
    ) {
      const note = await api.post<NoteDto>('/notes', { title, folderId, parentId, content: '' });
      this.notes.unshift(note);
      this.activeNoteId = note.id;
      return note;
    },
    async updateNoteFields(noteId: string, data: UpdateNoteDto) {
      const updated = await api.patch<NoteDto>(`/notes/${noteId}`, data);
      const idx = this.notes.findIndex(n => n.id === noteId);
      if (idx !== -1) this.notes[idx] = updated;
      return updated;
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
      this.trash = await api.get<NoteDto[]>('/notes/trash');
    },
    // Mover para a lixeira (soft delete). A sub-árvore vai junto no backend;
    // espelhamos removendo-a das notas ativas em memória.
    async deleteNote(noteId: string) {
      const toRemove = new Set<string>([noteId, ...this.descendantIds(noteId)]);
      await api.delete(`/notes/${noteId}`);
      this.notes = this.notes.filter(n => !toRemove.has(n.id));
      if (this.activeNoteId && toRemove.has(this.activeNoteId)) {
        this.activeNoteId = null;
      }
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
      await api.post('/notes/trash/empty', {});
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
      await this.updateNoteFields(noteId, { parentId: newParentId, order });
      if (newParentId) this.expand(newParentId);
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
