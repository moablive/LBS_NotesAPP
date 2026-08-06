<template>
  <div class="min-h-screen bg-[var(--bg)] text-[var(--text)] flex h-screen overflow-hidden font-sans">
    <!-- Backdrop (mobile) -->
    <div
      v-if="isSidebarOpen"
      class="fixed inset-0 bg-black/60 z-40 md:hidden"
      @click="isSidebarOpen = false"
    ></div>

    <!-- Sidebar (Note Tree) -->
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
        <!-- Logo -->
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

        <!-- Favorites -->
        <div v-if="!isSidebarMinimized && notesStore.favorites.length" class="mb-4">
          <h3 class="text-[11px] font-bold text-[var(--muted)] mb-2 px-2 uppercase tracking-wide">Favorites</h3>
          <div class="space-y-[2px]">
            <div
              v-for="note in notesStore.favorites"
              :key="'fav-' + note.id"
              @click="notesStore.setActiveNote(note.id)"
              class="group flex items-center gap-2 py-1.5 rounded-lg cursor-pointer px-3 transition-colors"
              :class="notesStore.activeNoteId === note.id && viewMode === 'notes' ? 'bg-[var(--bg-hover)] text-white' : 'hover:bg-[var(--bg-hover)] text-[var(--text)]'"
            >
              <span class="w-4 h-4 shrink-0 inline-flex items-center justify-center">
                <img v-if="note.icon && (note.icon.startsWith('http') || note.icon.startsWith('data:'))" :src="note.icon" class="w-4 h-4 rounded-sm object-cover" />
                <span v-else-if="note.icon" class="text-[13px]">{{ note.icon }}</span>
                <DocumentTextIcon v-else class="w-[14px] h-[14px] text-[var(--muted)]" />
              </span>
              <span class="text-[13px] font-medium truncate flex-1">{{ note.title || 'Sem título' }}</span>
              <button
                class="w-5 h-5 flex items-center justify-center rounded text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                title="Desfavoritar"
                @click.stop="notesStore.toggleFavorite(note.id)"
              >
                <StarSolidIcon class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        <!-- Workspace / Note tree -->
        <div v-if="!isSidebarMinimized">
          <h3 class="text-[11px] font-bold text-[var(--muted)] mb-2 px-2 uppercase tracking-wide">Workspace</h3>

          <div class="space-y-[2px]">
            <!-- All Notes (raiz + drop zone) -->
            <div
              @click="showAllNotes"
              @dragover.prevent="isRootDrop = !!notesStore.draggingId"
              @dragleave="isRootDrop = false"
              @drop.prevent="onDropRoot"
              class="flex items-center gap-2 py-1.5 rounded-lg cursor-pointer transition-all duration-150 px-3"
              :class="[
                (!notesStore.activeNoteId && viewMode === 'notes') ? 'bg-[var(--bg-hover)] text-white' : 'hover:bg-[var(--bg-hover)] text-[var(--text)]',
                isRootDrop ? 'ring-1 ring-[var(--accent)] ring-inset' : ''
              ]"
            >
              <DocumentTextIcon class="w-4 h-4 text-[var(--muted)]" />
              <span class="text-[13px] font-medium">All Notes</span>
            </div>

            <!-- Resultados de busca (plano) -->
            <template v-if="notesStore.searchQuery.trim()">
              <div
                v-for="note in notesStore.searchMatches"
                :key="note.id"
                @click="notesStore.setActiveNote(note.id)"
                class="flex items-center gap-2 py-1.5 rounded-lg cursor-pointer px-3 hover:bg-[var(--bg-hover)]"
                :class="notesStore.activeNoteId === note.id ? 'bg-[var(--bg-hover)] text-white' : 'text-[var(--text)]'"
              >
                <span class="w-4 h-4 shrink-0 inline-flex items-center justify-center">
                  <img v-if="note.icon && (note.icon.startsWith('http') || note.icon.startsWith('data:'))" :src="note.icon" class="w-4 h-4 rounded-sm object-cover" />
                  <span v-else-if="note.icon" class="text-[13px]">{{ note.icon }}</span>
                  <DocumentTextIcon v-else class="w-[14px] h-[14px] text-[var(--muted)]" />
                </span>
                <span class="text-[13px] font-medium truncate">{{ note.title || 'Sem título' }}</span>
              </div>
              <div v-if="notesStore.searchMatches.length === 0" class="px-3 py-2 text-[12px] text-[var(--muted)]">
                Nenhuma nota encontrada.
              </div>
            </template>

            <!-- Árvore recursiva -->
            <template v-else>
              <NoteTreeItem
                v-for="root in notesStore.treeRoots"
                :key="root.id"
                :note-id="root.id"
                :depth="0"
              />
              <div v-if="notesStore.treeRoots.length === 0" class="px-3 py-2 text-[12px] text-[var(--muted)]">
                Nenhuma nota ainda.
              </div>
            </template>
          </div>
        </div>

      </div>

      <!-- Footer Toolbar (fixo no rodapé, estilo Notion) -->
      <div class="p-3 border-t border-black/30 flex flex-col gap-1">
        <!-- Nova nota -->
        <button
          class="flex items-center gap-2 bg-[var(--bg-hover)] text-[var(--text)] hover:bg-white hover:text-black transition-colors rounded-lg py-1.5 text-[13px] font-medium w-full mb-1"
          :class="isSidebarMinimized ? 'justify-center' : 'px-3'"
          @click="createNote"
        >
          <PlusIcon class="w-4 h-4 shrink-0" /> <span v-if="!isSidebarMinimized">New Note</span>
        </button>

        <!-- Trash (fixo no rodapé) -->
        <button
          @click="openTrash"
          class="flex items-center gap-2 py-1.5 rounded-lg cursor-pointer transition-colors w-full"
          :class="[
            isSidebarMinimized ? 'justify-center' : 'justify-between px-3',
            viewMode === 'trash' ? 'bg-[var(--bg-hover)] text-white' : 'hover:bg-[var(--bg-hover)] text-[var(--text)]'
          ]"
          title="Lixeira"
        >
          <div class="flex items-center gap-2">
            <TrashIcon class="w-[18px] h-[18px] text-[var(--muted)]" />
            <span v-if="!isSidebarMinimized" class="text-[13px] font-medium">Trash</span>
          </div>
          <span v-if="!isSidebarMinimized && notesStore.trash.length" class="text-[11px] text-[var(--muted)] bg-[var(--bg)] px-1.5 py-0.5 rounded-full">{{ notesStore.trash.length }}</span>
        </button>

        <!-- Configurações -->
        <button
          @click="showSettings = true"
          class="flex items-center gap-2 py-1.5 rounded-lg cursor-pointer transition-colors w-full hover:bg-[var(--bg-hover)] text-[var(--text)]"
          :class="isSidebarMinimized ? 'justify-center' : 'px-3'"
          title="Configurações"
        >
          <Cog6ToothIcon class="w-[18px] h-[18px] text-[var(--muted)]" />
          <span v-if="!isSidebarMinimized" class="text-[13px] font-medium">Configurações</span>
        </button>

        <!-- Ações -->
        <div class="flex items-center mt-1 pt-1 border-t border-black/20" :class="isSidebarMinimized ? 'flex-col justify-center gap-3' : 'justify-between px-1'">
          <button class="text-[var(--muted)] hover:text-[var(--text)] transition-colors p-1" @click="toggleSidebar" title="Recolher">
            <Bars3BottomLeftIcon class="w-5 h-5" />
          </button>
          <button class="text-[var(--muted)] hover:text-[#ff3b30] transition-colors p-1" @click="logout" title="Logout">
            <ArrowRightOnRectangleIcon class="w-5 h-5" />
          </button>
        </div>
      </div>
    </aside>

    <!-- Main Content (Editor) -->
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
        <!-- Trash View -->
        <div v-if="viewMode === 'trash'" class="flex-1 min-w-0 overflow-y-auto custom-scrollbar bg-[var(--bg)]">
          <div class="max-w-3xl mx-auto w-full p-6 lg:p-12">
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center gap-3">
                <TrashIcon class="w-7 h-7 text-[var(--muted)]" />
                <h1 class="text-[28px] font-bold text-[var(--text)]">Lixeira</h1>
              </div>
              <button
                v-if="notesStore.trash.length"
                @click="confirmEmptyTrash"
                class="text-[13px] font-medium text-[#ff3b30] hover:bg-[#ff3b30]/10 px-3 py-1.5 rounded-lg transition-colors"
              >
                Esvaziar lixeira
              </button>
            </div>

            <p v-if="notesStore.trash.length === 0" class="text-[var(--muted)] text-[14px]">
              A lixeira está vazia.
            </p>

            <div v-else class="space-y-1">
              <div
                v-for="note in notesStore.trash"
                :key="note.id"
                class="group flex items-center gap-3 p-3 rounded-lg hover:bg-[var(--bg-hover)] transition-colors"
              >
                <span class="w-5 h-5 shrink-0 inline-flex items-center justify-center">
                  <img v-if="note.icon && (note.icon.startsWith('http') || note.icon.startsWith('data:'))" :src="note.icon" class="w-5 h-5 rounded-sm object-cover" />
                  <span v-else-if="note.icon" class="text-[15px]">{{ note.icon }}</span>
                  <DocumentTextIcon v-else class="w-4 h-4 text-[var(--muted)]" />
                </span>
                <div class="flex-1 min-w-0">
                  <p class="text-[14px] font-medium text-[var(--text)] truncate">{{ note.title || 'Sem título' }}</p>
                  <p class="text-[11px] text-[var(--muted)]">Excluída em {{ formatDate(note.deletedAt) }}</p>
                </div>
                <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    @click="notesStore.restoreNote(note.id)"
                    class="text-[12px] font-medium text-[var(--accent)] hover:bg-[var(--accent)]/10 px-2.5 py-1 rounded transition-colors"
                  >
                    Restaurar
                  </button>
                  <button
                    @click="confirmPermanentDelete(note)"
                    class="text-[12px] font-medium text-[#ff3b30] hover:bg-[#ff3b30]/10 px-2.5 py-1 rounded transition-colors"
                  >
                    Apagar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Editor Area -->
        <div class="flex-1 flex flex-col min-w-0 bg-[var(--bg)]" v-else-if="notesStore.activeNote">
           <div class="h-12 border-b border-[var(--border-soft)] flex items-center justify-between px-4 shrink-0">
              <button class="md:hidden text-[var(--accent)] text-[14px] font-medium" @click="notesStore.setActiveNote(null)">
                 &larr; Back
              </button>
              <div class="flex items-center gap-2 ml-auto">
                 <button
                   class="text-[var(--muted)] hover:text-[var(--text)] p-1.5 transition-colors"
                   :class="notesStore.isGraphVisible ? 'text-[var(--accent)]' : ''"
                   @click="notesStore.toggleGraphVisible()"
                   title="Toggle Graph View"
                 >
                    <ShareIcon class="w-4 h-4" />
                 </button>
                 <button
                   class="p-1.5 transition-colors"
                   :class="notesStore.activeNote.isFavorite ? 'text-yellow-400 hover:text-yellow-300' : 'text-[var(--muted)] hover:text-[var(--text)]'"
                   @click="notesStore.toggleFavorite(notesStore.activeNote.id)"
                   :title="notesStore.activeNote.isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'"
                 >
                    <StarSolidIcon v-if="notesStore.activeNote.isFavorite" class="w-4 h-4" />
                    <StarIcon v-else class="w-4 h-4" />
                 </button>
                 <button class="text-[var(--muted)] hover:text-[var(--text)] p-1.5 transition-colors" @click="createSubPageFromEditor" title="Nova sub-nota">
                    <PlusIcon class="w-4 h-4" />
                 </button>
                 <button class="text-[var(--muted)] hover:text-[#ff3b30] p-1.5 transition-colors" @click="deleteActiveNote" title="Delete Note">
                    <TrashIcon class="w-4 h-4" />
                 </button>
              </div>
           </div>

           <div class="flex-1 overflow-y-auto custom-scrollbar" @click="onEditorClick">
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

             <div class="max-w-3xl mx-auto px-6 lg:px-12 pb-6 relative group/header" :class="notesStore.activeNote.coverImage ? 'pt-3' : 'pt-12'">
                <!-- Add Cover / Add Icon Buttons -->
                <div class="opacity-0 group-hover/header:opacity-100 transition-opacity flex gap-4 mb-1 h-5">
                  <button v-if="!notesStore.activeNote.coverImage" @click="promptImage('cover')" class="text-[var(--muted)] hover:text-[var(--text)] text-sm flex items-center gap-2 transition-colors">
                     <PhotoIcon class="w-4 h-4" />
                     Add Cover
                  </button>
                  <button v-if="!notesStore.activeNote.icon" @click="promptImage('icon', $event)" class="text-[var(--muted)] hover:text-[var(--text)] text-sm flex items-center gap-2 transition-colors">
                     <FaceSmileIcon class="w-4 h-4" />
                     Add Icon
                  </button>
                </div>

                <!-- Large Icon (sobrepõe o banner, estilo Notion) -->
                <div
                  v-if="notesStore.activeNote.icon"
                  class="relative group/icon inline-block mb-2 ml-0"
                  :class="notesStore.activeNote.coverImage ? '-mt-[52px]' : 'mt-0'"
                >
                  <div class="w-[80px] h-[80px] bg-[var(--bg)] rounded-xl flex items-center justify-center text-[52px] leading-none shadow-md relative z-10 overflow-hidden border-4 border-[var(--bg)] cursor-pointer hover:bg-[var(--bg-hover)] transition-colors" @click="promptImage('icon', $event)">
                    <img v-if="notesStore.activeNote.icon.startsWith('http') || notesStore.activeNote.icon.startsWith('data:')" :src="notesStore.activeNote.icon" class="w-full h-full object-cover" />
                    <span v-else>{{ notesStore.activeNote.icon }}</span>
                  </div>
                </div>

                <input
                  ref="titleInput"
                  v-model="notesStore.activeNote.title"
                  @blur="saveNote(notesStore.activeNote)"
                  type="text"
                  placeholder="Untitled Note"
                  class="w-full bg-transparent text-[40px] font-bold text-[var(--text)] outline-none border-none placeholder-[var(--border-soft)] mb-6 mt-4"
                />

                <TiptapEditor
                  :model-value="notesStore.activeNote.content || undefined"
                  @update:model-value="val => { if (notesStore.activeNote) notesStore.activeNote.content = val }"
                  @blur="saveNote(notesStore.activeNote)"
                  @create-note="createSubPageFromEditor"
                />

                <!-- Backlinks Section -->
                <div v-if="notesStore.backlinks.length > 0" class="mt-12 pt-8 border-t border-[var(--border-soft)]">
                  <h3 class="text-[14px] font-semibold text-[var(--text)] mb-4">Backlinks</h3>
                  <div class="space-y-2">
                    <div
                      v-for="backlink in notesStore.backlinks"
                      :key="backlink.id"
                      class="flex flex-col gap-1 p-3 rounded-xl border border-[var(--border-soft)] bg-[var(--bg-card)] hover:border-[var(--accent)] transition-colors cursor-pointer"
                      @click="notesStore.setActiveNote(backlink.id)"
                    >
                      <div class="flex items-center gap-2">
                        <span class="w-4 h-4 shrink-0 inline-flex items-center justify-center">
                          <img v-if="backlink.icon && (backlink.icon.startsWith('http') || backlink.icon.startsWith('data:'))" :src="backlink.icon" class="w-4 h-4 rounded-sm object-cover" />
                          <span v-else-if="backlink.icon" class="text-[14px]">{{ backlink.icon }}</span>
                          <DocumentTextIcon v-else class="w-4 h-4 text-[var(--muted)]" />
                        </span>
                        <span class="text-[14px] font-medium text-[var(--text)]">{{ backlink.title || 'Sem título' }}</span>
                      </div>
                    </div>
                  </div>
                </div>

             </div>
           </div>
        </div>

        <!-- Empty State -->
        <div class="flex-1 flex flex-col items-center justify-center min-w-0 bg-[var(--bg)]" v-else>
           <DocumentTextIcon class="w-16 h-16 text-[var(--border-soft)] mb-4" />
           <p class="text-[var(--muted)] text-[15px]">Select a note or create a new one.</p>
        </div>

        <!-- Graph Right Panel -->
        <aside
          v-if="notesStore.isGraphVisible"
          class="w-[300px] shrink-0 border-l border-[var(--border-soft)] bg-[var(--bg)] flex flex-col hidden md:flex"
        >
          <div class="h-12 border-b border-[var(--border-soft)] flex items-center px-4 shrink-0">
             <span class="text-[14px] font-semibold">Graph View</span>
          </div>
          <div class="flex-1 min-h-0 relative">
             <GraphView
               v-if="notesStore.isGraphVisible"
               :active-note-id="notesStore.activeNoteId || undefined"
               @node-click="handleGraphNodeClick"
             />
          </div>
        </aside>
      </div>
    </main>

    <!-- Hidden file input (icon/cover upload) -->
    <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="onFileSelected" />

    <!-- Icon picker popover -->
    <template v-if="iconPickerOpen">
      <div class="fixed inset-0 z-[110]" @click="iconPickerOpen = false"></div>
      <div
        class="fixed z-[120] w-[280px] bg-[var(--bg-card)] border border-black/20 rounded-xl shadow-2xl p-3"
        :style="{ top: iconPickerPos.y + 'px', left: iconPickerPos.x + 'px' }"
        @click.stop
      >
        <div class="flex items-center justify-between mb-2">
          <span class="text-[12px] font-semibold text-[var(--muted)]">Escolha um emoji</span>
          <div class="flex gap-2">
            <button @click="promptImageUpload('icon')" class="text-[11px] text-[var(--accent)] hover:underline">Upload</button>
            <button v-if="notesStore.activeNote && notesStore.activeNote.icon" @click="removeImage('icon')" class="text-[11px] text-[var(--muted)] hover:text-[#ff3b30]">Remover</button>
          </div>
        </div>
        <div class="grid grid-cols-8 gap-1 max-h-[200px] overflow-y-auto custom-scrollbar">
          <button
            v-for="emoji in EMOJIS"
            :key="emoji"
            @click="setIcon(emoji)"
            class="w-8 h-8 flex items-center justify-center text-[20px] rounded hover:bg-[var(--bg-hover)] transition-colors"
          >{{ emoji }}</button>
        </div>
      </div>
    </template>

    <!-- Confirm Modal (ações destrutivas) -->
    <div v-if="confirmState" class="fixed inset-0 z-[130] flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity" @click.self="confirmState = null">
      <div class="bg-[var(--bg-card)] border border-black/20 rounded-2xl shadow-2xl p-6 w-full max-w-sm mx-4 transform transition-all duration-300">
        <h3 class="text-lg font-semibold text-[var(--text)] mb-2">{{ confirmState.title }}</h3>
        <p class="text-[14px] text-[var(--muted)] mb-6">{{ confirmState.message }}</p>
        <div class="flex justify-end gap-3">
          <button
            @click="confirmState = null"
            class="px-4 py-2 text-[13px] font-medium text-[var(--text)] bg-[var(--bg-hover)] hover:bg-white hover:text-black rounded-xl transition-colors"
          >
            Cancelar
          </button>
          <button
            @click="runConfirm"
            class="px-4 py-2 text-[13px] font-medium text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors shadow-sm"
          >
            {{ confirmState.confirmLabel }}
          </button>
        </div>
      </div>
    </div>

    <!-- Settings Modal -->
    <SettingsModal v-if="showSettings" @close="showSettings = false" />

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from 'vue';
import { useNotesStore } from '@/stores/notes';
import { useAuthStore } from '@/stores/auth';
import {
  DocumentTextIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  Bars3BottomLeftIcon,
  TrashIcon,
  PhotoIcon,
  FaceSmileIcon,
  StarIcon,
  Cog6ToothIcon,
  ShareIcon
} from '@heroicons/vue/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/vue/24/solid';
import TiptapEditor from '@/components/editor/TiptapEditor.vue';
import NoteTreeItem from '@/components/NoteTreeItem.vue';
import SettingsModal from '@/components/SettingsModal.vue';
import GraphView from '@/components/GraphView.vue';
import '@/composables/useTheme';

