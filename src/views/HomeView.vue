<script setup>
import { ref } from "vue";
import StickyNote from "../components/StickyNote.vue";
import WashiTape from "../components/WashiTape.vue";
import GitHubStats from "../components/GitHubStats.vue";
import NowPlayingGallery from "../components/NowPlayingGallery.vue";
import PaperClip from "../components/PaperClip.vue";
import CDInlayOverlay from "../components/CDInlayOverlay.vue";
import { projectsData } from "../data/projects";
import { imageUrl } from "../utils/imageUrl";

const projects = Object.values(projectsData);

const selectedProject = ref(null);
const openProject = (project) => { selectedProject.value = project; };
const closeOverlay = () => { selectedProject.value = null; };

const insightsText = `Hyperbolic embeddings capture hierarchical structures better than Euclidean space in low dimensions. By mapping tree-like datasets into a Poincaré ball, I'm currently exploring how we can leverage it for real-world applications! 📈✨`;
const publications = [
  {
    title: "A study on the application of artificial intelligence in technical documentation",
    venue: "SNAME 2026, Tainan",
    authors: "J. C. Liu, J. P. Wang, H. T. Lu, Y. S. Hung, Y. J. Chen, Y. C. Hwang, & Y. X. Luo."
  },
  {
    title: "Constructing an experimental baseline for multi-agent economic question answering",
    venue: "ICAISS 2025, Taipei",
    authors: "Hsu, K. H. K., Sabbat, J. N., Hung, C. Y. S., & Lu, O. H. T."
  }
];

</script>

