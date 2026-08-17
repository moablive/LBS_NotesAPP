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
      class="bg-[var(--bg-side)] flex flex-col border-r border-black/30 max-md:fixed max-md:inset-y-0 max-md:left-0 max-md:z-50 max-md:w-[290px] max-md:shadow-2xl max-md:transition-transform max-md:duration-200 relative shrink-0"
      :class="[
        isSidebarOpen ? 'max-md:translate-x-0' : 'max-md:-translate-x-full',
        isSidebarMinimized ? 'w-[72px] items-center' : '',
        isResizingSidebar ? 'transition-none' : 'transition-[width] duration-300'
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
        <!-- Seletor de workspace (estilo Notion): mostra o ambiente atual e
             abre o menu para trocar, renomear ou criar outro. -->
        <div class="mb-5">
          <button
            ref="workspaceTrigger"
            @click="toggleWorkspaceMenu"
            class="w-full flex items-center gap-2 rounded-lg py-1.5 hover:bg-[var(--bg-hover)] transition-colors"
            :class="isSidebarMinimized ? 'justify-center px-0' : 'px-2'"
            :title="activeWorkspace?.name || 'Workspace'"
          >
            <span class="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center shrink-0 bg-[var(--bg-hover)] text-[16px] leading-none">
              <img
                v-if="activeWorkspace?.icon && (activeWorkspace.icon.startsWith('http') || activeWorkspace.icon.startsWith('data:'))"
                :src="activeWorkspace.icon"
                class="w-full h-full object-cover"
              />
              <span v-else-if="activeWorkspace?.icon">{{ activeWorkspace.icon }}</span>
              <img v-else src="/logo/icon-192.png" alt="NotesAPP Logo" class="w-full h-full object-cover" />
            </span>
            <template v-if="!isSidebarMinimized">
              <span class="font-semibold tracking-tight text-[15px] truncate flex-1 text-left">
                {{ activeWorkspace?.name || 'NotesAPP' }}
              </span>
              <ChevronUpDownIcon class="w-4 h-4 text-[var(--muted)] shrink-0" />
            </template>
          </button>
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

        <!-- Páginas do workspace ativo -->
        <div v-if="!isSidebarMinimized">
          <h3 class="text-[11px] font-bold text-[var(--muted)] mb-2 px-2 uppercase tracking-wide">Páginas</h3>

          <div class="space-y-[2px]">
            <!-- Nova página na raiz do workspace (também é a drop zone da raiz) -->
            <div
              @click="createNote"
              @dragover.prevent="isRootDrop = !!notesStore.draggingId"
              @dragleave="isRootDrop = false"
              @drop.prevent="onDropRoot"
              class="flex items-center gap-2 py-1.5 rounded-lg cursor-pointer transition-all duration-150 px-3 hover:bg-[var(--bg-hover)] text-[var(--text)] group"
              :class="isRootDrop ? 'ring-1 ring-[var(--accent)] ring-inset' : ''"
            >
              <PlusIcon class="w-4 h-4 text-[var(--muted)] group-hover:text-[var(--text)] transition-colors" />
              <span class="text-[13px] font-medium">Nova página</span>
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
                Nenhuma página neste workspace ainda.
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
              
              <!-- Breadcrumbs -->
              <div class="hidden md:flex items-center gap-1 text-[13px] text-[var(--muted)] truncate max-w-[60%]">
                <template v-for="(b, i) in getBreadcrumbs()" :key="b.id">
                  <span v-if="i > 0" class="mx-1">/</span>
                  <button @click="notesStore.setActiveNote(b.id)" class="hover:text-[var(--text)] transition-colors truncate max-w-[150px] text-left">
                    <span v-if="b.icon && !b.icon.startsWith('http')">{{ b.icon }}</span>
                    <DocumentTextIcon v-else-if="!b.icon" class="w-3 h-3 inline-block mr-1 -mt-0.5" />
                    {{ b.title || 'Sem título' }}
                  </button>
                </template>
              </div>

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
                 <button class="text-[var(--muted)] hover:text-[var(--text)] p-1.5 transition-colors" @click="() => createSubPageFromEditor()" title="Nova página dentro desta">
                    <PlusIcon class="w-4 h-4" />
                 </button>
                 <button class="text-[var(--muted)] hover:text-[#ff3b30] p-1.5 transition-colors" @click="deleteActiveNote" title="Delete Note">
                    <TrashIcon class="w-4 h-4" />
                 </button>
              </div>
           </div>

           <div class="flex-1 overflow-y-auto custom-scrollbar" @click="onEditorClick">
             <!-- Cover Image -->
             <div class="relative w-full h-48 bg-[var(--bg-hover)] group flex items-center justify-center transition-all overflow-hidden" 
                  v-if="notesStore.activeNote.coverImage || isHoveringCover" 
                  @mouseenter="isHoveringCover = true" 
                  @mouseleave="isHoveringCover = false"
                  @mousedown="startReposition"
                  :class="isRepositioningCover ? 'cursor-grab active:cursor-grabbing' : ''"
             >
               <!-- A imagem precisa ficar do tamanho EXATO da faixa (absolute inset-0):
                    com altura automática ela crescia até a altura natural, transbordava
                    o overflow-hidden e o object-position não tinha o que recortar — daí
                    "Reposicionar" não mexia em nada. -->
               <img v-if="notesStore.activeNote.coverImage" :src="notesStore.activeNote.coverImage" class="absolute inset-0 w-full h-full object-cover pointer-events-none select-none" :style="{ objectPosition: `center ${notesStore.activeNote.coverPositionY ?? 50}%` }" draggable="false" />
               <div v-else class="text-[var(--muted)] text-sm flex flex-col items-center gap-2">
                  <PhotoIcon class="w-8 h-8 opacity-50" />
                  <span>No cover</span>
               </div>

               <!-- Repositioning controls -->
               <div v-if="isRepositioningCover" class="absolute top-4 right-4 flex gap-2 z-10">
                  <button @click.stop="saveReposition" @mousedown.stop class="bg-blue-600 hover:bg-blue-700 text-white text-xs px-4 py-1.5 rounded shadow-md transition-colors font-medium">
                     Salvar
                  </button>
                  <button @click.stop="cancelReposition" @mousedown.stop class="bg-black/50 hover:bg-black/70 text-white text-xs px-4 py-1.5 rounded shadow-md transition-colors font-medium">
                     Cancelar
                  </button>
               </div>
               <div v-if="isRepositioningCover" class="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div class="bg-black/40 text-white px-3 py-1.5 rounded-lg backdrop-blur-sm text-sm font-medium">Arraste a imagem para reposicionar</div>
               </div>

               <!-- Normal controls -->
               <div v-if="!isRepositioningCover" class="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button v-if="notesStore.activeNote.coverImage" @click.stop="beginReposition" @mousedown.stop class="bg-black/50 hover:bg-black/70 text-white text-xs px-3 py-1.5 rounded backdrop-blur-md transition-colors flex items-center gap-2">
                     <ArrowsUpDownIcon class="w-4 h-4" />
                     Reposicionar
                  </button>
                  <button @click.stop="openPicker('cover', $event)" @mousedown.stop class="bg-black/50 hover:bg-black/70 text-white text-xs px-3 py-1.5 rounded backdrop-blur-md transition-colors flex items-center gap-2">
                     <PhotoIcon class="w-4 h-4" />
                     Alterar capa
                  </button>
                  <button v-if="notesStore.activeNote.coverImage" @click.stop="clearCover()" class="bg-black/50 hover:bg-black/70 text-white text-xs px-3 py-1.5 rounded backdrop-blur-md transition-colors flex items-center gap-2">
                     <TrashIcon class="w-4 h-4" />
                  </button>
               </div>
             </div>

             <div class="max-w-3xl mx-auto px-6 lg:px-12 pb-6 relative group/header" :class="notesStore.activeNote.coverImage ? 'pt-3' : 'pt-12'">
                <!-- Add Cover / Add Icon Buttons -->
                <div class="opacity-0 group-hover/header:opacity-100 transition-opacity flex gap-4 mb-1 h-5">
                  <button v-if="!notesStore.activeNote.coverImage" @click="openPicker('cover', $event)" class="text-[var(--muted)] hover:text-[var(--text)] text-sm flex items-center gap-2 transition-colors">
                     <PhotoIcon class="w-4 h-4" />
                     Add Cover
                  </button>
                  <button v-if="!notesStore.activeNote.icon" @click="openPicker('icon', $event)" class="text-[var(--muted)] hover:text-[var(--text)] text-sm flex items-center gap-2 transition-colors">
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
                  <div class="w-[80px] h-[80px] bg-[var(--bg)] rounded-xl flex items-center justify-center text-[52px] leading-none shadow-md relative z-10 overflow-hidden border-4 border-[var(--bg)] cursor-pointer hover:bg-[var(--bg-hover)] transition-colors" @click="openPicker('icon', $event)">
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



    <!-- Menu de workspaces. Fica `fixed` porque a coluna da sidebar tem
         overflow-y-auto e cortaria um dropdown absoluto. -->
    <template v-if="workspaceMenuOpen">
      <div class="fixed inset-0 z-[110]" @click="workspaceMenuOpen = false"></div>
      <div
        class="fixed z-[120] bg-[var(--bg-card)] border border-black/20 rounded-xl shadow-2xl p-2"
        :style="{ top: workspaceMenuPos.y + 'px', left: workspaceMenuPos.x + 'px', width: workspaceMenuPos.w + 'px' }"
        @click.stop
      >
        <p class="text-[11px] font-bold text-[var(--muted)] uppercase tracking-wide px-2 py-1">Workspaces</p>
        <div class="max-h-[260px] overflow-y-auto custom-scrollbar space-y-[2px]">
          <div
            v-for="ws in notesStore.workspaces"
            :key="ws.id"
            @click="selectWorkspace(ws.id)"
            class="group flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer hover:bg-[var(--bg-hover)] transition-colors"
          >
            <span class="w-6 h-6 rounded-md overflow-hidden bg-[var(--bg-hover)] flex items-center justify-center text-[13px] leading-none shrink-0">
              <img v-if="ws.icon && (ws.icon.startsWith('http') || ws.icon.startsWith('data:'))" :src="ws.icon" class="w-full h-full object-cover" />
              <span v-else-if="ws.icon">{{ ws.icon }}</span>
              <span v-else>🗂️</span>
            </span>
            <span class="text-[13px] font-medium text-[var(--text)] truncate flex-1">{{ ws.name }}</span>
            <CheckIcon v-if="ws.id === notesStore.activeWorkspaceId" class="w-4 h-4 text-[var(--accent)] shrink-0" />
            <button
              class="w-5 h-5 flex items-center justify-center rounded text-[var(--muted)] hover:text-[var(--text)] opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
              title="Renomear workspace"
              @click.stop="renameWorkspace(ws)"
            >
              <PencilSquareIcon class="w-3.5 h-3.5" />
            </button>
            <button
              v-if="notesStore.workspaces.length > 1"
              class="w-5 h-5 flex items-center justify-center rounded text-[var(--muted)] hover:text-[#ff3b30] opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
              title="Apagar workspace"
              @click.stop="confirmDeleteWorkspace(ws)"
            >
              <TrashIcon class="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        <div class="border-t border-black/20 mt-2 pt-2">
          <button
            @click="createWorkspace"
            class="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-[var(--bg-hover)] text-[13px] font-medium text-[var(--accent)] transition-colors"
          >
            <PlusIcon class="w-4 h-4" />
            Novo workspace
          </button>
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

    <!-- Create Modal -->
    <div v-if="showCreateModal" class="fixed inset-0 z-[130] flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity" @click.self="showCreateModal = false">
      <div class="bg-[var(--bg-card)] border border-black/20 rounded-2xl shadow-2xl p-6 w-full max-w-sm mx-4 transform transition-all duration-300">
        <h3 class="text-lg font-semibold text-[var(--text)] mb-4">
          {{ createModalTitle }}
        </h3>
        <div class="flex items-center gap-2 mb-6">
          <!-- Ícone do workspace (só na criação/renomeação de workspace) -->
          <button
            v-if="isWorkspaceModal"
            @click="openPicker('workspace', $event)"
            class="w-10 h-10 shrink-0 rounded-lg bg-[var(--bg-hover)] hover:bg-[var(--bg)] border border-transparent hover:border-[var(--accent)] flex items-center justify-center text-[20px] leading-none transition-colors"
            title="Escolher ícone"
          >
            {{ newWorkspaceIcon || '🗂️' }}
          </button>
          <input
            v-model="newNoteTitle"
            type="text"
            :placeholder="isWorkspaceModal ? 'Nome do workspace' : 'Título'"
            class="flex-1 min-w-0 bg-[var(--bg-hover)] border border-transparent rounded-lg py-2 px-3 text-[14px] outline-none text-[var(--text)] placeholder-[var(--muted)] focus:border-[var(--accent)]"
            @keyup.enter="handleCreate"
            autofocus
          />
        </div>

        <div class="flex justify-end gap-3">
          <button
            @click="showCreateModal = false"
            class="px-4 py-2 text-[13px] font-medium text-[var(--text)] bg-[var(--bg-hover)] hover:bg-white hover:text-black rounded-xl transition-colors"
          >
            Cancelar
          </button>
          <button
            @click="handleCreate"
            class="px-4 py-2 text-[13px] font-medium text-white bg-[var(--accent)] hover:opacity-90 rounded-xl transition-colors shadow-sm"
          >
            {{ createModalType === 'rename-workspace' ? 'Salvar' : 'Criar' }}
          </button>
        </div>
      </div>
    </div>



    <!-- Settings Modal -->
    <!-- Picker único de ícone/imagem (nota, capa e workspace) -->
    <IconPicker
      v-if="picker"
      :anchor="picker.anchor"
      :value="pickerValue"
      :allow-emoji="picker.target !== 'cover'"
      :max-dim="picker.target === 'cover' ? 1600 : 256"
      @select="applyPickerValue"
      @remove="removePickerValue"
      @close="picker = null"
    />

    <SettingsModal v-if="showSettings" @close="showSettings = false" />

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue';
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
  ShareIcon,
  ArrowsUpDownIcon,
  ChevronUpDownIcon,
  CheckIcon,
  PencilSquareIcon
} from '@heroicons/vue/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/vue/24/solid';
import TiptapEditor from '@/components/editor/TiptapEditor.vue';
import { contentHasSubPage } from '@/components/editor/subPageHtml';
import NoteTreeItem from '@/components/NoteTreeItem.vue';
import IconPicker from '@/components/IconPicker.vue';
import SettingsModal from '@/components/SettingsModal.vue';
import GraphView from '@/components/GraphView.vue';
import '@/composables/useTheme';

