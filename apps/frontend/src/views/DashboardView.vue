<template>
  <div class="min-h-screen bg-[var(--bg)] text-[var(--text)] flex h-screen overflow-hidden font-sans">
    <!-- Backdrop (mobile) -->
    <div
      v-if="isSidebarOpen"
      class="fixed inset-0 bg-black/60 z-40 md:hidden"
      @click="isSidebarOpen = false"
    ></div>

    <!-- Sidebar (Folder Tree) -->
    <aside
      class="bg-[var(--bg-side)] flex flex-col border-r border-black/30 max-md:fixed max-md:inset-y-0 max-md:left-0 max-md:z-50 max-md:w-[290px] max-md:shadow-2xl max-md:transition-transform max-md:duration-200 transition-[width] duration-300 relative shrink-0"
      :class="[
        isSidebarOpen ? 'max-md:translate-x-0' : 'max-md:-translate-x-full',
        isSidebarMinimized ? 'w-[72px] items-center' : ''
      ]"
      :style="!isSidebarMinimized ? `width: ${sidebarWidth}px` : ''"
    >
      <!-- Resizer -->
      <div 
         v-if="!isSidebarMinimized"
         class="absolute right-0 top-0 bottom-0 w-1.5 -mr-[0.75px] hover:bg-[var(--accent)] cursor-col-resize z-10 transition-colors"
         @mousedown.prevent="startSidebarResize"
      ></div>
      <div class="p-4 flex-1 overflow-y-auto custom-scrollbar" :class="isSidebarMinimized ? 'px-2' : ''">
        <!-- Logo / User profile area -->
        <div class="mb-6 flex items-center justify-between" :class="isSidebarMinimized ? 'justify-center' : ''">
          <div class="flex items-center gap-3">
             <div class="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center shrink-0">
               <img src="/logo/icon-192.png" alt="NotesAPP Logo" class="w-full h-full object-cover" />
             </div>
             <span v-if="!isSidebarMinimized" class="font-semibold tracking-tight text-[15px]">NotesAPP</span>
          </div>
        </div>

        <div class="mb-4">
          <div class="relative">
            <MagnifyingGlassIcon class="w-4 h-4 text-[var(--muted)] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              v-model="notesStore.searchQuery"
              type="text"
              placeholder="Search notes..."
              class="w-full bg-[var(--bg-hover)] border border-transparent rounded-lg py-1.5 pl-9 pr-3 text-[13px] outline-none text-[var(--text)] placeholder-[var(--muted)] focus:border-[var(--accent)]"
              :class="isSidebarMinimized ? 'opacity-0 cursor-default' : ''"
            />
          </div>
        </div>

        <!-- Folders and Notes -->
        <div :class="isSidebarMinimized ? 'flex flex-col items-center w-full' : ''">
          <h3 v-if="!isSidebarMinimized" class="text-[11px] font-bold text-[var(--muted)] mb-2 px-2 uppercase tracking-wide">Workspace</h3>
          
          <div class="space-y-[2px]" :class="isSidebarMinimized ? 'flex flex-col items-center w-full' : ''">
            <!-- All Notes Option -->
             <div 
              @click="notesStore.setFolderFilter(null)"
              class="flex items-center py-1.5 rounded-lg cursor-pointer transition-all duration-150 justify-between px-3"
              :class="notesStore.selectedFolderId === null ? 'bg-[var(--bg-hover)] text-white' : 'hover:bg-[var(--bg-hover)] text-[var(--text)]'"
            >
              <div class="flex items-center gap-2">
                <DocumentTextIcon class="w-4 h-4 text-[var(--muted)]" />
                <span v-if="!isSidebarMinimized" class="text-[13px] font-medium">All Notes</span>
              </div>
            </div>

            <!-- Custom Folders -->
            <div 
              v-for="folder in notesStore.folders" 
              :key="folder.id" 
              @click="notesStore.setFolderFilter(folder.id)"
              class="group flex items-center py-1.5 rounded-lg cursor-pointer transition-all duration-150 justify-between px-3"
              :class="notesStore.selectedFolderId === folder.id ? 'bg-[var(--bg-hover)] text-white' : 'hover:bg-[var(--bg-hover)] text-[var(--text)]'"
            >
              <div class="flex items-center gap-2 w-full min-w-0">
                <FolderIcon class="w-4 h-4 text-[var(--muted)] shrink-0" />
                <span v-if="!isSidebarMinimized" class="text-[13px] font-medium truncate">{{ folder.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Toolbar -->
      <div class="p-3 border-t border-black/30 flex flex-col gap-2">
        <button class="flex items-center justify-center gap-2 bg-[var(--bg-hover)] text-[var(--text)] hover:bg-white hover:text-black transition-colors rounded-lg py-1.5 text-[13px] font-medium w-full" @click="createNote">
          <PlusIcon class="w-4 h-4 shrink-0" /> <span v-if="!isSidebarMinimized">New Note</span>
        </button>
        <div class="flex items-center mt-2" :class="isSidebarMinimized ? 'flex-col justify-center gap-4' : 'justify-between'">
          <button class="text-[var(--muted)] hover:text-[var(--text)] transition-colors p-1" @click="toggleSidebar">
            <Bars3BottomLeftIcon class="w-5 h-5" />
          </button>
          <button class="text-[var(--muted)] hover:text-[#ff3b30] transition-colors p-1" @click="logout" title="Logout">
            <ArrowRightOnRectangleIcon class="w-5 h-5" />
          </button>
        </div>
      </div>
    </aside>

    <!-- Main Content (Editor / List) -->
    <main class="flex-1 min-w-0 overflow-hidden flex flex-col bg-[var(--bg)]">
      <!-- Hamburger (mobile) -->
      <div class="md:hidden flex items-center p-4 border-b border-[var(--border-soft)]">
        <button
          @click="isSidebarOpen = true"
          class="p-2 -ml-2 rounded-lg hover:bg-[var(--bg-hover)] text-[var(--text)]"
        >
          <Bars3Icon class="w-5 h-5" />
        </button>
        <h1 class="text-lg font-bold ml-2">NotesAPP</h1>
      </div>

      <div class="flex-1 flex overflow-hidden">
        <!-- Notes List -->
        <div 
          class="border-r border-[var(--border-soft)] flex flex-col overflow-y-auto custom-scrollbar bg-[var(--bg-card)] max-md:hidden relative shrink-0" 
          v-if="!notesStore.activeNoteId || showListOnMobile"
          :style="`width: ${notesListWidth}px`"
        >
          <!-- Resizer -->
          <div 
             class="absolute right-0 top-0 bottom-0 w-1.5 -mr-[0.75px] hover:bg-[var(--accent)] cursor-col-resize z-10 transition-colors"
             @mousedown.prevent="startListResize"
          ></div>
          <div class="p-4 border-b border-[var(--border-soft)]">
             <h2 class="text-[15px] font-bold text-[var(--text)] truncate">{{ currentFolderName }}</h2>
             <p class="text-[12px] text-[var(--muted)]">{{ notesStore.filteredNotes.length }} notes</p>
          </div>
          <div 
            v-for="note in notesStore.filteredNotes" 
            :key="note.id"
            tabindex="0"
            @click="notesStore.setActiveNote(note.id)"
            @keydown.delete.stop="deleteNoteById(note.id)"
            class="p-4 border-b border-[var(--border-soft)] cursor-pointer hover:bg-[var(--bg-hover)] transition-colors relative focus:outline-none focus-visible:bg-[var(--bg-hover)]"
            :class="notesStore.activeNoteId === note.id ? 'bg-[var(--bg-hover)] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-[var(--accent)]' : ''"
          >
             <h4 class="text-[14px] font-semibold text-[var(--text)] truncate mb-1 flex items-center gap-2">
                <span v-if="note.icon" class="w-4 h-4 rounded-sm overflow-hidden flex-shrink-0 inline-flex items-center justify-center bg-[var(--bg-hover)]">
                  <img v-if="note.icon.startsWith('http') || note.icon.startsWith('data:')" :src="note.icon" class="w-full h-full object-cover" />
                  <span v-else class="text-[12px]">{{ note.icon }}</span>
                </span>
                {{ note.title || 'Untitled Note' }}
             </h4>
             <p class="text-[12px] text-[var(--muted)] line-clamp-2">{{ stripHtml(note.content) || 'No additional text' }}</p>
             <div class="text-[10px] text-[var(--muted2)] mt-2 flex justify-between">
                <span>{{ formatDate(note.updatedAt) }}</span>
                <span v-if="note.parentId" class="bg-[var(--bg-hover)] px-1.5 py-0.5 rounded-sm">Sub-nota</span>
             </div>
          </div>
          <div v-if="notesStore.filteredNotes.length === 0" class="p-8 text-center text-[var(--muted)] text-[13px]">
            No notes here.
          </div>
        </div>

        <!-- Editor Area -->
        <div class="flex-1 flex flex-col min-w-0 bg-[var(--bg)]" v-if="notesStore.activeNote">
           <div class="h-12 border-b border-[var(--border-soft)] flex items-center justify-between px-4 shrink-0">
              <button class="md:hidden text-[var(--accent)] text-[14px] font-medium" @click="notesStore.setActiveNote(null)">
                 &larr; Back
              </button>
              <div class="flex items-center gap-2 ml-auto">
                 <button class="text-[var(--muted)] hover:text-[#ff3b30] p-1.5 transition-colors" @click="deleteActiveNote" title="Delete Note">
                    <TrashIcon class="w-4 h-4" />
                 </button>
              </div>
           </div>
           
           <div class="flex-1 overflow-y-auto custom-scrollbar">
             <!-- Cover Image -->
             <div class="relative w-full h-48 bg-[var(--bg-hover)] group flex items-center justify-center transition-all" v-if="notesStore.activeNote.coverImage || isHoveringCover" @mouseenter="isHoveringCover = true" @mouseleave="isHoveringCover = false">
               <img v-if="notesStore.activeNote.coverImage" :src="notesStore.activeNote.coverImage" class="w-full h-full object-cover" />
               <div v-else class="text-[var(--muted)] text-sm flex flex-col items-center gap-2">
                  <PhotoIcon class="w-8 h-8 opacity-50" />
                  <span>No cover</span>
               </div>
               
               <div class="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button @click="promptImage('cover')" class="bg-black/50 hover:bg-black/70 text-white text-xs px-3 py-1.5 rounded backdrop-blur-md transition-colors flex items-center gap-2">
                     <PhotoIcon class="w-4 h-4" />
                     Change Cover
                  </button>
                  <button v-if="notesStore.activeNote.coverImage" @click="removeImage('cover')" class="bg-black/50 hover:bg-black/70 text-white text-xs px-3 py-1.5 rounded backdrop-blur-md transition-colors flex items-center gap-2">
                     <TrashIcon class="w-4 h-4" />
                  </button>
               </div>
             </div>

             <div class="max-w-3xl mx-auto p-6 lg:p-12 relative group/header" :class="notesStore.activeNote.coverImage ? 'pt-16' : ''">
                <!-- Add Cover / Add Icon Buttons -->
                <div class="absolute top-0 left-6 lg:left-12 opacity-0 group-hover/header:opacity-100 transition-opacity flex gap-4" :class="notesStore.activeNote.coverImage ? '-mt-2' : '-mt-4'">
                  <button v-if="!notesStore.activeNote.coverImage" @click="promptImage('cover')" class="text-[var(--muted)] hover:text-[var(--text)] text-sm flex items-center gap-2 transition-colors">
                     <PhotoIcon class="w-4 h-4" />
                     Add Cover
                  </button>
                  <button v-if="!notesStore.activeNote.icon" @click="promptImage('icon')" class="text-[var(--muted)] hover:text-[var(--text)] text-sm flex items-center gap-2 transition-colors">
                     <FaceSmileIcon class="w-4 h-4" />
                     Add Icon
                  </button>
                </div>

                <!-- Large Icon -->
                <div v-if="notesStore.activeNote.icon" class="relative group/icon inline-block -mt-20 mb-4 ml-2" :class="!notesStore.activeNote.coverImage ? 'mt-4' : ''">
                  <div class="w-[78px] h-[78px] bg-[var(--bg)] rounded-xl flex items-center justify-center text-[50px] shadow-sm relative z-10 overflow-hidden border-2 border-[var(--bg)]">
                    <img v-if="notesStore.activeNote.icon.startsWith('http') || notesStore.activeNote.icon.startsWith('data:')" :src="notesStore.activeNote.icon" class="w-full h-full object-cover" />
                    <span v-else>{{ notesStore.activeNote.icon }}</span>
                  </div>
                  <div class="absolute bottom-10 right-[-100px] flex flex-col gap-1 opacity-0 group-hover/icon:opacity-100 transition-opacity z-20">
                    <button @click="promptImage('icon')" class="bg-[var(--bg-card)] border border-[var(--border-soft)] hover:bg-[var(--bg-hover)] text-[var(--text)] text-xs px-2 py-1 rounded shadow-lg transition-colors whitespace-nowrap">
                      Change Icon
                    </button>
                    <button @click="removeImage('icon')" class="bg-[var(--bg-card)] border border-[var(--border-soft)] hover:bg-[var(--bg-hover)] text-[var(--text)] text-xs px-2 py-1 rounded shadow-lg transition-colors whitespace-nowrap text-left">
                      Remove
                    </button>
                  </div>
                </div>

                <input 
                  v-model="notesStore.activeNote.title" 
                  @blur="saveNote(notesStore.activeNote)"
                  type="text" 
                  placeholder="Untitled Note"
                  class="w-full bg-transparent text-[40px] font-bold text-[var(--text)] outline-none border-none placeholder-[var(--border-soft)] mb-6 mt-4"
                />
                
                <TiptapEditor
                  v-model="notesStore.activeNote.content"
                  @blur="saveNote(notesStore.activeNote)"
                  @create-note="createNote(true)"
                />
             </div>
           </div>
        </div>
        
        <!-- Empty State -->
        <div class="flex-1 flex flex-col items-center justify-center min-w-0 bg-[var(--bg)]" v-else>
           <DocumentTextIcon class="w-16 h-16 text-[var(--border-soft)] mb-4" />
           <p class="text-[var(--muted)] text-[15px]">Select a note or create a new one.</p>
        </div>
      </div>
    </main>

    <!-- Delete Confirmation Modal -->
    <div v-if="isDeleteModalOpen" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity" @click.self="cancelDeleteNote">
      <div class="bg-[var(--bg-card)] border border-black/20 rounded-2xl shadow-2xl p-6 w-full max-w-sm mx-4 transform transition-all duration-300">
        <h3 class="text-lg font-semibold text-[var(--text)] mb-2">Excluir Nota</h3>
        <p class="text-[14px] text-[var(--muted)] mb-6">
          Tem certeza de que deseja excluir esta nota? Esta ação não pode ser desfeita.
        </p>
        <div class="flex justify-end gap-3">
          <button 
            @click="cancelDeleteNote" 
            class="px-4 py-2 text-[13px] font-medium text-[var(--text)] bg-[var(--bg-hover)] hover:bg-white hover:text-black rounded-xl transition-colors"
          >
            Cancelar
          </button>
          <button 
            @click="confirmDeleteNote" 
            class="px-4 py-2 text-[13px] font-medium text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors shadow-sm"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useNotesStore } from '@/stores/notes';
import { useAuthStore } from '@/stores/auth';
import {
  FolderIcon,
  DocumentTextIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  Bars3BottomLeftIcon,
  TrashIcon,
  PhotoIcon,
  FaceSmileIcon
} from '@heroicons/vue/24/outline';
import TiptapEditor from '@/components/editor/TiptapEditor.vue';
import '@/composables/useTheme';

const notesStore = useNotesStore();
const authStore = useAuthStore();

const isSidebarOpen = ref(false);
const isSidebarMinimized = ref(localStorage.getItem('notes_sidebar_minimized') === 'true');
const showListOnMobile = ref(true);
const isHoveringCover = ref(false);

const isDeleteModalOpen = ref(false);
const noteToDelete = ref<string | null>(null);

const sidebarWidth = ref(Number(localStorage.getItem('notes_sidebar_width')) || 280);
const notesListWidth = ref(Number(localStorage.getItem('notes_list_width')) || 300);

const fileInput = ref<HTMLInputElement | null>(null);
const uploadTarget = ref<'icon' | 'cover' | null>(null);

const startSidebarResize = (e: MouseEvent) => {
  const startX = e.clientX;
  const startWidth = sidebarWidth.value;
  const onMouseMove = (moveEvent: MouseEvent) => {
    sidebarWidth.value = Math.max(200, Math.min(600, startWidth + (moveEvent.clientX - startX)));
  };
  const onMouseUp = () => {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    document.body.style.cursor = '';
    localStorage.setItem('notes_sidebar_width', String(sidebarWidth.value));
  };
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
  document.body.style.cursor = 'col-resize';
};

const startListResize = (e: MouseEvent) => {
  const startX = e.clientX;
  const startWidth = notesListWidth.value;
  const onMouseMove = (moveEvent: MouseEvent) => {
    notesListWidth.value = Math.max(200, Math.min(600, startWidth + (moveEvent.clientX - startX)));
  };
  const onMouseUp = () => {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    document.body.style.cursor = '';
    localStorage.setItem('notes_list_width', String(notesListWidth.value));
  };
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
  document.body.style.cursor = 'col-resize';
};

const toggleSidebar = () => {
  isSidebarMinimized.value = !isSidebarMinimized.value;
  localStorage.setItem('notes_sidebar_minimized', String(isSidebarMinimized.value));
};

const currentFolderName = computed(() => {
  if (!notesStore.selectedFolderId) return 'All Notes';
  const folder = notesStore.folders.find(f => f.id === notesStore.selectedFolderId);
  return folder ? folder.name : 'All Notes';
});

const createNote = async (isSubNote = false) => {
  const title = prompt('Note title:', 'Untitled Note');
  if (title) {
    let parentId = null;
    
    if (isSubNote && notesStore.activeNoteId) {
      parentId = notesStore.activeNoteId;
    }
    
    const newNote = await notesStore.addNote(title, notesStore.selectedFolderId, parentId);
    
    if (isSubNote) {
       const parentNote = notesStore.notes.find(n => n.id === parentId);
       if (parentNote) {
          const subNoteLink = `<a href="#" data-note-id="${newNote.id}" class="text-[var(--accent)] underline font-medium">📄 ${title}</a> `;
          parentNote.content = (parentNote.content || '') + subNoteLink;
          await notesStore.updateNoteFields(parentNote.id, { content: parentNote.content });
       }
    }
    
    notesStore.setActiveNote(newNote.id);
  }
};

const saveNote = async (note: any) => {
  if (!note) return;
  await notesStore.updateNoteFields(note.id, {
    title: note.title,
    content: note.content
  });
};

const deleteActiveNote = () => {
  if (!notesStore.activeNoteId) return;
  noteToDelete.value = notesStore.activeNoteId;
  isDeleteModalOpen.value = true;
};

const deleteNoteById = (id: string) => {
  noteToDelete.value = id;
  isDeleteModalOpen.value = true;
};

const confirmDeleteNote = async () => {
  if (noteToDelete.value) {
    await notesStore.deleteNote(noteToDelete.value);
    isDeleteModalOpen.value = false;
    noteToDelete.value = null;
  }
};

const cancelDeleteNote = () => {
  isDeleteModalOpen.value = false;
  noteToDelete.value = null;
};

const logout = () => {
  authStore.logout();
};

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
};

const stripHtml = (html: string | null | undefined) => {
  if (!html) return '';
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
};

onMounted(() => {
  notesStore.fetchAll();
});
</script>

<style scoped>
/* Scoped styles if necessary */
</style>
