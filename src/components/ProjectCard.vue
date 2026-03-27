<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tags: {
    type: Array,
    default: () => [],
  },
  to: {
    type: [String, Object],
    default: null,
  },
  ctaLabel: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <RouterLink v-if="to" :to="to" class="project-card project-card-link">
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>
    <div v-if="tags.length" class="project-tags">
      <span v-for="tag in tags" :key="tag">{{ tag }}</span>
    </div>
    <span v-if="ctaLabel" class="btn small ghost">{{ ctaLabel }}</span>
  </RouterLink>

  <article v-else class="project-card">
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>
    <div v-if="tags.length" class="project-tags">
      <span v-for="tag in tags" :key="tag">{{ tag }}</span>
    </div>
    <span v-if="ctaLabel" class="btn small ghost">{{ ctaLabel }}</span>
  </article>
</template>
