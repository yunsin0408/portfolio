<script setup>
import { ref, computed, watch, onUnmounted } from 'vue';
import WashiTape from './WashiTape.vue';

const props = defineProps({
  project: { type: Object, default: null }
});
const emit = defineEmits(['close']);

// Animation state
const caseOpen = ref(false);
const inlayOut = ref(false);
const activeMedia = ref('embed');

const close = () => {
  inlayOut.value = false;
  setTimeout(() => { caseOpen.value = false; }, 460);
  setTimeout(() => emit('close'), 900);
};

const onKey = (e) => { if (e.key === 'Escape') close(); };

watch(() => props.project, (val) => {
  if (val) {
    // staggered open
    requestAnimationFrame(() => {
      setTimeout(() => { caseOpen.value = true; }, 60);
      setTimeout(() => { inlayOut.value = true; }, 520);
    });
    // Default to embedUrl (Slides) if available, otherwise fallback to demoUrl (Video)
    activeMedia.value = val.embedUrl ? 'embed' : 'demo';
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
  } else {
    caseOpen.value = false;
    inlayOut.value = false;
    document.body.style.overflow = '';
    window.removeEventListener('keydown', onKey);
  }
}, { immediate: true });

onUnmounted(() => {
  document.body.style.overflow = '';
  window.removeEventListener('keydown', onKey);
});

const stackTechs = computed(() =>
  props.project?.stack ? props.project.stack.split(',').map(t => t.trim()) : []
);

const formatVideoUrl = (url) => {
  if (!url) return '';
  if (url.includes('youtu.be/')) {
    return url.replace('youtu.be/', 'youtube.com/embed/');
  } else if (url.includes('youtube.com/watch?v=')) {
    return url.replace('youtube.com/watch?v=', 'youtube.com/embed/');
  }
  return url;
};
</script>