const notesStore = useNotesStore();
const authStore = useAuthStore();

const isSidebarOpen = ref(false);
const isSidebarMinimized = ref(localStorage.getItem('notes_sidebar_minimized') === 'true');
const isHoveringCover = ref(false);
const isRootDrop = ref(false);
const showSettings = ref(false);

// 'notes' = árvore/editor | 'trash' = lixeira
const viewMode = ref<'notes' | 'trash'>('notes');

const handleGraphNodeClick = (nodeId: string) => {
  if (notesStore.notes.some(n => n.id === nodeId)) {
    notesStore.setActiveNote(nodeId);
  }
};

type ConfirmState = { title: string; message: string; confirmLabel: string; onConfirm: () => void };
const confirmState = ref<ConfirmState | null>(null);

const sidebarWidth = ref(Number(localStorage.getItem('notes_sidebar_width')) || 280);

const fileInput = ref<HTMLInputElement | null>(null);
const uploadTarget = ref<'icon' | 'cover' | null>(null);
const titleInput = ref<HTMLInputElement | null>(null);

const iconPickerOpen = ref(false);
const iconPickerPos = ref({ x: 0, y: 0 });

const EMOJIS = [
  '📝','📄','📌','📎','🗂️','📁','📚','📖','✅','☑️','⭐','🌟','💡','🔥','🚀','🎯',
  '💰','💳','🏦','📊','📈','📉','🧾','🗓️','⏰','🔔','❤️','💬','🧠','🔒','🔑','⚙️',
  '🏠','🏢','💻','📱','🎵','🎨','🍔','☕','✈️','🌍','🌱','🐍','🤖','🧩','🎓','🛠️'
];

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

