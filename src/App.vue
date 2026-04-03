<script setup>
import { nextTick, onMounted, ref, watch, watchEffect } from "vue";
import { useRoute } from "vue-router";
import SiteHeader from "./components/SiteHeader.vue";
import SiteFooter from "./components/SiteFooter.vue";
import './assets/tailwind.css';

const route = useRoute();
const isLight = ref(localStorage.getItem("portfolio-theme") === "light");
const navOpen = ref(false);

function toggleTheme() {
  isLight.value = !isLight.value;
  localStorage.setItem("portfolio-theme", isLight.value ? "light" : "dark");
}

function toggleNav() {
  navOpen.value = !navOpen.value;
}

function closeNav() {
  navOpen.value = false;
}

watchEffect(() => {
  document.body.classList.toggle("light", isLight.value);
});

function runRevealAnimation() {
  const revealItems = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries, localObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        localObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.15 }
  );

  revealItems.forEach((item) => {
    if (!item.classList.contains("visible")) {
      observer.observe(item);
    }
  });
}

function runCountAnimation() {
  const statNumbers = document.querySelectorAll("[data-count]");
  const observer = new IntersectionObserver(
    (entries, localObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const element = entry.target;
        const target = Number(element.dataset.count);
        let current = 0;
        const increment = Math.max(1, Math.ceil(target / 40));

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            element.textContent = String(target);
            clearInterval(timer);
            return;
          }
          element.textContent = String(current);
        }, 24);

        localObserver.unobserve(element);
      });
    },
    { threshold: 0.5 }
  );

  statNumbers.forEach((item) => observer.observe(item));
}

watch(
  () => route.fullPath,
  async () => {
    closeNav();
    window.scrollTo({ top: 0, behavior: "smooth" });
    await nextTick();
    runRevealAnimation();
    runCountAnimation();
  }
);

onMounted(() => {
  runRevealAnimation();
  runCountAnimation();
});
</script>

<template>
  <div>
    <SiteHeader
      :is-light="isLight"
      :nav-open="navOpen"
      @toggle-theme="toggleTheme"
      @toggle-nav="toggleNav"
      @close-nav="closeNav"
    />
        <div class="min-h-screen w-full bg-cream-paper relative overflow-x-hidden" style="background-image: url('/assets/paper-texture.png'); background-size: cover;">
          <div class="global-citrus-layer pointer-events-none absolute inset-0 z-0" aria-hidden="true">
            <img src="/assets/images/Citrus%20Club%2004/PNG/HTC_Heritage%20Library_Citrus%20Club%2004Element%201.png" alt="" class="global-citrus global-citrus-1" />
            <img src="/assets/images/Citrus%20Club%2004/PNG/HTC_Heritage%20Library_Citrus%20Club%2004Element%203.png" alt="" class="global-citrus global-citrus-2" />
            <img src="/assets/images/Citrus%20Club%2004/PNG/HTC_Heritage%20Library_Citrus%20Club%2004Element%205.png" alt="" class="global-citrus global-citrus-3" />
            <img src="/assets/images/Citrus%20Club%2004/PNG/HTC_Heritage%20Library_Citrus%20Club%2004Element%207.png" alt="" class="global-citrus global-citrus-4" />
            <img src="/assets/images/Citrus%20Club%2004/PNG/HTC_Heritage%20Library_Citrus%20Club%2004Element%208.png" alt="" class="global-citrus global-citrus-5" />
            <img src="/assets/images/Citrus%20Club%2004/PNG/HTC_Heritage%20Library_Citrus%20Club%2004Element%202.png" alt="" class="global-citrus global-citrus-6" />
            <img src="/assets/images/Citrus%20Club%2004/PNG/HTC_Heritage%20Library_Citrus%20Club%2004Element%206.png" alt="" class="global-citrus global-citrus-7" />
          </div>
          <main class="relative z-10 pt-8 pb-24 px-4">
            <router-view />
          </main>
        </div>
    <SiteFooter />
  </div>
</template>

<style scoped>
.global-citrus {
  position: absolute;
  width: clamp(64px, 8vw, 142px);
  opacity: 0.2;
  filter: sepia(0.14) saturate(0.9);
  mix-blend-mode: multiply;
}

.global-citrus-1 {
  top: 8%;
  left: 6%;
  transform: rotate(-15deg);
}

.global-citrus-2 {
  top: 17%;
  right: 4%;
  transform: rotate(10deg);
}

.global-citrus-3 {
  top: 47%;
  left: 3%;
  transform: rotate(8deg);
}

.global-citrus-4 {
  top: 65%;
  right: 5%;
  transform: rotate(-10deg);
}

.global-citrus-5 {
  bottom: 6%;
  left: 48%;
  transform: rotate(-13deg);
}

.global-citrus-6 {
  top: 34%;
  left: 46%;
  transform: rotate(8deg);
}

.global-citrus-7 {
  top: 58%;
  left: 41%;
  transform: rotate(-10deg);
}

@media (max-width: 768px) {
  .global-citrus {
    width: clamp(40px, 14vw, 88px);
    opacity: 0.12;
  }
}
</style>
