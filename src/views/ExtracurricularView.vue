<script setup>
import { ref } from 'vue';
import { extracurricularsData } from '../data/extracurriculars';

import EventCard from '../components/EventCard.vue';


const extracurriculars = ref(extracurricularsData);
</script>

<template>
  <main class="min-h-screen font-sans bg-transparent overflow-x-hidden relative">
    <div class="max-w-4xl mx-auto relative z-10 text-center mb-10 pt-13 px-4">
      <h1 class="font-caveat text-7xl sm:text-7xl text-stone-600 font-bold drop-shadow-sm">Extracurriculars</h1>
      <p class="font-serif text-stone-400 font-bold text-base sm:text-base tracking-widest ">Outside the classroom...</p>
    </div>


    <div class="relative z-10 flex flex-col gap-15 max-w-5xl mx-auto px-4 pb-12">
      <EventCard
        v-for="item in extracurriculars"
        :key="item.id"
        :item="item"
      />
    </div>
  </main>
</template>
