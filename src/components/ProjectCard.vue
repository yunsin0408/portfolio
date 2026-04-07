<template>
  <component
    :is="slug ? 'router-link' : 'div'"
    v-bind="slug ? { to: { name: 'project-detail', params: { slug } } } : {}"
    :class="[
      'relative group block text-inherit no-underline',
      'w-[min(86vw,350px)] sm:w-[min(42vw,350px)] aspect-square',
      rotationClass,
      zIndexClass,
      'transition-all duration-300 hover:scale-105 hover:-rotate-1',
      'shadow-[8px_8px_0px_rgba(0,0,0,0.8)]',
      slug || $attrs.onClick ? 'cursor-pointer' : ''
    ]"
  >
    <!-- Jewel Case Container -->
    <div class="w-full h-full bg-[#e5e5e5] border border-gray-400 rounded-[2px] flex relative overflow-visible">
      
      <!-- Spine -->
      <div class="w-6 sm:w-8 h-full bg-stone-900 flex-shrink-0 border-r border-stone-500 flex items-center justify-center overflow-hidden shadow-[inset_-2px_0_4px_rgba(0,0,0,0.4)] z-10">
        <span class="text-stone-300 font-mono text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase transform -rotate-90 whitespace-nowrap">
          {{ spineLabel || 'ISO-2026' }}
        </span>
      </div>

      <!-- Cover Art Area -->
      <div class="flex-grow relative bg-stone-200 overflow-hidden">
        <!-- Image with vintage filter -->
        <img
          v-if="coverImage || image"
          :src="coverImage || image"
          alt="Project cover"
          class="absolute inset-0 w-full h-full object-cover filter sepia-[0.2] brightness-[0.85] contrast-[1.1]"
        />
        <div v-else class="absolute inset-0 flex items-center justify-center bg-[#D6C7B1] p-4 text-center">
          <h3 class="font-sans font-black text-3xl uppercase leading-none tracking-tighter text-stone-800 mix-blend-color-burn">
            {{ title }}
          </h3>
        </div>

        <!-- Typography & Professionalism overlaid on cover -->
        <div class="absolute bottom-0 left-0 right-0 bg-stone-900/80 backdrop-blur-md p-3 sm:p-4 border-t border-stone-600/50 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
          <h3 class="font-sans font-black text-lg sm:text-xl text-stone-100 uppercase tracking-tight leading-tight truncate">
            {{ title }}
          </h3>
          <p class="font-mono text-[10px] sm:text-xs text-stone-400 truncate mt-1">
            {{ description }}
          </p>
        </div>
      </div>

      <!-- Plastic Glare Effect -->
      <div class="absolute inset-0 pointer-events-none mix-blend-screen opacity-60 z-20 overflow-hidden">
        <!-- Diagonal glare -->
        <div class="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-tr from-transparent via-white/40 to-transparent transform rotate-45 translate-x-10 translate-y-10 group-hover:translate-x-16 transition-transform duration-700"></div>
      </div>
      
      <!-- Jewel case physical detailing -->
      <div class="absolute inset-0 pointer-events-none border-[2px] border-white/30 mix-blend-overlay z-20"></div>
      
      <!-- Left hinge indentations -->
      <div class="absolute left-6 sm:left-8 top-0 bottom-0 w-1.5 bg-gradient-to-r from-black/40 to-transparent pointer-events-none z-20"></div>
      <!-- Hinge notches -->
      <div class="absolute left-6 sm:left-8 top-4 w-3 h-12 border-y border-r border-white/20 bg-white/5 rounded-r-sm pointer-events-none z-20 shadow-[inset_1px_0_2px_rgba(0,0,0,0.3)]"></div>
      <div class="absolute left-6 sm:left-8 bottom-4 w-3 h-12 border-y border-r border-white/20 bg-white/5 rounded-r-sm pointer-events-none z-20 shadow-[inset_1px_0_2px_rgba(0,0,0,0.3)]"></div>

    </div>

    <!-- Ongoing Sticker -->
    <div v-if="status === 'Ongoing'" class="absolute -top-4 -right-4 z-30 transform rotate-3 group-hover:rotate-6 transition-all duration-300 pointer-events-none">
  <div class="relative px-5 py-2 bg-[#fdfbf7] border-[3px] border-[#1e3a8a] rounded-[55%_45%_52%_48%_/_45%_52%_48%_55%] shadow-[0_0_0_2px_#fdfbf7,3px_4px_0px_rgba(30,58,138,0.3)] 
              flex items-center justify-center">
    
    <div class="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/felt.png')] pointer-events-none"></div>
    
    <span class="relative z-10 font-sans font-black text-[#1e3a8a] text-[13px] sm:text-sm tracking-tighter uppercase 
               transform scale-y-110 scale-x-95">
      Ongoing
    </span>
  </div>
</div>

    <!-- Completed Sticker -->
     <div v-if="status === 'Completed'" class="absolute -top-4 -right-9 z-30 transform rotate-3 group-hover:rotate-3 transition-all duration-300 pointer-events-none">
  <div class="relative px-5 py-2 bg-[#fdfbf7] border-[3px] border-[#1e3a8a] rounded-[55%_45%_52%_48%/45%_52%_48%_55%] shadow-[0_0_0_2px_#fdfbf7,3px_4px_0px_rgba(30,58,138,0.3)] 
              flex items-center justify-center">
    
    <div class="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/felt.png')] pointer-events-none"></div>
    
    <span class="relative z-10 font-sans font-black text-[#1e3a8a] text-[13px] sm:text-sm tracking-tighter uppercase 
               transform scale-y-110 scale-x-95">
      Completed
    </span>
  </div>
</div>

    <!-- Random Washi Tape -->
    <WashiTape v-if="hasWashi" position="top" rotation="-rotate-3" width="70px" class="-top-3 left-1/3 opacity-80 mix-blend-multiply z-30 filter sepia-[0.2]" />

  </component>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue';
import WashiTape from './WashiTape.vue';

const props = defineProps({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  image: { type: String, default: '' },
  coverImage: { type: String, default: '' },
  status: { type: String, default: '' },
  spineLabel: { type: String, default: '' },
  slug: { type: String, default: '' },
  rotation: { type: String, default: 'rotate-0' },
  zIndex: { type: Number, default: 10 }
});

const rotationClass = computed(() => props.rotation);
const zIndexClass = computed(() => `z-${props.zIndex}`);

// Randomly decide if this case has tape
const hasWashi = ref(false);
onMounted(() => {
  hasWashi.value = Math.random() > 0.5;
});
</script>

<style scoped>
</style>
