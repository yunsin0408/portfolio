<template>
  <div class="relative w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-12 lg:gap-16 bg-cream-paper p-6 sm:p-10 lg:p-12 shadow-note rounded-sm border border-gray-100 transform -rotate-1 items-center mt-8 z-20">
    
    <!-- Physical Scrapbook Anchors -->
    <WashiTape position="top-left" rotation="-rotate-3" width="130px" class="-top-5 -left-8" hidden sm:block/>
    <WashiTape position="bottom-right" rotation="rotate-2" width="110px" class="-bottom-5 -right-6 opacity-80"hidden sm:block />

    <!-- Musical Elements & Floating SVGs -->
    
    <!-- Double Music Note -->
    <svg class="absolute -top-12 left-1/3 w-12 h-12 text-sunset-pink transform -rotate-12 opacity-80 filter drop-shadow-sm" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
    </svg>
    <!-- Single Music Note -->
    <svg class="absolute bottom-10 -left-8 w-10 h-10 text-coffee-brown transform rotate-12 opacity-70 filter drop-shadow-sm" viewBox="0 0 24 24" fill="currentColor">
      <path d="M9 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3H9z"/>
    </svg>
    <!-- Retro Sparkle Star 1 -->
    <svg class="absolute -bottom-6 left-[60%] w-8 h-8 text-muted-orange transform -rotate-6 opacity-90 filter drop-shadow-sm z-30" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L14.6 9.4L22 12L14.6 14.6L12 22L9.4 14.6L2 12L9.4 9.4L12 2Z"/>
    </svg>
    <!-- Retro Sparkle Star 2 -->
    <svg class="absolute top-10 right-12 w-6 h-6 text-sunset-pink transform rotate-12 opacity-70 filter drop-shadow-sm" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L14.6 9.4L22 12L14.6 14.6L12 22L9.4 14.6L2 12L9.4 9.4L12 2Z"/>
    </svg>

    <!-- iPod Classic Shell -->
    <div class="w-3/4 max-w-[260px] md:max-w-[300px] lg:max-w-[320px] md:w-1/3 flex-shrink-0 relative bg-gradient-to-br from-gray-100 to-gray-300 p-4 sm:p-5 shadow-lg border-4 border-gray-50 transform rotate-2 rounded-[2.5rem] flex flex-col items-center gap-6 pb-8 mx-auto md:mx-0">
      
      <!-- iPod Screen Window -->
      <div class="w-full aspect-[4/3] bg-gray-900 rounded-lg p-1.5 shadow-inner flex flex-col border-2 border-gray-800 relative z-10 overflow-hidden">
        
        <!-- iPod Digital Status Bar -->
        <div class="w-full flex justify-between items-center px-1.5 mb-1.5 mt-0.5 text-white opacity-90">
          <!-- Play Icon -->
          <svg class="w-3 h-3 animate-pulse text-[#4ade80]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
          <span class="font-sans text-[9px] font-bold tracking-widest uppercase">Now Playing</span>
          <!-- Battery Icon -->
          <div class="w-6 h-3 border border-white rounded-[1px] p-[1px] relative flex">
            <div class="w-[80%] h-full bg-white"></div>
            <div class="absolute -right-[2px] top-1/2 -translate-y-1/2 w-[1px] h-1 bg-white"></div>
          </div>
        </div>

        <!-- iPod Screen Canvas  -->
        <div class="w-full flex-grow relative bg-white overflow-hidden rounded-[2px] border border-gray-700 shadow-inner">
          <Transition name="fade" mode="out-in">
            <img 
              v-if="activeProject.image" 
              :key="activeProject.slug"
              :src="activeProject.image" 
              alt="Project Screenshot"
              class="absolute inset-0 w-full h-full object-cover filter contrast-[1.02] bg-gray-100"
            />
            <div v-else :key="'placeholder-'+activeProject.slug" class="absolute inset-0 w-full h-full bg-[#f4ebe1] flex items-center justify-center font-handwritten text-3xl sm:text-4xl text-espresso/40 text-center px-4 leading-none">
               {{ activeProject.title }}
            </div>
          </Transition>
        </div>
      </div>

      <!-- iPod Click Wheel -->
      <div class="w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-white shadow-md flex items-center justify-center relative border border-gray-200/60 mt-2 hover:scale-[1.02] transition-transform duration-500">
        <span class="absolute top-4 font-sans text-[10px] sm:text-[11px] font-black tracking-wider text-gray-400">MENU</span>
        
        <!-- Play / Pause -->
        <div class="absolute bottom-4 flex gap-0.5 text-gray-400">
          <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg> 
          <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
        </div>
        
        <!-- Prev / Rewind -->
        <div class="absolute left-3 sm:left-4 flex text-gray-400">
          <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z"/></svg>
        </div>
        
        <!-- Next / Fast Forward -->
        <div class="absolute right-3 sm:right-4 flex text-gray-400">
          <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"/></svg>
        </div>
        
        <!-- Center Action Button -->
        <div class="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gray-200/80 shadow-inner border border-gray-300"></div>
      </div>
      
    </div>

    <!-- The Playlist -->
    <div class="w-full md:flex-1 flex flex-col pt-4 md:pt-0">
      
      <div class="flex items-center justify-between mb-6 pl-2">
        <h2 class="font-handwritten text-5xl text-espresso font-bold underline decoration-wavy decoration-sunset-pink underline-offset-4 pointer-events-none">
          Project Playlist
        </h2>
        <span class="font-sans text-xs font-bold tracking-widest text-sunset-pink opacity-80 uppercase bg-sunset-pink/10 px-3 py-1 rounded-full pointer-events-none">
          {{ projects.length }} Tracks
        </span>
      </div>

      <!-- Scrollable Tracklist -->
      <ul class="flex-grow overflow-y-auto pr-2 custom-scrollbar flex flex-col gap-1.5 max-h-[380px] md:max-h-[450px]">
        <li 
          v-for="(project, index) in projects" 
          :key="project.slug"
          @mouseenter="activeProject = project"
          @click="$emit('select-project', project)"
          class="group flex flex-col p-3 sm:p-4 rounded-md transition-all duration-300 relative border cursor-pointer no-underline"
          :class="activeProject.slug === project.slug 
            ? 'bg-white shadow-sm border-gray-200 transform scale-[1.01] z-10' 
            : 'hover:bg-white/50 border-transparent'"
        >
          <!-- Track Info -->
          <div class="flex items-start gap-4 relative w-full">
            
            <!-- Track Number / Play Equalizer Icon -->
            <div class="w-6 flex-shrink-0 pt-0.5 text-right font-sans font-bold text-sm text-gray-400 transition-colors">
              <span v-if="activeProject.slug !== project.slug" class="group-hover:hidden">
                {{ String(index + 1).padStart(2, '0') }}
              </span>
              <!-- Equalizer / Play Icon for active track -->
              <svg v-else class="w-5 h-5 ml-auto text-sunset-pink mt-0.5 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
              <!-- Hover specific "Play" icon -->
              <svg v-show="activeProject.slug !== project.slug" class="w-5 h-5 ml-auto text-muted-orange hidden group-hover:block mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>

            <!-- Track Metadata -->
            <div class="flex-grow">
              <h3 class="font-sans font-black text-lg text-espresso tracking-tight leading-tight group-hover:text-sunset-pink transition-colors">
                {{ project.title }}
              </h3>
              <p class="font-sans text-sm text-gray-500 line-clamp-2 mt-1.5 leading-relaxed">
                <span class="font-bold text-gray-800 mr-1 text-[11px] uppercase tracking-wider bg-gray-100 px-1.5 py-0.5 rounded-sm">{{ project.playlistLabel || 'Project' }}</span> 
                {{ project.description }}
              </p>
            </div>
            
          </div>
        </li>
      </ul>
      
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import WashiTape from './WashiTape.vue';

const props = defineProps({
  projects: {
    type: Array,
    required: true
  }
});

defineEmits(['select-project']);

// Default the 'Now Playing' screen to the first track in the playlist
const activeProject = ref(props.projects[0]);

// Watch for prop updates
watch(() => props.projects, (newProjects) => {
  if (newProjects && newProjects.length > 0) {
    activeProject.value = newProjects[0];
  }
});
</script>

<style scoped>

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  will-change: opacity, transform;
}

.fade-enter-from {
  opacity: 0;
  transform: scale(0.97);
}

.fade-leave-to {
  opacity: 0;
  transform: scale(1.03);
}

/* scrollbar for the tracklist */
.custom-scrollbar::-webkit-scrollbar {
  width: 5px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #e2e8f0;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: #cbd5e1;
}
</style>
