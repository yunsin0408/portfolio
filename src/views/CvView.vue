<script setup>
import { computed, ref } from "vue";

const cvLastUpdated = ref("Managed in Google Drive");
const cvDriveShareUrl = "https://drive.google.com/file/d/1wnmLuwCdQQjmZa0_EkXpRRGLc7WslebH/view?usp=sharing";

const cvDriveFileId = computed(() => {
  const match = cvDriveShareUrl.match(/\/file\/d\/([^/]+)/);
  return match?.[1] ?? "";
});

const cvViewUrl = computed(() => {
  if (!cvDriveFileId.value) return cvDriveShareUrl;
  return `https://drive.google.com/file/d/${cvDriveFileId.value}/view?usp=sharing`;
});

const cvDownloadUrl = computed(() => {
  if (!cvDriveFileId.value) return cvDriveShareUrl;
  return `https://drive.google.com/uc?export=download&id=${cvDriveFileId.value}`;
});

const cvPreviewUrl = computed(() => {
  if (!cvDriveFileId.value) return cvDriveShareUrl;
  return `https://drive.google.com/file/d/${cvDriveFileId.value}/preview`;
});
</script>

<template>
  <main>
     <!-- Punched Binder Holes -->
    <div class="fixed top-0 bottom-0 left-2 sm:left-4 md:left-8 w-8 sm:w-10 border-r-2 border-[#eeebe4] flex flex-col items-center justify-around py-10 z-0">
      <div v-for="n in 8" :key="n" class="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#e8e4db] shadow-[inset_1px_1px_4px_rgba(0,0,0,0.05)] border border-[#edeae1]"></div>
    </div>

     <!-- CV Section -->
     <section class="section reveal">
      <h1 class="font-caveat text-4xl sm:text-5xl md:text-6xl text-stone-600 font-bold relative inline-block z-10 w-full ">Curriculum Vitae</h1>
      <p class="cv-last-updated mt-4">Last updated: <span>{{ cvLastUpdated }}</span></p>
      <div class="cv-layout">
        <div class="hero-cta">
          <a class="btn primary cv-view-btn" :href="cvViewUrl" target="_blank" rel="noreferrer">View PDF</a>
          <a class="cv-download-btn" :href="cvDownloadUrl" target="_blank" rel="noreferrer" aria-label="Download CV" title="Download CV">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 4v10" />
              <path d="m8 10 4 4 4-4" />
              <path d="M5 19h14" />
            </svg>
          </a>
        </div>
        <div class="cv-preview-wrap cv-preview-plain">
          <iframe :src="cvPreviewUrl" title="CV Preview"></iframe>
        </div>
      </div>
    </section>
  </main>
</template>