<template>
  <Transition name="overlay-fade">
    <div
      v-if="project"
      class="fixed inset-0 z-200 flex items-center justify-center"
      style="background: rgba(15, 10, 5, 0.55);"
      @click.self="close"
    >
     <!-- Cork grain -->
      <div class="absolute inset-0 pointer-events-none opacity-[0.07]"
        style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E');">
      </div>

      <!-- ── STAGE ── -->
      <div class="relative flex items-start justify-center pt-1 sm:pt-6 px-4 sm:px-8 gap-4 overflow-hidden" @click.self="close">

        <!-- spinning CD -->
        <div
          class="relative shrink-0 w-[160px] h-[160px] sm:w-[220px] sm:h-[220px] mt-4 sm:mt-6 transition-all duration-700"
          :class="caseOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-75'"
        >
          <!-- Disc body -->
          <img :src="project.coverImage" alt="CD" class="w-full h-full rounded-full spinning-disk">
        </div>

        <!-- RIGHT: Fold-out inlay strip -->
        <div
          class="relative ml-0 sm:ml-4 flex-1 max-w-2xl h-[calc(100vh-5rem)]"
          :class="inlayOut ? 'inlay-open' : 'inlay-closed'"
        >
          
          <!-- Staples -->
          <div class="relative flex top-4 items-center gap-3 px-4 py-1 pt-0 pb-2 bg-[#e8e4dc] border-b border-stone-300 shrink-0">
            <div v-for="n in 3" :key="n" class="w-6 h-2 mt-3 bg-linear-to-b bg-stone-400 rounded-sm shadow-lg border border-stone-400"></div>
          </div>

          <!-- Scrollable paper -->
          <div class="overflow-y-auto h-full custom-scrollbar" style="background: linear-gradient(180deg, #fafafa 0%, #f5f3f0 100%);">

            <!-- §1 Overview -->
            <div class="px-6 sm:px-10 pt-8 pb-4">
            <div class="max-w-xl pb-5 border-b border-stone-200 fold-crease">
              
              <span class="inline-block font-mono text-[12px] font-black uppercase tracking-[0.25em] text-stone-400 border border-stone-300 px-2 py-0.5 mb-4">
                {{ project.playlistLabel || 'Project' }} · {{ project.releaseYear }} Release
              </span>

              <div class="flex items-center gap-4 mb-3 flex-wrap">
                <h1 class="font-['Lora',serif] text-3xl sm:text-4xl font-bold text-stone-800 leading-tight">
                  {{ project.title }}
                </h1>
                
                <!-- Live App prominent badge -->
                <a v-if="project.appUrl" :href="project.appUrl" target="_blank" rel="noopener" class="shrink-0 relative group inline-flex items-center justify-center px-3.5 py-1.5 bg-stone-900 border border-stone-700 rounded-full overflow-hidden shadow-[2px_3px_0_rgba(0,0,0,0.3)] hover:-translate-y-0.5 hover:shadow-[3px_4px_0_rgba(0,0,0,0.3)] transition-all active:translate-y-[2px] active:shadow-none cursor-pointer">
                  <div class="absolute inset-0 w-full h-full bg-gradient-to-tr from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
                  <span class="w-1.5 h-1.5 rounded-full bg-red-500 mr-2 shadow-[0_0_6px_#ef4444] animate-pulse"></span>
                  <span class="font-sans text-[10px] font-black text-white uppercase tracking-[0.15em] relative z-10 mt-0.5">Play Live ↗</span>
                </a>
                </div>

              <p class="font-sans text-sm text-stone-500 leading-relaxed border-l-2 border-rose-300 pl-4 ml-1 italic mb-0.5 max-w-lg">
                {{ project.subtitle || project.description }}
              </p>
            </div>
          </div>
           <!-- §2 Y2K Media Player & Input Switcher -->
            <div v-if="project.embedUrl || project.demoUrl" class="px-6 sm:px-10 py-1 mt-1 border-b border-stone-200 fold-crease">
              <div class="flex justify-between items-end mb-3">
                <h2 class="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-stone-400">— - Media - —</h2>
                
                <!-- Retro Input Source Toggle (Only shows if both media types exist) -->
                <div v-if="project.embedUrl && project.demoUrl" class="flex items-center gap-1.5 bg-stone-300 p-1 rounded border border-stone-400 shadow-inner">
                  <button @click="activeMedia = 'embed'" :class="activeMedia === 'embed' ? 'bg-stone-600 text-green-400 shadow-inner' : 'bg-stone-100 text-stone-600 shadow-sm hover:bg-stone-200'" class="font-mono text-[8px] sm:text-[9px] font-bold px-2 py-1 rounded-[2px] transition-all uppercase tracking-wider border border-stone-500">CH 1: Slides</button>
                  <button @click="activeMedia = 'demo'" :class="activeMedia === 'demo' ? 'bg-stone-600 text-green-400 shadow-inner' : 'bg-stone-100 text-stone-600 shadow-sm hover:bg-stone-200'" class="font-mono text-[8px] sm:text-[9px] font-bold px-2 py-1 rounded-[2px] transition-all uppercase tracking-wider border border-stone-500">CH 2: Video</button>
                </div>
              </div>
              
              <div class="relative rounded-sm overflow-hidden"
                style="background: linear-gradient(145deg, #d4d4d4, #a8a8a8, #e8e8e8, #b0b0b0); padding: 10px; box-shadow: 0 8px 24px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.6);">
                <div class="flex items-center justify-between px-2 py-1 mb-2" style="background: linear-gradient(to bottom, #c8c8c8, #b0b0b0);">
                  <div class="flex items-center gap-1.5">
                    <div class="w-3 h-3 rounded-full border border-stone-500 flex items-center justify-center bg-stone-200 shadow-inner">
                      <div class="w-1 h-1 rounded-full bg-stone-500"></div>
                    </div>
                    <span class="font-mono text-[12px] font-black text-stone-500 uppercase tracking-widest">DVD·PLAY</span>
                  </div>
                  <div class="w-1.5 h-1.5 rounded-full bg-[#36a25d] shadow-[0_0_4px_#4ade80] animate-pulse"></div>
                </div>
                <div class="w-full aspect-video bg-black overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.4)] border border-stone-600 relative">
                  <iframe v-if="project.embedUrl" v-show="activeMedia === 'embed'" loading="lazy" class="absolute inset-0 w-full h-full border-none" :src="project.embedUrl" allowfullscreen allow="fullscreen"></iframe>
                  <iframe v-if="project.demoUrl" v-show="activeMedia === 'demo'" loading="lazy" class="absolute inset-0 w-full h-full border-none" :src="formatVideoUrl(project.demoUrl)" allowfullscreen allow="fullscreen"></iframe>
                </div>
                <div class="flex items-center justify-center gap-3 pt-2">
                  <div v-for="n in 4" :key="n" class="w-6 h-2 rounded-sm shadow-sm border border-stone-400" style="background: linear-gradient(to bottom, #c0c0c0, #909090);"></div>
                </div>
              </div>
            </div>

            <!-- §3 Liner Notes -->
            <div class="px-6 sm:px-10 py-7 border-b border-stone-200 fold-crease">
              <h2 class="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-stone-400 mb-6">— - Notes - —</h2>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div v-if="project.problem">
                  <h3 class="font-['Lora',serif] text-base font-bold text-stone-700 mb-2">Overview</h3>
                  <p class="font-sans text-xs sm:text-sm text-stone-600 leading-relaxed">{{ project.problem }}</p>
                </div>
                <div v-if="project.approach">
                  <h3 class="font-['Lora',serif] text-base font-bold text-stone-700 mb-2">Approach</h3>
                  <p v-if="typeof project.approach === 'string'" class="font-sans text-xs sm:text-sm text-stone-600 leading-relaxed">{{ project.approach }}</p>
                  <ul v-else-if="Array.isArray(project.approach)" class="space-y-3 list-disc pl-5 marker:text-stone-400">
                    <li v-for="(item, i) in project.approach" :key="i" class="pl-1">
                      <span v-if="item.title" class="block font-sans font-bold text-stone-800 text-sm leading-none mb-1">{{ item.title }}</span>
                      <span class="block font-sans text-xs sm:text-sm text-stone-600 leading-tight">{{ typeof item === 'string' ? item : item.detail }}</span>
                    </li>
                  </ul>
                </div>
              </div>
              <!-- Tech stack vinyl stickers -->
              <div v-if="stackTechs.length">
                <h3 class="font-mono text-[16px] font-black uppercase tracking-[0.25em] text-stone-700 mb-4">Tech Stack</h3>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="tech in stackTechs" :key="tech"
                    class="vinyl-sticker inline-flex items-center px-3 py-1 rounded-full bg-white border-2 border-stone-800 text-stone-900 font-mono font-black text-[10px] uppercase tracking-widest shadow-[2px_2px_0_#1c1917] hover:-translate-y-0.5 hover:shadow-[3px_3px_0_#1c1917] transition-all duration-150 cursor-default"
                  >{{ tech }}</span>
                </div>
              </div>
            </div>

            <!-- §4 Field Report  -->
            <div v-if="project.outcome" class="px-6 sm:px-10 py-3 fold-crease">
              <h2 class="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-stone-400 py-2">— - Findings - —</h2>
              <div class="relative bg-[#ebebda] mb-2 border border-stone-200 shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-6 -rotate-[0.5deg]">
                <WashiTape color="bg-lime-700" position="top-left" rotation="-rotate-15" width="72px" class="-left-3 -top-3 opacity-35 mt-1 mr-2" />
                <p v-if="typeof project.outcome === 'string'" class="font-sans text-sm text-stone-700 leading-relaxed">{{ project.outcome }}</p>
                <div v-else-if="Array.isArray(project.outcome)">
                  <h3 v-if="project.outcome.find(item => item.heading)" class="font-['Lora',serif] text-lg font-bold text-stone-700 mb-4">
                    {{ project.outcome.find(item => item.heading).heading }}
                  </h3>
                  <ul class="space-y-3">
                    <li v-for="(item, i) in project.outcome.filter(item => !item.heading)" :key="i" class="flex gap-3 items-start">
                      <span class="shrink-0 w-5 h-5 rounded-full bg-stone-800 text-white font-mono font-black text-[9px] flex items-center justify-center mt-0.5">{{ i + 1 }}</span>
                      <div class="flex-1">
                        <span v-if="item.title" class="block font-sans font-bold text-stone-800 text-sm leading-none mb-1">{{ item.title }}</span>
                        <span class="block font-sans text-sm text-stone-600 leading-tight">{{ typeof item === 'string' ? item : item.detail }}</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Footer: Barcode + links -->
            <div class="px-6 sm:px-10 pt-4 pb-16 bg-stone-50 border-t border-stone-200">
              <div class="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
                <div class="flex flex-wrap items-end gap-x-6 gap-y-4">
                  <a v-if="project.repoUrl" :href="project.repoUrl" target="_blank" rel="noopener" @click.stop class="group relative flex flex-col items-center justify-center w-20 sm:w-24 h-10 cursor-pointer text-stone-700 hover:text-[#9a727c] transition-colors duration-300">
                    <div class="absolute inset-0 barcode-lines opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span class="relative z-10 bg-stone-50 px-1 sm:px-2 font-mono text-[15px] sm:text-[15px] font-black uppercase tracking-widest leading-none">GitHub</span>
                  </a>
                  <a v-if="project.appUrl" :href="project.appUrl" target="_blank" rel="noopener" @click.stop class="group relative flex flex-col items-center justify-center w-20 sm:w-24 h-10 cursor-pointer text-stone-700 hover:text-[#9a727c] transition-colors duration-300">
                    <div class="absolute inset-0 barcode-lines opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span class="relative z-10 bg-stone-50 px-1 sm:px-2 font-mono text-[15px] sm:text-[15px] font-black uppercase tracking-widest leading-none">App</span>
                  </a>
                  <a v-if="project.demoUrl" :href="project.demoUrl" target="_blank" rel="noopener" @click.stop class="group relative flex flex-col items-center justify-center w-20 sm:w-24 h-10 cursor-pointer text-stone-700 hover:text-[#9a727c] transition-colors duration-300">
                    <div class="absolute inset-0 barcode-lines opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span class="relative z-10 bg-stone-50 px-1 sm:px-2 font-mono text-[15px] sm:text-[15px] font-black uppercase tracking-widest leading-none">Demo</span>
                  </a>
                  <a v-if="project.pdfUrl" :href="project.pdfUrl" target="_blank" rel="noopener" @click.stop class="group relative flex flex-col items-center justify-center w-20 sm:w-24 h-10 cursor-pointer text-stone-700 hover:text-[#9a727c] transition-colors duration-300">
                    <div class="absolute inset-0 barcode-lines opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span class="relative z-10 bg-stone-50 px-1 sm:px-2 font-mono text-[15px] sm:text-[15px] font-black uppercase tracking-widest leading-none">PDF</span>
                  </a>
                  <a v-if="project.datasetUrl" :href="project.datasetUrl" target="_blank" rel="noopener" @click.stop class="group relative flex flex-col items-center justify-center w-20 sm:w-24 h-10 cursor-pointer text-stone-700 hover:text-[#9a727c] transition-colors duration-300">
                    <div class="absolute inset-0 barcode-lines opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span class="relative z-10 bg-stone-50 px-1 sm:px-2 font-mono text-[15px] sm:text-[15px] font-black uppercase tracking-widest leading-none">Dataset</span>
                  </a>
                </div>
              </div>
            </div>

          </div>
          <!-- end scrollable -->
        </div>
        <!-- end inlay -->

      </div>
      <!-- end stage -->
    </div>
  </Transition>
