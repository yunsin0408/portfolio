<template>
  <div class="w-full">
    <div class="flip-card" :class="{ 'is-flipped': isFlipped }">
      <div class="flip-card-inner">
        <article
          class="flip-face flip-front ticket-shell ticket-layout-front font-sans"
          :class="{ 'pointer-events-none': isFlipped }"
          @click="flipToBack"
        >
          <section class="ticket-main ticket-main-simple px-6 md:px-7 py-4 md:py-4 min-w-0">
            <p class="ticket-genre text-stone-500 font-serif font-bold text-lg uppercase">{{ item.role }}</p>
            <h3 class="ticket-title text-[#0b0c35] font-serif font-bold uppercase tracking-widest text-xl mt-1">{{ item.name }}</h3>
            <p class="ticket-desc text-stone-600 font-serif tracking-tighter text-[15px] md:text-smleading-relaxed text-justify mt-2">{{item.summary }}</p>
          </section>

          <section class="ticket-preview px-2.5 md:px-2.5 py-2 md:py-2">
            <img
              v-if="heroImage"
              :src="heroImage"
              :alt="item.name"
              class="w-full h-auto object-contain"
            />

            <div v-else class="ticket-empty font-display">Feature Frame</div>
          </section>

          <aside class="ticket-stub px-1 py-2 md:py-2.5">
            <p class="stub-ticket-no">Ticket No. ABC-2075485</p>
            <div class="stub-divider"></div>
            <p class="stub-admit font-display">ADMIT ONE</p>
            <div class="stub-divider"></div>
            <p class="stub-event">{{ item.name }}</p>
            <p class="stub-detail">SEAT A-0{{ item.id }} · 4:05 PM</p>
          </aside>
        </article>

        <article
          class="flip-face flip-back ticket-shell ticket-layout-back font-sans"
          :class="{ 'pointer-events-none': !isFlipped }"
          @click="flipToFront"
        >
          <section class="ticket-main ticket-main-back px-8 md:px-10 py-4 md:py-4 min-w-0">
            <p class="ticket-genre text-stone-500 font-serif font-bold text-lg uppercase">{{ item.role }}</p>
            <h2 class="ticket-title text-[#0b0c35] font-serif font-bold uppercase tracking-widest text-xl mt-1">{{ item.name }}</h2>
            <p class="ticket-desc text-stone-600 font-serif tracking-tighter text-[15px] md:text-sm leading-relaxed text-justify mt-2">{{ item.description || item.summary }}</p>

            <div v-if="item.keyWins && item.keyWins.length" class="mt-3">
              <h3 class="ticket-genre text-stone-700 font-serif font-bold text-lg uppercase">KEY WINS</h3>
              <ul class="list-disc list-inside text-stone-600 font-serif tracking-tighter text-[15px] md:text-sm leading-relaxed space-y-1 mt-1">
                <li v-for="(win, index) in item.keyWins" :key="index">{{ win }}</li>
              </ul>
            </div>
          </section>

          <section class="ticket-preview film-strip-panel px-2.5 md:px-2.5 py-2 md:py-2">
            <div v-if="photos.length" class="film-strip-scroll">
              <div class="film-strip-track">
                <button
                  v-for="(photo, index) in filmPhotos"
                  :key="`frame-${index}`"
                  class="film-frame"
                  :class="{ 'is-active': index % photos.length === currentPhotoIndex }"
                  @click="goToPhoto(index % photos.length)"
                  :aria-label="`Open photo ${(index % photos.length) + 1}`"
                >
                  <img
                    :src="photo"
                    :alt="`${item.name} photo ${(index % photos.length) + 1}`"
                    class="film-image"
                  />
                </button>
              </div>
            </div>

            <div v-else class="ticket-empty font-display">No photos yet</div>
          </section>

          <aside class="ticket-stub px-1 py-2 md:py-2.5">
            <p class="stub-ticket-no">Ticket No. ABC-2075485</p>
            <div class="stub-divider"></div>
            <p class="stub-admit font-display">ADMIT ONE</p>
            <div class="stub-divider"></div>
            <p class="stub-event">{{ item.name }}</p>
            <p class="stub-detail">Gallery {{ currentPhotoIndex + 1 }}</p>
          </aside>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const isFlipped = ref(false);

const currentPhotoIndex = ref(0);

const photos = computed(() => {
  return Array.isArray(props.item.photos) ? props.item.photos : [];
});

