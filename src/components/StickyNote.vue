<template>
  <div :class="[
    'relative z-20 filter drop-shadow-md',
    rotationClass,
    customWidth
  ]">

    <div class="notebook-paper relative w-full h-full bg-[#fdfbf7] pb-8 pt-8 pr-6 pl-12 flex flex-col">
      
      <!-- Vertical red margin line -->
      <div class="absolute left-10 top-0 bottom-0 w-[1px] bg-red-300/70 z-0"></div>

      <!-- Binder holes on the left -->
      <div class="absolute left-1.5 top-6 w-3.5 h-3.5 rounded-full bg-cream-paper border border-gray-200/50 shadow-inner"></div>
      <div class="absolute left-1.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-cream-paper border border-gray-200/50 shadow-inner"></div>
      <div class="absolute left-1.5 bottom-6 w-3.5 h-3.5 rounded-full bg-cream-paper border border-gray-200/50 shadow-inner"></div>


      <!-- Note Content -->
      <div class="relative z-10 w-full flex-grow mt-2">
        <h3 class="font-handwritten text-2xl font-bold text-espresso leading-[2rem] tracking-tight">
          {{ title }}
        </h3>
        <div class="font-handwritten text-xl leading-[2rem] text-slate-700 whitespace-pre-wrap mt-[2rem]">
          <slot>
            {{ content }}
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import WashiTape from './WashiTape.vue';

const props = defineProps({
  title: {
    type: String,
    default: 'Note'
  },
  content: {
    type: String,
    default: ''
  },
  rotation: {
    type: String,
    default: 'rotate-1'
  },
  customWidth: {
    type: String,
    default: 'w-72 sm:w-80'
  }
});

const rotationClass = computed(() => {
  return props.rotation;
});
</script>

<style scoped>
.notebook-paper {
  /* Lined ruled paper effect */
  background-image: linear-gradient(transparent 95%, #cbd5e1 95%);
  background-size: 100% 2rem;
  background-position: 0 0.8rem;
  
  /* Ripped jagged bottom edge (subtle) */
  clip-path: polygon(
    0 0, 100% 0,
    100% 99%, 98% 100%, 96% 99%, 94% 100%, 92% 99%, 90% 100%, 88% 99%, 86% 100%, 
    84% 99%, 82% 100%, 80% 99%, 78% 100%, 76% 99%, 74% 100%, 72% 99%, 70% 100%, 
    68% 99%, 66% 100%, 64% 99%, 62% 100%, 60% 99%, 58% 100%, 56% 99%, 54% 100%, 
    52% 99%, 50% 100%, 48% 99%, 46% 100%, 44% 99%, 42% 100%, 40% 99%, 38% 100%, 
    36% 99%, 34% 100%, 32% 99%, 30% 100%, 28% 99%, 26% 100%, 24% 99%, 22% 100%, 
    20% 99%, 18% 100%, 16% 99%, 14% 100%, 12% 99%, 10% 100%, 8% 99%, 6% 100%, 
    4% 99%, 2% 100%, 0 99%
  );
}
</style>