const toggleSidebar = () => {
  isSidebarMinimized.value = !isSidebarMinimized.value;
  localStorage.setItem('notes_sidebar_minimized', String(isSidebarMinimized.value));
};

const focusTitle = async () => {
  await nextTick();
  titleInput.value?.focus();
  titleInput.value?.select();
};

const createNote = async () => {
  const note = await notesStore.addNote('Sem título', null, null);
  notesStore.setActiveNote(note.id);
  focusTitle();
};

const createSubPageFromEditor = async () => {
  const parent = notesStore.activeNote;
  if (!parent) return;
  await saveNote(parent);
  const child = await notesStore.addNote('Sem título', null, parent.id);
  notesStore.expand(parent.id);
  notesStore.setActiveNote(child.id);
  focusTitle();
};

const saveNote = async (note: any) => {
  if (!note) return;
  await notesStore.updateNoteFields(note.id, {
    title: note.title,
    content: note.content
  });
};

// Persiste ícone + capa da nota ativa.
const persistHeader = async () => {
  const n = notesStore.activeNote;
  if (!n) return;
  await notesStore.updateNoteFields(n.id, {
    icon: n.icon ?? null,
    coverImage: n.coverImage ?? null,
  });
};

// Lê uma imagem e reduz para caber com folga no limite do backend (10MB/req).
const readScaled = (file: File, maxDim: number, mime: string, quality: number): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error);
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('imagem inválida'));
      img.onload = () => {
        let { width, height } = img;
        const largest = Math.max(width, height);
        if (largest > maxDim) {
          const scale = maxDim / largest;
          width = Math.round(width * scale);
          height = Math.round(height * scale);
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject(new Error('sem canvas'));
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL(mime, quality));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });

