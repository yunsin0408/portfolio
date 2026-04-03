<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div class="stats-grid">
    <article v-for="item in items" :key="item.label" class="stat-card">
      <h3 :data-count="item.count">{{ item.initial ?? 0 }}</h3>
      <p>{{ item.label }}</p>
    </article>
  </div>
</template>
