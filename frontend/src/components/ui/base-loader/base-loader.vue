<template>
  <span ref="baseLoaderRef" class="base-loader" :class="baseLoaderClasses"></span>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

defineOptions({
  name: "base-loader",
});

const { type = "spin", ...props } = defineProps<{
  width?: string;
  height?: string;
  type?: "spin" | "dots";
}>();

const baseLoaderRef = ref<HTMLElement | null>(null);

const baseLoaderClasses = computed(() => ({
  "base-loader--spin": type === "spin",
  "base-loader--dots": type === "dots",
}));

onMounted(() => {
  if (baseLoaderRef.value) {
    baseLoaderRef.value.style.setProperty("--width", `${props.width}px`);
    baseLoaderRef.value.style.setProperty("--height", `${props.height}px`);
  }
});
</script>

<style lang="scss">
.base-loader {
  --width: 1rem;
  --height: 1rem;

  width: var(--width);
  height: var(--height);

  &--spin {
    border: 1px solid $gray-50;
    border-bottom-color: transparent;
    border-radius: 50%;
    animation: rotation 1.25s linear infinite;

    @keyframes rotation {
      to {
        transform: rotate(360deg);
      }
    }
  }

  &--dots {
    --dots-l-pos: calc(-1.5 * var(--width));
    --dots-r-pos: calc(1.5 * var(--width));

    border-radius: 50%;
    display: block;
    margin: 15px auto;
    position: relative;
    background: #fff;
    box-shadow:
      var(--dots-l-pos) 0 #fff,
      var(--dots-r-pos) 0 #fff;
    box-sizing: border-box;
    animation: shadowPulse 2s linear infinite;

    @keyframes shadowPulse {
      33% {
        background: $gray-50;
        box-shadow:
          var(--dots-l-pos) 0 $slate-800,
          var(--dots-r-pos) 0 $gray-50;
      }
      66% {
        background: $slate-800;
        box-shadow:
          var(--dots-l-pos) 0 $gray-50,
          var(--dots-r-pos) 0 $gray-50;
      }
      100% {
        background: $gray-50;
        box-shadow:
          var(--dots-l-pos) 0 $gray-50,
          var(--dots-r-pos) 0 $slate-800;
      }
    }
  }
}
</style>
