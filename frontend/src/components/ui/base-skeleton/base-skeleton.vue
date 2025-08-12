<template>
  <div class="base-skeleton" :style="skeletonStyle"></div>
</template>

<script setup lang="ts">
import { computed } from "vue";

defineOptions({
  name: "base-skeleton",
});

const props = defineProps<{
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
}>();

const skeletonStyle = computed(() => ({
  width: formatSize(props.width ?? "100%"),
  height: formatSize(props.height ?? "100%"),
  borderRadius: formatSize(props.borderRadius ?? "0px"),
}));

const formatSize = (value: string | number) => {
  return typeof value === "number" ? `${value}px` : value;
};
</script>

<style lang="scss">
.base-skeleton {
  display: inline-block;
  background: linear-gradient(
    135deg,
    rgba(200, 200, 200, 0.2) 25%,
    rgba(200, 200, 200, 0.4) 50%,
    rgba(200, 200, 200, 0.2) 75%
  );
  background-size: 200% 100%;
  animation: skeleton-shimmer 3s infinite linear;
}

@keyframes skeleton-shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}
</style>
