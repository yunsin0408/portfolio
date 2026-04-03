<template>
  <div class="w-full sm:w-[320px] border-2 border-dashed border-latte rounded flex flex-col gap-4 bg-[#fdfbf7]">
    
    <div v-if="loading" class="text-center font-handwritten text-lg text-gray-400 py-8">
      Loading stats...
    </div>
    
    <div v-else-if="error" class="text-center font-handwritten text-lg text-red-400 py-8">
      Failed to load GitHub stats.
    </div>
    
    <div v-else class="flex flex-col">
      <!-- Header -->
      <div class="flex items-center gap-4 border-b border-gray-200/50 p-4 pb-3">
        <img :src="profile.avatar_url" class="w-14 h-14 rounded-full border-2 border-white shadow-sm" alt="Avatar" />
        <div>
          <h4 class="font-sans font-bold text-coffee-brown text-xl leading-none mb-1">
            {{ profile.name || profile.login }}
          </h4>
          <a :href="profile.html_url" target="_blank" class="font-sans text-sm text-sunset-pink hover:text-muted-orange transition font-bold">
            @{{ profile.login }} on GitHub
          </a>
        </div>
      </div>
      
      <!-- Stats Row -->
      <div class="flex justify-around text-center p-4 pt-3">
        <div>
          <span class="block font-sans text-3xl font-black text-espresso mb-1 drop-shadow-sm">{{ profile.public_repos }}</span>
          <span class="font-sans text-[10px] text-gray-500 uppercase tracking-widest font-bold">Repositories</span>
        </div>
        <div class="w-px bg-gray-200/50"></div>
        <div>
          <span class="block font-sans text-3xl font-black text-espresso mb-1 drop-shadow-sm">{{ profile.followers }}</span>
          <span class="font-sans text-[10px] text-gray-500 uppercase tracking-widest font-bold">Followers</span>
        </div>
        <div class="w-px bg-gray-200/50"></div>
        <div>
          <span class="block font-sans text-3xl font-black text-espresso mb-1 drop-shadow-sm">{{ profile.following }}</span>
          <span class="font-sans text-[10px] text-gray-500 uppercase tracking-widest font-bold">Following</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const profile = ref({});
const loading = ref(true);
const error = ref(false);

onMounted(async () => {
  try {
    const res = await fetch('https://api.github.com/users/yunsin0408');
    if (!res.ok) throw new Error('API limit reached or user not found');
    profile.value = await res.json();
  } catch (err) {
    console.error(err);
    error.value = true;
  } finally {
    loading.value = false;
  }
});
</script>
