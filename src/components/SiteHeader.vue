<script setup>
const props = defineProps({
  navOpen: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["toggle-nav", "close-nav"]);

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Me" },
  { to: "/projects", label: "Projects" },
  { to: "/extracurricular", label: "Extracurricular" },
  { to: "/cv", label: "CV" },
];
</script>

<template>
  <header class="site-header sticky top-0 z-50 border-b border-[#d7ccb8] bg-[#f8f3e8]/95 backdrop-blur-sm">
    <div class="paper-noise pointer-events-none"></div>
    <div class="relative mx-auto flex w-full max-w-7xl items-end justify-between gap-3 px-4 pb-0 pt-5 sm:px-8 sm:pt-6 lg:px-12">
      <div class="binder-holes pointer-events-none" aria-hidden="true">
        <span></span>
        <span></span>
      </div>

      <RouterLink
        to="/"
        class="logo-tag inline-flex items-center rounded-sm border border-[#dacfb8] bg-[#fff8ed] px-3 py-2 text-[1.02rem] font-semibold tracking-[0.08em] text-[#5f4a38] shadow-[0_6px_18px_-16px_rgba(0,0,0,0.6)] sm:text-xl"
      >
        <span class="font-handwritten text-2xl sm:text-3xl leading-none ">Cindy's Journal</span>
        <span class="ml-2 text-[#d6908f]">&#9829;</span>
      </RouterLink>

      <div class="tab-row hidden items-end justify-center gap-1 lg:gap-2 md:flex md:translate-x-4 lg:translate-x-6" id="navLinks">
        <RouterLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          @click="emit('close-nav')"
          class="paper-tab"
        >
          {{ link.label }}
        </RouterLink>
      </div>

      <div class="flex items-center gap-2 md:gap-3">
        <button
          type="button"
          class="menu-btn md:hidden"
          aria-label="Toggle navigation"
          @click="emit('toggle-nav')"
        >
          Menu
        </button>
      </div>
    </div>

    <Transition name="slide-fade">
      <nav
        v-if="props.navOpen"
        class="mobile-drawer md:hidden"
      >
        <RouterLink
          v-for="link in links"
          :key="`mobile-${link.to}`"
          :to="link.to"
          class="mobile-link"
          @click="emit('close-nav')"
        >
          {{ link.label }}
        </RouterLink>
      </nav>
    </Transition>
  </header>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Special+Elite&display=swap");

.site-header {
  box-shadow: 0 10px 24px -22px rgba(55, 39, 22, 0.6);
}

.paper-noise {
  position: absolute;
  inset: 0;
  opacity: 0.1;
  background-image:
    radial-gradient(rgba(90, 73, 58, 0.12) 0.5px, transparent 0.5px),
    radial-gradient(rgba(90, 73, 58, 0.08) 0.5px, transparent 0.5px);
  background-size: 10px 10px, 14px 14px;
  background-position: 0 0, 4px 5px;
}

.binder-holes {
  position: absolute;
  left: 6px;
  top: 10px;
  bottom: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.binder-holes span {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: #e5ddd0;
  border: 1px solid #d9cfbe;
  box-shadow: inset 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.logo-tag {
  position: relative;
  transform: rotate(-1.4deg);
}

.logo-tag::before {
  content: "";
  position: absolute;
  top: -10px;
  right: 8px;
  width: 40px;
  height: 14px;
  background: rgba(247, 204, 157, 0.55);
  border: 1px solid rgba(196, 153, 103, 0.4);
  transform: rotate(8deg);
}

.paper-tab {
  position: relative;
  margin-left: 0;
  margin-bottom: -1px;
  border: 1px solid #d8ccb8;
  border-bottom: none;
  min-width: 116px;
  padding: 10px 16px 12px;
  text-align: center;
  font-family: "Special Elite", "Courier New", monospace;
  font-size: 0.92rem;
  font-weight: 700;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  text-decoration: none;
  color: #5c4b39;
  clip-path: polygon(0 0, 92% 0, 100% 100%, 0% 100%);
  border-radius: 8px 8px 0 0;
  background-color: #efe4d2;
  background-image:
    radial-gradient(rgba(96, 73, 47, 0.08) 0.6px, transparent 0.6px),
    linear-gradient(rgba(255, 255, 255, 0.22), rgba(255, 255, 255, 0.22));
  background-size: 10px 10px, 100% 100%;
  background-position: 0 0, 0 0;
  box-shadow: 0 -1px 0 rgba(255, 255, 255, 0.32) inset;
  transition: transform 180ms ease, background 180ms ease;
}

.tab-row {
  position: relative;
  bottom: -1px;
}

@media (max-width: 1120px) {
  .paper-tab {
    min-width: 98px;
    padding: 9px 12px 11px;
    font-size: 0.82rem;
  }
}

.paper-tab:hover {
  background-color: #f3e8d7;
  background-image:
    radial-gradient(rgba(96, 73, 47, 0.08) 0.6px, transparent 0.6px),
    linear-gradient(rgba(255, 255, 255, 0.24), rgba(255, 255, 255, 0.24));
  z-index: 30;
}

.paper-tab.router-link-exact-active,
.paper-tab.router-link-active {
  background-color: #ead9c2;
  background-image:
    radial-gradient(rgba(96, 73, 47, 0.08) 0.6px, transparent 0.6px),
    linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2));
  color: #6a3e3f;
  z-index: 40;
}

.menu-btn {
  border: 1px solid #d8ccb7;
  background: #fff8ec;
  color: #5e4b39;
  font-family: "Special Elite", "Courier New", monospace;
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-weight: 700;
  padding: 8px 10px;
  border-radius: 2px;
  transition: background 160ms ease, transform 160ms ease;
}

.menu-btn:hover {
  background: #f6ecdc;
  transform: translateY(-1px);
}

.mobile-drawer {
  border-top: 1px dashed #dfd2be;
  background: #f6efe3;
  padding: 12px 16px 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.mobile-link {
  border: 1px solid #ddd0bb;
  background: #fff9ef;
  color: #5d4a37;
  text-decoration: none;
  font-family: "Special Elite", "Courier New", monospace;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 10px 12px;
}

.mobile-link.router-link-exact-active,
.mobile-link.router-link-active {
  background: #f2d9d6;
  color: #693f40;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 180ms ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
