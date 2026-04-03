<template>
  <div class="absolute z-50 pointer-events-none" :class="[rotation, positionClasses]">
    <!-- Realistic SVG Paperclip -->
    <svg 
      width="36" 
      height="80" 
      viewBox="0 0 36 80" 
      xmlns="http://www.w3.org/2000/svg" 
      class="drop-shadow-lg opacity-95"
    >
      <path 
        d="M 23 20 
           V 60 
           A 9 9 0 0 1 5 60 
           V 16 
           A 14 14 0 0 1 33 16 
           V 56 
           A 4 4 0 0 1 25 56 
           V 28" 
        stroke="#94a3b8" 
        stroke-width="3.5" 
        fill="none" 
        stroke-linecap="round"
      />
      <!-- Inner specular shine -->
      <path 
        d="M 23 20 
           V 60 
           A 9 9 0 0 1 5 60 
           V 16 
           A 14 14 0 0 1 33 16 
           V 56 
           A 4 4 0 0 1 25 56 
           V 28" 
        stroke="#f1f5f9" 
        stroke-width="1.5" 
        fill="none" 
        stroke-linecap="round"
      />
    </svg>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  position: {
    type: String,
    default: 'top-right'
  },
  rotation: {
    type: String,
    default: 'rotate-12'
  }
});

const positionClasses = computed(() => {
  switch (props.position) {
    case 'top-left':
      return '-top-8 -left-3';
    case 'top-right':
      return '-top-8 -right-3';
    case 'right-center':
      return 'top-1/2 -right-4 -translate-y-1/2';
    case 'left-center':
      return 'top-1/2 -left-4 -translate-y-1/2';
    default:
      return '-top-8 -right-3';
  }
});
</script>
