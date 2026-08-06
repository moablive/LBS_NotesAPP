<template>
  <div class="w-full h-full relative bg-[#0d0d0d] overflow-hidden">
    <div ref="graphContainer" class="w-full h-full"></div>
    <div v-if="loading" class="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-10">
      <span class="text-[var(--text)] text-sm">Carregando grafo...</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import ForceGraph from 'force-graph';
import { useNotesStore } from '@/stores/notes';

const props = defineProps({
  activeNoteId: {
    type: String,
    default: null
  }
});

const emit = defineEmits(['node-click']);

const graphContainer = ref<HTMLElement | null>(null);
const loading = ref(true);
let graph: any = null;
const notesStore = useNotesStore();

const initGraph = async () => {
  if (!graphContainer.value) return;

  loading.value = true;
  await notesStore.fetchLinks();

  const nodes = notesStore.notes.map((n: any) => ({
    id: n.id,
    name: n.title || 'Sem título',
    val: 1
  }));

  const links = notesStore.graphEdges.map((e: any) => ({
    source: e.sourceNoteId,
    target: e.targetNoteId
  }));

  const gData = { nodes, links };

  graph = (ForceGraph as any)()(graphContainer.value)
    .graphData(gData)
    .nodeId('id')
    .nodeLabel('name')
    .nodeColor((node: any) => {
      return node.id === props.activeNoteId ? '#5b8cff' : '#cccccc'; // Highlight color vs default gray
    })
    .nodeRelSize(4)
    .linkColor(() => '#333333') // Thin smooth lines
    .linkWidth(1)
    .onNodeClick((node: any) => {
      emit('node-click', node.id);
    })
    .backgroundColor('#0d0d0d'); // Dark background

  loading.value = false;

  // Fit to canvas
  setTimeout(() => {
    if (graph) {
      graph.zoomToFit(400, 50);
    }
  }, 500);
};

// Re-render when active note changes to update colors
watch(() => props.activeNoteId, () => {
  if (graph) {
    graph.nodeColor(graph.nodeColor());
  }
});

// Resize handler
const handleResize = () => {
  if (graph && graphContainer.value) {
    graph.width(graphContainer.value.clientWidth);
    graph.height(graphContainer.value.clientHeight);
  }
};

onMounted(() => {
  initGraph();
  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
  if (graph) {
    graph._destructor();
  }
});
</script>

<style scoped>
/* Any required scoped styles for graph */
</style>