const notesStore = useNotesStore();
const authStore = useAuthStore();

const isSidebarOpen = ref(false);
const isSidebarMinimized = ref(localStorage.getItem('notes_sidebar_minimized') === 'true');
const isResizingSidebar = ref(false);
const isHoveringCover = ref(false);
const isRootDrop = ref(false);
const showSettings = ref(false);

const showCreateModal = ref(false);
const createModalType = ref<'workspace' | 'note' | 'rename-workspace'>('note');
const newNoteTitle = ref('');
const newWorkspaceIcon = ref('🗂️');
const renameWorkspaceId = ref<string | null>(null);

// Seletor de workspace (dropdown da sidebar).
const workspaceMenuOpen = ref(false);
const workspaceTrigger = ref<HTMLElement | null>(null);
const workspaceMenuPos = ref({ x: 8, y: 8, w: 260 });

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

const titleInput = ref<HTMLInputElement | null>(null);

// Um único picker para ícone da nota, capa e ícone do workspace: antes eram três
// UIs diferentes (grade de emoji, popover de capa, modal de link).
type PickerTarget = 'icon' | 'cover' | 'workspace';
const picker = ref<{ target: PickerTarget; anchor: { x: number; y: number } } | null>(null);

const startSidebarResize = (e: MouseEvent) => {
  isResizingSidebar.value = true;
  const startX = e.clientX;
  const startWidth = sidebarWidth.value;
  const onMouseMove = (moveEvent: MouseEvent) => {
    sidebarWidth.value = Math.max(200, Math.min(600, startWidth + (moveEvent.clientX - startX)));
  };
  const onMouseUp = () => {
    isResizingSidebar.value = false;
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

const activeWorkspace = computed(
  () => notesStore.workspaces.find(w => w.id === notesStore.activeWorkspaceId) || null,
);

const isWorkspaceModal = computed(
  () => createModalType.value === 'workspace' || createModalType.value === 'rename-workspace',
);

const createModalTitle = computed(() => {
  if (createModalType.value === 'workspace') return 'Criar Workspace';
  if (createModalType.value === 'rename-workspace') return 'Renomear Workspace';
  return 'Nova Página';
});

const toggleWorkspaceMenu = () => {
  if (workspaceMenuOpen.value) {
    workspaceMenuOpen.value = false;
    return;
  }
  const rect = workspaceTrigger.value?.getBoundingClientRect();
  if (rect) {
    const width = Math.max(240, Math.min(rect.width, 320));
    workspaceMenuPos.value = {
      x: Math.max(8, Math.min(rect.left, window.innerWidth - width - 8)),
      y: rect.bottom + 6,
      w: width,
    };
  }
  workspaceMenuOpen.value = true;
};

const selectWorkspace = async (workspaceId: string) => {
  workspaceMenuOpen.value = false;
  await notesStore.setActiveWorkspace(workspaceId);
};

const openCreateModal = (type: 'workspace' | 'note') => {
  createModalType.value = type;
  newNoteTitle.value = '';
  newWorkspaceIcon.value = '🗂️';
  renameWorkspaceId.value = null;
  showCreateModal.value = true;
};

const handleCreate = async () => {
  const typed = newNoteTitle.value.trim();

  if (createModalType.value === 'workspace') {
    await notesStore.addWorkspace(typed || 'Novo Workspace', newWorkspaceIcon.value || null);
    showCreateModal.value = false;
    return;
  }

  if (createModalType.value === 'rename-workspace') {
    const id = renameWorkspaceId.value;
    if (id) {
      await notesStore.updateWorkspace(id, {
        name: typed || 'Workspace',
        icon: newWorkspaceIcon.value || null,
      });
    }
    showCreateModal.value = false;
    return;
  }

  const note = await notesStore.addNote(typed || 'Sem título', null, null);
  notesStore.setActiveNote(note.id);
  showCreateModal.value = false;
  focusTitle();
};

const createNote = () => openCreateModal('note');

const createWorkspace = () => {
  workspaceMenuOpen.value = false;
  openCreateModal('workspace');
};

const renameWorkspace = (ws: { id: string; name: string; icon: string | null }) => {
  workspaceMenuOpen.value = false;
  createModalType.value = 'rename-workspace';
  renameWorkspaceId.value = ws.id;
  newNoteTitle.value = ws.name;
  newWorkspaceIcon.value = ws.icon || '🗂️';
  showCreateModal.value = true;
};

// Filhas que ainda NÃO têm bloco no conteúdo do pai: criadas antes deste
// comportamento, restauradas da lixeira ou cujo bloco o usuário apagou. As que
// têm bloco já aparecem dentro do texto, na posição certa.
const unlinkedChildPages = computed(() => {
  const parent = notesStore.activeNote;
  if (!parent) return [];
  return notesStore
    .childrenOf(parent.id)
    .filter(child => !contentHasSubPage(parent.content, child.id));
});

// Abre uma filha salvando antes o pai: o v-model do editor só vira PATCH no
// blur, e trocar de nota sem salvar perderia o que foi digitado.
const openChildPage = async (childId: string) => {
  const currentId = notesStore.activeNoteId;
  if (currentId && currentId !== childId) await notesStore.saveNote(currentId);
  notesStore.setActiveNote(childId);
};

// Traz uma página filha antiga (sem bloco) para dentro do conteúdo.
const linkChildPage = async (childId: string) => {
  const parentId = notesStore.activeNoteId;
  const child = notesStore.notes.find(n => n.id === childId);
  if (!parentId || !child) return;
  await notesStore.linkSubPage(parentId, childId, child.title);
};

const getBreadcrumbs = () => {
  const breadcrumbs = [];
  let current = notesStore.activeNote;
  while (current) {
    breadcrumbs.unshift(current);
    if (!current.parentId) break;
    current = notesStore.notes.find(n => n.id === current.parentId) || null;
  }
  return breadcrumbs;
};

// Cria uma página dentro da atual. Quando vem do comando "/Page", o editor manda um callback
// que insere o bloco da filha na posição do cursor; sem callback (botão + do
// header) a store grava o bloco no fim do conteúdo do pai.
//
// A ordem aqui importa: antes a nota filha era ativada dentro de addNote() e o
// link acabava escrito no conteúdo DELA (um link para si mesma), enquanto o pai
// era salvo a partir de uma referência velha — resultado: nada de página dentro
// de página. Agora a filha só entra em foco depois que o pai já está salvo.
const createSubPageFromEditor = async (insertLink?: (id: string, title: string) => void) => {
  const parentId = notesStore.activeNoteId;
  if (!parentId) return;
  await notesStore.saveNote(parentId);

  if (typeof insertLink !== 'function') {
    const child = await notesStore.createSubPage(parentId);
    notesStore.setActiveNote(child.id);
    focusTitle();
    return;
  }

  const child = await notesStore.addNote('Sem título', null, parentId, false);
  insertLink(child.id, child.title || 'Sem título');
  await nextTick(); // deixa o editor emitir o update:modelValue
  await notesStore.saveNote(parentId);

  notesStore.expand(parentId);
  notesStore.setActiveNote(child.id);
  focusTitle();
};

const saveNote = async (note: any) => {
  if (!note) return;
  await notesStore.saveNote(note.id);
};

// Persiste ícone + capa da nota ativa.
const persistHeader = async () => {
  const n = notesStore.activeNote;
  if (!n) return;
  await notesStore.updateNoteFields(n.id, {
    icon: n.icon ?? null,
    coverImage: n.coverImage ?? null,
    coverPositionY: n.coverPositionY ?? 50,
  });
};

// Abre o picker ancorado no clique. A própria IconPicker clampa na viewport.
const openPicker = (target: PickerTarget, e?: MouseEvent) => {
  const anchor = e
    ? { x: e.clientX, y: e.clientY }
    : { x: window.innerWidth / 2 - 170, y: 120 };
  picker.value = { target, anchor };
};

// Valor atual do alvo aberto — habilita o "Remover" e mostra o que está em uso.
const pickerValue = computed(() => {
  if (!picker.value) return null;
  if (picker.value.target === 'workspace') return newWorkspaceIcon.value;
  const n = notesStore.activeNote;
  if (!n) return null;
  return picker.value.target === 'cover' ? n.coverImage : n.icon;
});

// Emoji, URL ou data URL: o picker devolve string e cada alvo grava do seu jeito.
const applyPickerValue = async (value: string) => {
  const target = picker.value?.target;
  picker.value = null;
  if (target === 'workspace') {
    newWorkspaceIcon.value = value;
    return;
  }
  const n = notesStore.activeNote;
  if (!n || !target) return;
  if (target === 'cover') {
    n.coverImage = value;
    n.coverPositionY = 50;
  } else {
    n.icon = value;
  }
  await persistHeader();
};

const removePickerValue = async () => {
  const target = picker.value?.target;
  picker.value = null;
  if (target === 'workspace') {
    newWorkspaceIcon.value = '🗂️';
    return;
  }
  const n = notesStore.activeNote;
  if (!n || !target) return;
  if (target === 'cover') {
    n.coverImage = null;
    n.coverPositionY = 50;
  } else {
    n.icon = null;
  }
  isHoveringCover.value = false;
  await persistHeader();
};

/** Botão de lixeira sobre a capa (não passa pelo picker). */
const clearCover = async () => {
  const n = notesStore.activeNote;
  if (!n) return;
  n.coverImage = null;
  n.coverPositionY = 50;
  isHoveringCover.value = false;
  await persistHeader();
};

const isRepositioningCover = ref(false);
const dragStartY = ref(0);
const initialCoverY = ref(50);

// Entra no modo reposicionar guardando a posição atual, para o "Cancelar"
// restaurar exatamente o que estava salvo (antes ele usava o valor do último
// arrasto, que podia ser de outra nota).
const beginReposition = () => {
  if (!notesStore.activeNote?.coverImage) return;
  initialCoverY.value = notesStore.activeNote.coverPositionY ?? 50;
  isRepositioningCover.value = true;
};

const startReposition = (e: MouseEvent) => {
  if (!isRepositioningCover.value) return;
  e.preventDefault(); // Prevents text selection / drag behavior
  dragStartY.value = e.clientY;
  // Base = posição no início DESTE arrasto (permite vários arrastos seguidos).
  const baseY = notesStore.activeNote?.coverPositionY ?? 50;

  const onMouseMove = (moveEvent: MouseEvent) => {
    const deltaY = moveEvent.clientY - dragStartY.value;
    // Arrastar para baixo revela o topo da imagem (object-position diminui).
    let newY = baseY - (deltaY * 0.5);
    newY = Math.round(Math.max(0, Math.min(100, newY)));
    if (notesStore.activeNote) {
      notesStore.activeNote.coverPositionY = newY;
    }
  };

  const onMouseUp = () => {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
};

const saveReposition = async () => {
  isRepositioningCover.value = false;
  await persistHeader();
};

const cancelReposition = () => {
  isRepositioningCover.value = false;
  if (notesStore.activeNote) {
    notesStore.activeNote.coverPositionY = initialCoverY.value;
  }
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


const openTrash = () => {
  viewMode.value = 'trash';
  notesStore.fetchTrash();
};

const confirmPermanentDelete = (note: any) => {
  askConfirm({
    title: 'Apagar definitivamente',
    message: `"${note.title || 'Sem título'}" e todas as páginas dentro dela serão apagadas para sempre. Esta ação não pode ser desfeita.`,
    confirmLabel: 'Apagar',
    onConfirm: () => notesStore.permanentDelete(note.id),
  });
};

const confirmDeleteWorkspace = (ws: { id: string; name: string }) => {
  workspaceMenuOpen.value = false;
  askConfirm({
    title: 'Apagar workspace',
    message: `"${ws.name}" e TODAS as páginas dentro dele serão apagadas para sempre. Esta ação não pode ser desfeita.`,
    confirmLabel: 'Apagar',
    onConfirm: () =>
      notesStore.deleteWorkspace(ws.id).catch((err) => {
        // O backend recusa apagar o último workspace (o app precisa de um).
        console.error('Falha ao apagar workspace:', err);
      }),
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

// Selecionar qualquer nota tira o usuário da view de lixeira e encerra um
// reposicionamento em andamento (senão o modo vazava para a próxima nota).
watch(() => notesStore.activeNoteId, (id) => {
  if (id) viewMode.value = 'notes';
  isRepositioningCover.value = false;
  isHoveringCover.value = false;
});

const onKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    if (workspaceMenuOpen.value) workspaceMenuOpen.value = false;
    else if (showCreateModal.value) showCreateModal.value = false;
    else if (picker.value) picker.value = null;
    else if (confirmState.value) confirmState.value = null;
    else if (showSettings.value) showSettings.value = false;
    else if (isRepositioningCover.value) cancelReposition();
  }
};

onMounted(async () => {
  document.addEventListener('keydown', onKeyDown);
  // Workspaces primeiro: as notas são buscadas por workspace ativo.
  await notesStore.fetchWorkspaces();
  await Promise.all([notesStore.fetchAll(), notesStore.fetchTrash()]);
});

onUnmounted(() => {
  document.removeEventListener('keydown', onKeyDown);
});
</script>

<style scoped>
/* Scoped styles if necessary */
</style>