</template>

<style scoped>
.spinning-disk { animation: spin-slow 8s linear infinite; }
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

/* Title text counter-rotates so it stays readable */
.counter-spin { animation: counter-spin 8s linear infinite; }
@keyframes counter-spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(-360deg); }
}

.inlay-closed {
  clip-path: inset(0 0 100% 0);
  transform: translateY(-16px);
  opacity: 0;
  transition: clip-path 0.5s cubic-bezier(0.4,0,0.2,1),
              transform  0.5s cubic-bezier(0.4,0,0.2,1),
              opacity    0.25s ease;
}
.inlay-open {
  clip-path: inset(0 0 0% 0);
  transform: translateY(0);
  opacity: 1;
  transition: clip-path 0.6s cubic-bezier(0.16,1,0.3,1),
              transform  0.6s cubic-bezier(0.16,1,0.3,1),
              opacity    0.3s ease 0.1s;
}

.fold-crease { box-shadow: inset 0 -18px 18px -18px rgba(0,0,0,0.06); }

.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #d6d3d1; border-radius: 4px; }

.vinyl-sticker:active { transform: translateY(1px); box-shadow: 1px 1px 0 #1c1917; }

/* Overlay fade */
.overlay-fade-enter-active { transition: opacity 0.3s ease; }
.overlay-fade-leave-active { transition: opacity 0.4s ease 0.5s; }
.overlay-fade-enter-from,
.overlay-fade-leave-to { opacity: 0; }

.barcode-lines {
  background-image: repeating-linear-gradient(
    90deg,
    currentColor 0,
    currentColor 2px,
    transparent 2px,
    transparent 4px,
    currentColor 4px,
    currentColor 5px,
    transparent 5px,
    transparent 7px,
    currentColor 7px,
    currentColor 10px,
    transparent 10px,
    transparent 11px,
    currentColor 11px,
    currentColor 12px,
    transparent 12px,
    transparent 15px
  );
}
</style>
