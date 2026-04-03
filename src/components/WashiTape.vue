<template>
  <div :class="['washi-tape', color, rotation, position]" :style="{ width, height }"></div>
</template>

<script>
export default {
  name: 'WashiTape',
  props: {
    color: {
      type: String,
      default: 'bg-yellow-200/50',
    },
    rotation: {
      type: String,
      default: 'rotate-0',
    },
    position: {
      type: String,
      default: '',
    },
    width: {
      type: String,
      default: '100px',
    },
    height: {
      type: String,
      default: '20px',
    },
  },
};
</script>

<style scoped>
.washi-tape {
  position: absolute;
  mix-blend-mode: multiply;
  filter: sepia(0.2);
}
</style>
