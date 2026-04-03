<script setup>
import { ref } from 'vue';
import { projectsData } from '../data/projects';
import ProjectCard from '../components/ProjectCard.vue';
import WashiTape from '../components/WashiTape.vue';
import CDInlayOverlay from '../components/CDInlayOverlay.vue';

const projects = Object.values(projectsData);
const hoveredProject  = ref(null);
const selectedProject = ref(null);

const openProject = (project) => { selectedProject.value = project; };
const closeOverlay = () => { selectedProject.value = null; };

const getScatterClass = (index) => {
  const variations = [
    'rotate-1 sm:translate-y-0',
    '-rotate-1 sm:translate-y-4',
    'rotate-2 sm:translate-y-2',
    '-rotate-2 sm:translate-y-5',
    'rotate-1 sm:translate-y-1',
    '-rotate-1 sm:translate-y-3',
  ];
  return `transform ${variations[index % variations.length]}`;
};
</script>

<template>
  <main class="min-h-screen py-5 px-4 sm:px-8 md:px-16 w-full relative overflow-x-hidden font-sans text-stone-700"
  >

    <!--  HEADER  -->
    <div class="max-w-7xl mx-auto relative z-10 mt-2 mb-20">
      <!-- Desktop -->
      <div class="hidden sm:inline-block border-l-4 border-amber-800/40 pl-5 bg-[#e8d5b0]/70 shadow-[4px_4px_12px_rgba(0,0,0,0.12)] p-4 backdrop-blur-sm rounded-sm -rotate-1">
        <h1 class="font-serif text-4xl sm:text-4xl text-amber-900 font-bold mb-1">Record Store</h1>
        <p class="font-serif text-amber-800/70 font-bold text-lg sm:text-lg tracking-widest">Browse my projects - click on any of the jewel cases for more information!</p>
      </div>
      <!-- Mobile -->
      <div class="sm:hidden text-center py-4 px-6 bg-[#e8d5b0]/70 shadow-sm backdrop-blur-sm border-y border-amber-800/20 rounded-sm">
        <h1 class="font-serif text-4xl text-amber-900 font-bold mb-1">Record Store</h1>
        <p class="text-[10px] text-amber-800/60 font-bold tracking-widest uppercase">Hover cases to slide open</p>
      </div>
    </div>

    <!--  ALL PROJECTS GRID  -->
    <section class="max-w-7xl mx-auto mt-10 pb-48 relative z-10">

      <!-- Decorative Scrapbook Stickers -->

      <div class="absolute top-[40%] right-[3%] sm:right-[5%] w-10 h-10 sm:w-12 sm:h-12 text-rose-400 opacity-60 transform rotate-45 z-0 drop-shadow-sm hidden md:block pointer-events-none">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L14.6 9.4L22 12L14.6 14.6L12 22L9.4 14.6L2 12L9.4 9.4L12 2Z"/></svg>
      </div>
      
      <div class="absolute bottom-[30%] -right-[3%] z-0 hidden sm:block pointer-events-none">
        <WashiTape color="bg-blue-200/60" rotation="rotate-6" width="90px" height="70px"/>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 md:gap-x-10 xl:gap-x-14 gap-y-20 md:gap-y-24 justify-items-center">
        <ProjectCard
          v-for="(project, index) in projects"
          :key="project.slug"
          :title="project.title"
          :description="project.description"
          :coverImage="project.coverImage"
          :status="project.status"
          :spineLabel="project.spineLabel || (project.slug ? `ISO-${project.releaseYear || '2026'}` : '')"
          :rotation="getScatterClass(index)"
          :zIndex="project.projectsViewZIndex || 10"
          @mouseenter="hoveredProject = project"
          @mouseleave="hoveredProject = null"
          @click="openProject(project)"
          :class="{
            'transition-all duration-500': selectedProject,
            'opacity-20 blur-sm scale-90': selectedProject && selectedProject.slug !== project.slug,
            'scale-110 z-50!': selectedProject && selectedProject.slug === project.slug
          }"
        />
      </div>
      <!-- End Grid -->

    </section>

    <!-- NOW PLAYING BAR -->
    <div
      class="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/70 backdrop-blur-xl border border-white/80 rounded-full p-2 px-4 sm:px-6 w-[90%] sm:w-[80%] max-w-2xl z-50 shadow-[0_15px_40px_rgba(0,0,0,0.12)] flex items-center justify-between transition-all duration-500 pointer-events-none"
      :class="hoveredProject ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'"
    >
      <div class="flex-1 flex flex-col justify-center overflow-hidden mr-4">
        <p class="font-sans text-[8px] sm:text-[9px] text-rose-400 font-bold uppercase tracking-[0.3em] mb-0.5 flex items-center gap-2">
          <span class="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse"></span> CD Player Active
        </p>
        <div class="px-1 overflow-hidden">
          <h3 class="font-sans text-xs sm:text-sm text-stone-700 font-black truncate">{{ hoveredProject?.title || '' }}</h3>
          <p class="font-sans text-[10px] sm:text-xs text-stone-500 font-medium truncate">{{ hoveredProject?.description || '' }}</p>
        </div>
      </div>
      <div class="shrink-0 flex items-center gap-2 sm:gap-3 border-l border-stone-200 pl-2 sm:pl-4 pointer-events-auto">
        <button class="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-stone-100/80 border border-stone-200 shadow-[inset_0_2px_4px_rgba(255,255,255,0.8),0_2px_5px_rgba(0,0,0,0.05)] flex items-center justify-center hover:bg-white transition-colors" aria-label="Play">
          <div class="w-0 h-0 border-t-5 border-t-transparent border-l-8 border-l-stone-400 border-b-5 border-b-transparent ml-1"></div>
        </button>
        <button class="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-stone-100/80 border border-stone-200 shadow-[inset_0_2px_4px_rgba(255,255,255,0.8),0_2px_5px_rgba(0,0,0,0.05)] flex items-center justify-center hover:bg-white transition-colors" aria-label="Skip">
          <div class="flex items-center">
            <div class="w-0 h-0 border-t-4 border-t-transparent border-l-6 border-l-stone-400 border-b-4 border-b-transparent"></div>
            <div class="w-0.5 h-2 bg-stone-400 rounded-full"></div>
          </div>
        </button>
      </div>
    </div>

    <!-- CD Inlay Overlay -->
    <CDInlayOverlay :project="selectedProject" @close="closeOverlay" />

  </main>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 3px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #d6d3d1; border-radius: 4px; }

.spinning-disk { animation: spin-slow 8s linear infinite; }
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
</style>