const filmPhotos = computed(() => {
  if (!photos.value.length) return [];
  return [...photos.value, ...photos.value];
});

const heroImage = computed(() => props.item.image || '');

function flipToBack(event) {
  event.stopPropagation();
  isFlipped.value = true;
  currentPhotoIndex.value = 0;
}

function flipToFront(event) {
  event.stopPropagation();
  isFlipped.value = false;
}

function goToPhoto(index) {
  currentPhotoIndex.value = index;
}
</script>

<style scoped>
.flip-card {
  perspective: 1400px;
}

.flip-card-inner {
  display: grid;
  transform-style: preserve-3d;
  transition: transform 850ms cubic-bezier(0.22, 0.61, 0.36, 1);
}

.flip-card.is-flipped .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-face {
  grid-area: 1 / 1;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.flip-back {
  transform: rotateY(180deg);
}

.ticket-shell {
  position: relative;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr;
  border: 1px solid rgba(94, 73, 48, 0.5);
  border-radius: 0.35rem;
  background:
    radial-gradient(130% 90% at 8% 14%, rgba(89, 62, 30, 0.16) 0%, rgba(89, 62, 30, 0) 58%),
    radial-gradient(110% 80% at 87% 82%, rgba(120, 77, 36, 0.14) 0%, rgba(120, 77, 36, 0) 62%),
    repeating-linear-gradient(166deg, rgba(72, 52, 30, 0.05) 0px, rgba(72, 52, 30, 0.05) 1px, transparent 1px, transparent 5px),
    repeating-linear-gradient(12deg, rgba(255, 245, 214, 0.07) 0px, rgba(255, 245, 214, 0.07) 2px, transparent 2px, transparent 9px),
    radial-gradient(circle at 1px 1px, rgba(102, 79, 51, 0.1) 0.9px, transparent 1px) 0 0 / 6px 6px,
    linear-gradient(150deg, #efe1c8 0%, #e5d3b6 45%, #dcc5a3 100%);
  background-blend-mode: multiply, multiply, soft-light, normal, normal, normal;
  box-shadow:
    0 10px 24px rgba(48, 31, 16, 0.24),
    inset 0 1px 0 rgba(255, 248, 227, 0.42),
    inset 0 -1px 0 rgba(99, 69, 35, 0.2),
    inset 0 0 0 1px rgba(70, 52, 31, 0.08);
}

.ticket-shell::before,
.ticket-shell::after {
  content: '';
  position: absolute;
  top: 6px;
  bottom: 6px;
  width: 12px;
  background-repeat: repeat-y;
  background-size: 12px 10px;
  pointer-events: none;
  z-index: 4;
}

.ticket-shell::before {
  left: -6px;
  background-image: radial-gradient(circle at 100% 5px, #faf7f2 0 5px, transparent 5.1px);
}

.ticket-shell::after {
  right: -6px;
  background-image: radial-gradient(circle at 0 5px, #faf7f2 0 5px, transparent 5.1px);
}

.ticket-layout-front,
.ticket-layout-back {
  grid-template-columns: 1fr;
}

.ticket-main {
  border-bottom: 1px solid rgba(101, 78, 50, 0.35);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  min-height: 0;
}

.ticket-main-simple {
  justify-content: center;
}


.ticket-title {
  font-size: 1.1rem;
  line-height: 1.2;
  text-align: left;
  color: #3a1f12;
  text-shadow: 0 0 0.2px rgba(58, 31, 18, 0.65);
}

.ticket-desc {
  white-space: normal;
}

.ticket-genre {
  font-size: 0.72rem;
  text-align: left;
  letter-spacing: 0.14em;
  margin-top: 0.15rem;
  color: #6b4b2a;
}

.ticket-preview {
  border-bottom: 1px dashed rgba(102, 77, 45, 0.45);
  border-right: none;
  background: linear-gradient(180deg, rgba(247, 235, 211, 0.55), rgba(234, 215, 183, 0.65));
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.stub-admit {
  color: #7a1f1f;
  font-size: 1.05rem;
  letter-spacing: 0.08em;
  line-height: 1;
}

.stub-divider {
  width: 1px;
  align-self: stretch;
  background: rgba(101, 78, 50, 0.45);
}

.ticket-stub {
  position: relative;
  background: rgba(239, 223, 196, 0.68);
  border-top: 1px dashed rgba(102, 77, 45, 0.45);
  text-align: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  overflow: hidden;
}

.ticket-stub::before {
  content: '';
  position: absolute;
  left: -5px;
  top: 6px;
  bottom: 6px;
  width: 8px;
  background-image: radial-gradient(circle, rgba(92, 66, 35, 0.75) 1.6px, transparent 1.7px);
  background-size: 6px 9px;
  background-repeat: repeat-y;
  pointer-events: none;
}

.stub-ticket-no,
.stub-event,
.stub-detail {
  font-size: 0.62rem;
  color: #5b4630;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.ticket-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 8rem;
  border: 1px dashed rgba(102, 77, 45, 0.4);
  border-radius: 0.75rem;
  color: #6c5438;
  font-size: 0.88rem;
}

.film-strip-panel {
  justify-content: stretch;
}

.film-strip-scroll {
  position: relative;
  overflow: hidden;
  height: 100%;
}

.film-strip-track {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  animation: film-scroll-y 40s linear infinite;
}

.film-frame {
  border: none;
  border-radius: 0.65rem;
  background: #3a2d20;
  padding: 0.24rem;
  position: relative;
  width: 100%;
  flex-shrink: 0;
}

.film-frame::before,
.film-frame::after {
  content: '';
  position: absolute;
  top: 6px;
  bottom: 6px;
  width: 6px;
  background-image: radial-gradient(circle, rgba(255, 255, 255, 0.85) 1.6px, transparent 1.7px);
  background-size: 6px 10px;
  background-repeat: repeat-y;
}

.film-frame::before {
  left: 3px;
}

.film-frame::after {
  right: 3px;
}

.film-frame.is-active {
  box-shadow: 0 0 0 2px rgba(122, 31, 31, 0.25);
}

.film-image {
  width: 100%;
  aspect-ratio: 4 / 3;
  height: auto;
  object-fit: cover;
  background: rgba(247, 237, 219, 0.9);
  border-radius: 0.45rem;
}

@keyframes film-scroll-y {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(calc(-50% - 0.275rem));
  }
}

@keyframes film-scroll-x {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(calc(-50% - 0.275rem));
  }
}

@media (max-width: 767px) {
  .ticket-layout-back {
    --mobile-image-height: clamp(8.5rem, 42vw, 11.5rem);
    --mobile-text-height: calc(var(--mobile-image-height) * 2);
  }

  .ticket-layout-back .ticket-main-back {
    max-height: var(--mobile-text-height);
    overflow-y: auto;
  }

  .ticket-title {
    font-size: 1rem;
  }

  .ticket-stub {
    flex-wrap: wrap;
  }

  .ticket-stub::before {
    left: 6px;
    right: 6px;
    top: -5px;
    bottom: auto;
    width: auto;
    height: 8px;
    background-size: 9px 6px;
    background-repeat: repeat-x;
  }

  .ticket-main {
    gap: 0.2rem;
  }

  .film-strip-scroll {
    overflow: hidden;
    height: var(--mobile-image-height);
    aspect-ratio: auto;
  }

  .film-strip-track {
    flex-direction: column;
    gap: 0;
    animation: film-scroll-y 40s linear infinite;
  }

  .film-frame {
    width: 100%;
    border-radius: 0;
    background: #3a2d20;
    padding: 0.24rem;
    box-shadow: none;
  }

  .film-image {
    aspect-ratio: 4 / 3;
    height: auto;
    border-radius: 0.2rem;
    background: rgba(247, 237, 219, 0.9);
  }
}

@media (min-width: 768px) {
  .ticket-shell {
    width: min(100%, 76rem);
    aspect-ratio: 3 / 1;
    min-height: 250px;
  }

  .ticket-layout-front {
    grid-template-columns: 1.4fr 1.05fr 0.28fr;
  }

  .ticket-layout-back {
    grid-template-columns: 1.4fr 1.05fr 0.28fr;
  }

  .ticket-main {
    border-bottom: none;
    border-right: 1px solid rgba(101, 78, 50, 0.35);
  }

  .ticket-preview {
    border-bottom: none;
    overflow: hidden;
  }

  .ticket-stub {
    border-top: none;
    writing-mode: vertical-rl;
    transform: rotate(180deg);
    justify-content: center;
    gap: 0.45rem;
    overflow: hidden;
  }

  .stub-divider {
    width: 100%;
    height: 1px;
  }

  .stub-admit {
    font-size: 1.35rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .flip-card-inner {
    transition: none;
  }
}
</style>
