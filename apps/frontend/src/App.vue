<template>
  <router-view />
  <!-- Vive aqui, e nao dentro de um layout: o /login nao compartilha layout
       com o resto do app. O composable ja existia com `isAlert` e promessa, mas
       o componente que o desenhava nunca foi escrito — entao ninguem o usava e
       um `confirm()` ficaria pendurado para sempre. -->
  <ConfirmDialog />

  <!-- Um menu de contexto e uma pilha de avisos para o app inteiro. Aqui, e nao
       dentro da arvore lateral: a sidebar tem overflow-y-auto e recortaria o
       popup na primeira linha visivel. -->
  <ContextMenu />
  <ToastStack />

  <!-- Fora do router-view de proposito: sobrevivem a troca de rota. -->
  <VersionBadge />
  <UpdateBanner />
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import ConfirmDialog from '@/components/ConfirmDialog.vue';
import ContextMenu from '@/components/ContextMenu.vue';
import ToastStack from '@/components/ToastStack.vue';
import UpdateBanner from '@/components/UpdateBanner.vue';
import VersionBadge from '@/components/VersionBadge.vue';

// Initialize auth state
useAuthStore();
</script>

<style>
/* Global scrollbar styling to fit the dark theme */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: var(--muted2);
}
</style>