const openIconPicker = (e?: MouseEvent) => {
  if (e) {
    const x = Math.min(e.clientX, window.innerWidth - 300);
    const y = Math.min(e.clientY, window.innerHeight - 320);
    iconPickerPos.value = { x: Math.max(8, x), y: Math.max(8, y) };
  }
  iconPickerOpen.value = true;
};

const promptImage = (target: 'icon' | 'cover', e?: MouseEvent) => {
  if (target === 'cover') {
    uploadTarget.value = 'cover';
    fileInput.value?.click();
  } else {
    openIconPicker(e);
  }
};

// "Upload" dentro do picker de ícone.
const promptImageUpload = (target: 'icon' | 'cover') => {
  uploadTarget.value = target;
  fileInput.value?.click();
};

const setIcon = async (emoji: string) => {
  const n = notesStore.activeNote;
  if (!n) return;
  n.icon = emoji;
  iconPickerOpen.value = false;
  await persistHeader();
};

const onFileSelected = async (e: Event) => {
  const input = e.target as HTMLInputElement;
  const file = input.files?.[0];
  input.value = ''; // permite re-selecionar o mesmo arquivo
  const n = notesStore.activeNote;
  if (!file || !n) return;
  try {
    if (uploadTarget.value === 'cover') {
      n.coverImage = await readScaled(file, 1600, 'image/jpeg', 0.85);
    } else {
      n.icon = await readScaled(file, 256, 'image/png', 1);
    }
    await persistHeader();
  } catch (err) {
    console.error('Falha ao processar imagem:', err);
  } finally {
    uploadTarget.value = null;
    iconPickerOpen.value = false;
  }
};

