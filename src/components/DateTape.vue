<template>
  <div class="inline-block" :class="rotationClass">
    <!-- Outer shell: holds the drop-shadow (clip-path cuts box-shadow) -->
    <div
      class="relative transition-transform hover:scale-105 duration-300"
      style="filter: drop-shadow(0 4px 8px rgba(0,0,0,0.18)) drop-shadow(0 1px 3px rgba(0,0,0,0.1));"
      :style="outerStyle"
    >
      <!-- Tape Texture Overlay -->
      <div class="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply" :style="textureStyle"></div>
      
      <!-- Tape Crease/Fold line -->
      <div class="absolute inset-y-0 left-1/3 w-[1px] bg-black/10 blur-[1.5px]"></div>
      
      <!-- Packing Tape Sheen -->
      <div class="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/5 pointer-events-none"></div>

      <!-- Date Text: extra inner padding so clip-path never bites the text -->
      <span class="relative z-10 block font-caveat text-xl sm:text-2xl text-stone-900 font-bold tracking-widest select-none whitespace-nowrap drop-shadow-[0_0.5px_0.5px_rgba(255,255,255,0.3)]"
        :style="{ padding: `${innerPadY} ${innerPadX}` }"
      >
        {{ date }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  date:     { type: String, required: true },
  rotation: { type: String, default: 'rotate-1' },
  // Extra space beyond the text — tape always looks larger than the font
  paddingX: { type: String, default: '72px' },
  paddingY: { type: String, default: '14px' },
});

const rotationClass = computed(() => props.rotation);

// Inner padding adds the visual breathing room between text and jagged edges
// The clip-path eats ~5-8% on each side, so we compensate with generous padding
const innerPadX = computed(() => props.paddingX);
const innerPadY = computed(() => props.paddingY);

const outerStyle = computed(() => ({
  backgroundColor: '#C19A6B',
  backgroundImage: 'linear-gradient(110deg, #d4b494 0%, #c19a6b 45%, #b28a5a 55%, #d4b494 100%)',
  clipPath: `polygon(
    1% 4%, 10% 2%, 25% 5%, 40% 1%, 55% 4%, 70% 2%, 85% 6%, 98% 3%, 
    100% 15%, 96% 30%, 100% 45%, 97% 60%, 100% 75%, 98% 95%, 
    85% 98%, 70% 95%, 55% 99%, 40% 96%, 25% 98%, 10% 95%, 2% 99%,
    0% 75%, 4% 60%, 0% 45%, 3% 30%, 0% 15%
  )`,
}));

const textureStyle = computed(() => ({
  backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.6%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')"
}));
</script>

<style scoped>
/* No scoped clip-path needed — it's now inline in outerStyle */
</style>
