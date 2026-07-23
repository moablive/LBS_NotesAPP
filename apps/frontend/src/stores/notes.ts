import { defineStore } from 'pinia';
import { api } from '@/api/client';
import type { NoteDto, FolderDto, UpdateNoteDto } from '@notesapp/models';

export const useNotesStore = defineStore('notes', {
  state: () => ({
    notes: [] as NoteDto[],
    folders: [] as FolderDto[],
    isLoading: false,
    selectedFolderId: null as string | null,
    searchQuery: '',
    activeNoteId: null as string | null,
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
    async addNote(title: string, folderId: string | null = null, parentId: string | null = null) {
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
    async deleteNote(noteId: string) {
      await api.delete(`/notes/${noteId}`);
      this.notes = this.notes.filter(n => n.id !== noteId);
      if (this.activeNoteId === noteId) {
        this.activeNoteId = null;
      }
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