const removeImage = async (target: 'icon' | 'cover') => {
  const n = notesStore.activeNote;
  if (!n) return;
  if (target === 'cover') n.coverImage = null;
  else n.icon = null;
  iconPickerOpen.value = false;
  isHoveringCover.value = false;
  await persistHeader();
};

// Clique em link de sub-página (<a data-note-id>) dentro do editor abre a nota.
const onEditorClick = (e: MouseEvent) => {
  const el = (e.target as HTMLElement)?.closest?.('a[data-note-id]') as HTMLElement | null;
  if (!el) return;
  e.preventDefault();
  const id = el.getAttribute('data-note-id');
  if (id && notesStore.notes.some(n => n.id === id)) {
    notesStore.setActiveNote(id);
  }
};

const onDropRoot = async () => {
  isRootDrop.value = false;
  if (notesStore.draggingId) {
    await notesStore.moveNote(notesStore.draggingId, null);
    notesStore.setDragging(null);
  }
};

// Excluir a nota ativa = mover para a LIXEIRA (reversível, sem modal).
const deleteActiveNote = async () => {
  if (!notesStore.activeNoteId) return;
  await notesStore.deleteNote(notesStore.activeNoteId);
};

const askConfirm = (opts: ConfirmState) => {
  confirmState.value = opts;
};

