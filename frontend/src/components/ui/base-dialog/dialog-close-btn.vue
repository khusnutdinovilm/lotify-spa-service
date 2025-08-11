<template>
  <div class="dialog-close-btn" :style="dialogCloseBtnStyles">
    <base-icon name="close" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

defineOptions({
  name: "dialog-close-btn",
});

const { size = 33.6 } = defineProps<{
  size?: number;
}>();

const dialogCloseBtnStyles = computed(() => ({
  width: `${size}px`,
  height: `${size}px`,
}));
</script>

<style lang="scss">
.dialog-close-btn {
  border: 1px solid $slate-800;
  border-radius: 50%;
  background-color: $gray-alpha-600;

  width: 33.6px;
  height: 33.6px;

  color: var(--font-color);

  cursor: pointer;

  & svg {
    width: 100%;
    height: 100%;
  }
}
</style>