<template>
  <main class="overflow-x-hidden pt-14 sm:pt-16 -mt-4 sm:-mt-8">
   <!-- Punched Binder Holes -->
    <div class="fixed top-0 bottom-0 left-2 sm:left-4 md:left-8 w-8 sm:w-10 border-r-2 border-[#eeebe4] flex flex-col items-center justify-around py-20 z-0">
      <div v-for="n in 8" :key="n" class="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#e8e4db] shadow-[inset_1px_1px_4px_rgba(0,0,0,0.05)] border border-[#edeae1]"></div>
    </div>
    
    <!-- Hero Header / Intro -->
    <section class="max-w-5xl mx-auto mb-24 mt-12 relative flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 px-4">

      <!-- Intro Text -->
      <div class="text-center md:text-left bg-white p-8 md:p-12 shadow-note relative z-10 w-full max-w-2xl transform -rotate-1 rounded-sm">
        <WashiTape position="top-left" rotation="-rotate-6" width="100px" class="-left-4 -top-3" />
        <WashiTape position="bottom-right" rotation="rotate-3" width="90px" class="-right-4 -bottom-3 opacity-80" />
        
        <p class="font-handwritten text-sunset-pink text-3xl mb-3 decorator-line inline-block">Hi! I'm Cindy (@yunsin0408)</p>
        <h1 class="font-sans text-4xl md:text-4xl font-black text-espresso leading-tight tracking-tight mb-3 mt-2">
          Building Innovative AI Solutions for Social Sustainability 🌎 🌱
        </h1>
        <p class="font-handwritten text-xl md:text-2xl text-gray-700 leading-relaxed">
          I'm a third-year undergraduate passionate about data science, 
          Generative AI, and sustainable development.
        </p>
      </div>

      <!-- Profile Picture  -->
      <div class="relative z-20 w-[min(86vw,22rem)] md:w-[min(36vw,25rem)] origin-bottom transform rotate-3 shrink-0 bg-white p-4 shadow-note hover:-rotate-1 transition duration-500 rounded-sm">
        <img
          :src="imageUrl('lemon_hk.png')"
          alt=""
          class="pointer-events-none select-none absolute -top-13 -right-12 w-25 md:w-32 rotate-10 drop-shadow-md"
        />
        <WashiTape position="top" rotation="-rotate-3" width="120px" />
        <img :src="imageUrl('me.jpeg')" alt="Cindy snapshot" class="w-full aspect-5/4 object-cover object-[center_80%] border border-gray-100 bg-gray-50" />
        <p class="font-handwritten text-center text-sunset-pink text-2xl mt-4 font-bold">That's me!</p>
      </div>
    </section>

    <!-- Scrapbook Canvas layout -->
    <section class="max-w-6xl mx-auto relative flex flex-wrap justify-center items-start gap-12 sm:gap-16">
      <!-- Insights and Stats Scrapbook Cluster -->
      <div class="flex flex-col items-center justify-center gap-12 w-full mt-10 md:px-4">

        <!-- Top Row: GitHub ID, Contributions, Tech Stack Tracking -->
        <div class="flex flex-col xl:flex-row items-center justify-center gap-10 xl:gap-12 w-full max-w-7xl -mt-16 md:-mt-18">
          
          <!-- GitHub Stats polaroid (Left) -->
          <a href="https://github.com/yunsin0408" target="_blank" class="relative z-30 w-auto transform rotate-2 shrink-0 bg-cream-paper p-3 shadow-note hover:-rotate-1 hover:scale-105 transition duration-500 rounded-sm border border-gray-100 cursor-pointer block">
            <WashiTape position="top-left" rotation="rotate-155" width="72px" class="-left-3 -top-2 opacity-90" />
            <GitHubStats />
          </a>

          <!-- GitHub Contributions Streak (Middle) -->
          <div class="relative z-10 w-full md:w-auto transform -rotate-1 shrink-0 bg-cream-paper p-2.5 shadow-note hover:rotate-1 transition duration-500 rounded-sm border border-gray-100 mt-6 xl:mt-0">
            <WashiTape color="bg-pink-200/50" position="top-left" rotation="rotate-155" width="84px" class="-left-4 -top-2 opacity-90" />
            <WashiTape color="bg-pink-200/50" position="bottom-right" rotation="-rotate-3" width="72px" class="-right-3 -bottom-3 opacity-85" />
            <img 
              src="https://github-readme-streak-stats.herokuapp.com/?user=yunsin0408&hide_border=true&background=fdfaf1&ring=f9c6d3&sideLabels=6f4e37&currStreakLabel=6f4e37&dates=6f4e37&fire=f9c6d3" 
              alt="GitHub Contributions" 
              class="w-full sm:w-[min(92vw,500px)] xl:w-[min(36vw,450px)] object-contain"
            />
          </div>

          <!-- Tech Stack Polaroid (Right) -->
          <div class="relative z-20 w-auto transform rotate-1 shrink-0 bg-white p-3 shadow-note hover:-rotate-1 transition duration-500 rounded-sm border border-gray-100 mt-6 xl:mt-0">
            <WashiTape color="bg-pink-200/50" position="top" rotation="-rotate-1" width="106px" class="-top-2 opacity-90" />
            <h3 class="font-handwritten text-center text-sunset-pink text-3xl mb-4 mt-2 font-bold decoration-wavy underline decoration-muted-orange underline-offset-4">Tech Stack</h3>
            <img 
              src="https://skillicons.dev/icons?i=python,java,vue,js,html,css,spring,docker,mysql&perline=3" 
              alt="My Tech Stack" 
              class="w-[min(56vw,200px)] object-contain rounded-md bg-[#fdfaf1]/50 p-2"
            />
          </div>
        </div>

        <!-- Middle Row: Current Research Project -->
        <div class="flex justify-center w-full mt-4 mb-2">
          <!-- Sticky Note overlapping -->
          <StickyNote 
  title="Research Interests 🧠" 
  rotation="-rotate-2" 
  custom-width="w-full max-w-xl md:max-w-2xl" 
  class="mb-5 z-500 min-h-75 transform hover:scale-105 transition-transform "
>
  <template #decorations>
    <PaperClip position="top-right" rotation="rotate-12" class="-right-6 -top-10" />
  </template>            
  
  <p class="font-handwriting text-xl text-espresso leading-snug mb-7">
    {{ insightsText }}
  </p>

  <div class="space-y-2">
    <p class="text-xl uppercase tracking-widest text-gray-600 font-bold mb-1">Latest Publications</p>
    <div v-for="(pub, index) in publications" :key="index">
      <p class="text-xl font-handwritten mb-1 italic text-gray-800">
        "{{ pub.title }}"
      </p>
      <p class="text-[15px] text-gray-500  font-handwritten">
        {{ pub.authors }} — {{ pub.venue }}
      </p>
    </div>
  </div>
</StickyNote>
        </div>

      </div>

      <!-- Now Playing Project Gallery -->
      <div class="w-full mb-8 px-4 flex justify-center">
        <NowPlayingGallery :projects="projects" @select-project="openProject" />
      </div>
      
    </section>

    <div class="flex justify-center mt-30 relative">
      <h2 class="font-handwritten text-4xl text-coffee-brown underline decoration-wavy decoration-muted-orange underline-offset-4 z-10">
        Let's Connect!
      </h2>
    </div>

    <!-- CD Inlay Overlay -->
    <CDInlayOverlay :project="selectedProject" @close="closeOverlay" />

  </main>
</template>

<style scoped>
.decorator-line {
  display: inline-block;
  border-bottom: 2px dashed #f1bdcaff;
}
</style>