const runConfirm = () => {
  const c = confirmState.value;
  confirmState.value = null;
  c?.onConfirm();
};

const showAllNotes = () => {
  viewMode.value = 'notes';
  notesStore.setActiveNote(null);
};

const openTrash = () => {
  viewMode.value = 'trash';
  notesStore.fetchTrash();
};

const confirmPermanentDelete = (note: any) => {
  askConfirm({
    title: 'Apagar definitivamente',
    message: `"${note.title || 'Sem título'}" e todas as suas sub-notas serão apagadas para sempre. Esta ação não pode ser desfeita.`,
    confirmLabel: 'Apagar',
    onConfirm: () => notesStore.permanentDelete(note.id),
  });
};

const confirmEmptyTrash = () => {
  askConfirm({
    title: 'Esvaziar lixeira',
    message: 'Todas as notas na lixeira serão apagadas para sempre. Esta ação não pode ser desfeita.',
    confirmLabel: 'Esvaziar',
    onConfirm: () => notesStore.emptyTrash(),
  });
};

const formatDate = (dateStr: string | Date | null | undefined) => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
};

const logout = () => {
  authStore.logout();
};

// Selecionar qualquer nota tira o usuário da view de lixeira.
watch(() => notesStore.activeNoteId, (id) => {
  if (id) viewMode.value = 'notes';
});

onMounted(() => {
  notesStore.fetchAll();
  notesStore.fetchTrash();
});
</script>

<style scoped>
/* Scoped styles if necessary */
</style>
