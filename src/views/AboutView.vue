<script setup>
import { ref } from 'vue';
import { aboutData } from '../data/about';
import WashiTape from '../components/WashiTape.vue';
import DateTape from '../components/DateTape.vue';

// Flippable Polaroid Stack State
const stack = ref([...aboutData.photos]);
const isFlipping = ref(false);
const FLIP_DURATION_MS = 850;

const flipNext = () => {
  if (stack.value.length < 2 || isFlipping.value) return;
  isFlipping.value = true;
  // Shift top photo out and push it to the back of the queue
  const top = stack.value.shift();
  stack.value.push(top);
  setTimeout(() => {
    isFlipping.value = false;
  }, FLIP_DURATION_MS);
};
</script>

<template>
  <main class="min-h-screen py-12 px-2 sm:px-8 flex flex-col items-center bg-transparent w-full relative overflow-x-hidden text-stone-700">
    
    <!-- Punched Binder Holes -->
    <div class="fixed top-0 bottom-0 left-2 sm:left-4 md:left-8 w-8 sm:w-10 border-r-2 border-[#eeebe4] flex flex-col items-center justify-around py-20 z-0">
      <div v-for="n in 8" :key="n" class="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#e8e4db] shadow-[inset_1px_1px_4px_rgba(0,0,0,0.05)] border border-[#edeae1]"></div>
    </div>

    <!-- Main Content Container Wrapper -->
    <div class="relative z-10 w-full max-w-7xl pl-12 sm:pl-16 md:pl-20 pr-2 sm:pr-4 mt-4">
      
      <!-- HEADER: Horizontal Polaroid Slideshow & Shrunken Intro -->
      <section class="mb-32 flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 lg:gap-12">
        
        <!-- Profile Intro Strings  -->
          <div class="flex-1 space-y-4 lg:mt-8 mb-3 mr-0 lg:mr-5 text-left min-w-0">
           <h1 class="font-caveat mb-3 text-5xl sm:text-6xl lg:text-7xl text-stone-600 font-bold -rotate-2 relative inline-block z-10 w-full leading-tight">
             {{ aboutData.profile.name }}
          </h1>
           <h2 class="font-sans mt-1 text-base sm:text-lg font-bold text-stone-500 tracking-[0.12em] sm:tracking-[0.15em] uppercase border-l-4 border-rose-300 pl-3 inline-block whitespace-pre-line leading-relaxed">
             {{ aboutData.profile.subtitle }}
          </h2>
           <p class="w-full mt-3 font-serif text-sm sm:text-base lg:text-lg text-stone-600 leading-relaxed font-medium max-w-2xl text-justify">
             {{ aboutData.profile.bio }}
          </p>
        </div>

        <!-- Horizontal Polaroid Component  -->
        <div class="relative w-full max-w-130 aspect-5/4 sm:aspect-4/3 lg:aspect-5/4 shrink-0 mt-8 lg:mt-0" @click="flipNext" role="button" :class="isFlipping ? 'pointer-events-none' : 'pointer-events-auto'">
          <!-- indication text  -->
          <span class="absolute -top-10 right-4 font-caveat text-lg sm:text-xl text-yellow-900 font-bold rotate-7">Flip through! ⤵</span>
          
          <TransitionGroup name="polaroid" tag="div" class="relative w-full h-full perspective-1000">
            <div 
              v-for="(photo, index) in stack" 
              :key="photo.id"
              class="absolute inset-0 bg-[#FDFBF7] p-2.5 sm:p-3.5 pb-8 sm:pb-12 lg:pb-14 shadow-[0_10px_30px_-8px_rgba(0,0,0,0.1)] border border-stone-200 transform transition-all duration-[850ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] will-change-transform flex flex-col items-center justify-start cursor-pointer origin-bottom-right"
              :class="index === 0 ? '-rotate-1 z-30 opacity-100 scale-100' : (index === 1 ? 'rotate-6 z-20 scale-[0.98] opacity-90 translate-x-3 translate-y-2' : '-rotate-2 scale-[0.95] opacity-60 translate-x-6 translate-y-4')"
            >
              <!-- Photo Image Inner Border -->
              <div class="w-full h-full bg-stone-100 shadow-[inset_0_2px_8px_rgba(0,0,0,0.05)] overflow-hidden border border-stone-200 pointer-events-none">
                <img :src="photo.src" class="w-full h-full object-cover opacity-[0.95] filter contrast-[1.05]" :alt="photo.caption" />
              </div>
              <!-- Caption -->
              <p class="absolute bottom-1.5 sm:bottom-2 lg:bottom-3 font-caveat text-2xl text-stone-600 font-bold text-center w-full">{{ photo.caption }}</p>
            </div>
          </TransitionGroup>
        </div>
      </section>

        <div class="flex items-center gap-3 mb-10 -rotate-2">
          <h1 class="font-handwritten mt-1 text-5xl underline decoration-solid decoration-stone-400 text-stone-700 font-bold relative z-10">My Journey So Far</h1>
          <img src="/stickers/plane.svg" alt="" class=" ml-7 mt-2 w-16 h-16 rotate-12 drop-shadow-md pointer-events-none select-none translate-y-1" />
        </div>
        <!-- BODY: The Roadmap Timeline -->
        <section class="relative w-full pb-32 pt-12 max-w-5xl mx-auto">
        <!-- Center Timeline Spine (Hand-drawn) -->
        <svg 
        class="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-3 z-20 hidden md:block h-full" 
        viewBox="0 0 3 100" 
        preserveAspectRatio="none" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M 1.5 0 C 0.5 15, 2.5 25, 1.5 30 C 0.5 45, 2.5 55, 1.5 60 C 0.5 75, 2.5 85, 1.5 100"
          class="stroke-[#6b625b]" 
          stroke-width="2"
          stroke-linecap="round"
          vector-effect="non-scaling-stroke"
        />
      </svg>
        <!-- Mobile Left-bound Spine -->
        <svg class="absolute top-0 bottom-0 left-8 w-3 z-30 md:hidden" preserveAspectRatio="none" aria-hidden="true">
            <path d="M 1.5 0 V 60 C 1.5 80, -1.5 100, 1.5 120 C 1.5 140, 4.5 160, 1.5 180 V 240 C 1.5 260, -1.5 280, 1.5 300 C 1.5 320, 4.5 340, 1.5 360 V 420 C 1.5 440, -1.5 460, 1.5 480 C 1.5 500, 4.5 520, 1.5 540 V 600 C 1.5 620, -1.5 640, 1.5 660 C 1.5 680, 4.5 700, 1.5 720 V 780 C 1.5 800, -1.5 820, 1.5 840 C 1.5 860, 4.5 880, 1.5 900 V 10000" stroke="#6b625b" stroke-width="3" stroke-linecap="round" fill="none"></path>
        </svg>

        <div class="space-y-12 sm:space-y-20 relative z-10 w-full flex flex-col items-center mt-6">
          
          <div v-for="(item, index) in aboutData.roadmap" :key="item.id" class="w-full relative flex flex-col md:flex-row items-center md:justify-between group gap-6 md:gap-0" :class="index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'">
            
            <!-- Nodes & Stamps -->
            <div class="flex items-center md:hidden pl-2">
              <div class="w-1/2 h-1/2 rounded-full bg-rose-700 border-2 border-[#fff7f5] shadow-sm z-10 mr-4 relative left-2" :class="index % 2===0 ? 'rotate-3':'-rotate-6'"></div>
              <DateTape :date="item.date" :rotation="item.rotation || (index % 2 === 0 ? 'rotate-3' : '-rotate-3')" class="opacity-90" />
            </div>

            <!-- Content Card Side -->
            <div class="w-[90%] md:w-[45%] flex transition-all duration-500 hover:-translate-y-1 hover:scale-[1.01] cursor-default z-20" :class="index % 2 === 0 ? 'md:justify-end pr-0 md:pr-4' : 'md:justify-start pl-0 md:pl-4'">
              
              <!-- TORN PAPER TYPE -->
              <div v-if="item.type === 'torn-paper'" class="w-full max-w-100 p-5 sm:p-6 shadow-sm rotate-4 relative border border-stone-100" style="clip-path: polygon(0% 0%, 100% 2%, 98% 100%, 2% 98%); border-radius: 2px; background-color: #e0f2fe; background-image: repeating-linear-gradient(transparent, transparent 23px, rgba(255,255,255,0.7) 23px, rgba(255,255,255,0.7) 24px); background-size: 100% 24px;">
                <WashiTape position="top" rotation="-rotate-3" class="absolute -top-3 left-[20%] opacity-80 filter sepia-[0.3] hue-rotate-45" />
                <h3 class="font-caveat text-3xl text-[#5c6d85] font-bold mb-1">{{ item.role }}</h3>
                <h4 class="font-sans text-[11px] sm:text-xs font-bold text-[#8ba2bd] uppercase tracking-widest mb-3 border-b border-blue-50 pb-1 inline-block">{{ item.company }}</h4>
                <p v-if="item.description" class="font-sans text-stone-500 font-medium leading-relaxed text-xs sm:text-sm text-justify">{{ item.description }}</p>
              </div>

              <!-- POSTCARD TYPE -->
              <div v-else-if="item.type === 'postcard'" class="w-full max-w-100 bg-[#f7f9fa] p-5 sm:p-6 shadow-[2px_6px_15px_rgba(200,195,185,0.2)] border border-[#f0efec] relative transform rotate-1">
                <!-- logo-->
                <div v-if="item.logoSrc" class="absolute top-4 right-2 w-32 h-20 flex items-center justify-center overflow-hidden">
                  <img :src="item.logoSrc" :alt="`${item.company} logo`" class="w-full h-full object-contain p-1" />
                </div>
                <h3 class="font-caveat text-3xl text-[#6b625b] font-bold mb-1 w-4/5 leading-tight">{{ item.role }}</h3>
                <h4 class="font-sans text-[11px] sm:text-xs font-bold text-stone-400 uppercase tracking-[0.2em] mb-4 mt-1 bg-linear-to-r from-orange-50/50 to-transparent pr-4 pt-1">{{ item.company }}</h4>
                <p v-if="item.description" class="font-sans text-stone-500 leading-relaxed text-xs sm:text-sm w-5/6 text-justify">{{ item.description }}</p>
              </div>

              <!-- WASHI STRIP TYPE  -->
              <div v-else class="w-full h-56 max-w-125 p-6 sm:p-5 shadow-md relative -rotate-1" style="
                background-color: #FEF9C3;
                background-image:
                  repeating-linear-gradient(
                    transparent,
                    transparent 23px,
                    #bfdbfe 23px,
                    #bfdbfe 24px
                  );
                background-size: 100% 24px;
                background-position: 0 0;
              ">
                <!-- Pink margin line -->
                <div class="absolute left-[2.8rem] top-0 bottom-0 w-[1.5px] bg-rose-300/60"></div>
                <!-- Logo for Washi Note -->
                <div
                  v-if="item.logoSrc && item.company !== 'Acer'"
                  class="absolute flex items-center justify-center overflow-hidden"
                  :class="'top-9 right-4 w-24 h-12'"
                >
                  <img :src="item.logoSrc" :alt="`${item.company} logo`" class="w-full h-full object-contain p-1" />
                </div>
                <WashiTape position="left" rotation="-rotate-4" class="absolute -top-2 -left-4 z-20 mix-blend-multiply filter opacity-150 sepia-[0.2] hue-rotate-110" width="80px" />
                <div class="pl-10 relative z-10" :class="item.company === 'Acer' ? 'pt-2' : ''">
                  <div v-if="item.company === 'Acer'" class="flex items-start justify-between gap-3 mb-1">
                    <h3 class="font-caveat text-2xl sm:text-3xl text-stone-600 font-bold leading-tight flex-1 min-w-0 whitespace-normal break-words">{{ item.role }}</h3>
                    <div v-if="item.logoSrc" class="w-20 h-10 sm:w-28 sm:h-14 flex items-center justify-center shrink-0 overflow-hidden">
                      <img :src="item.logoSrc" :alt="`${item.company} logo`" class="w-full h-full object-contain p-1" />
                    </div>
                  </div>
                  <h3 v-else class="font-caveat text-2xl sm:text-3xl text-stone-600 font-bold mb-1 w-4/5">{{ item.role }}</h3>
                  <h4 class="font-sans text-[11px] sm:text-xs font-bold text-stone-400 uppercase tracking-widest mb-2">{{ item.company }}</h4>
                  <p v-if="item.description" class="font-sans text-stone-500 font-medium leading-snug text-xs sm:text-sm text-justify" :class="item.company === 'Acer' ? 'w-full' : 'w-11/12'">{{ item.description }}</p>
                </div>
              </div>

            </div>

            <!--  Date Stamp on Desktop -->
            <div class="hidden md:flex w-[45%] items-center" :class="index % 2 === 0 ? 'justify-start pl-8' : 'justify-end pr-8'">
              <DateTape :date="item.date" :rotation="index % 2 === 0 ? 'rotate-2' : '-rotate-2'" padding-x="40px" padding-y="12px"/>
            </div>

            <!-- Center Timeline Absolute Dot (Desktop) -->
            <div class="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-rose-300 shadow-sm z-30 transition-transform group-hover:scale-[1.2]"></div>

          </div>

        </div>
      </section>

    </div>
  </main>
</template>

<style scoped>
/* Highly Realistic Polaroid Flip Animation */
.polaroid-enter-active,
.polaroid-leave-active,
.polaroid-move {
  transition: all 0.8s cubic-bezier(0.5, 1.5, 0.4, 1);
}

.polaroid-leave-active {
  position: absolute;
  z-index: 50; /* Ensure the escaping slide flies ABOVE the stack */
}

.polaroid-leave-to {
  /* Fling out to the right, heavy rotation, scale up slightly then fade */
  transform: translateX(180%) translateY(-30px) rotate(25deg) scale(1.1) !important;
  opacity: 0 !important;
}
</style>
