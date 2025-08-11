<template>
  <component :is="iconComponent" />
</template>

<script setup lang="ts">
import { computed } from "vue";

import { icons } from "./icons-list";

import type { IconName } from "./types";

defineOptions({
  name: "base-icon",
});

const { name } = defineProps<{
  name: IconName;
}>();

const iconComponent = computed(() => icons[name]);
</script>

<style lang="scss">
svg {
  width: 1rem;
  height: 1rem;
  fill: currentColor;
}
</style>
