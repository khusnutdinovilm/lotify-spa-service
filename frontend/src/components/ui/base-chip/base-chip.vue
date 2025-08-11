<template>
  <div class="base-chip" :class="`base-chip--${type}`">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "base-chip",
});

const { type = "static" } = defineProps<{
  type?: "static" | "success" | "warning";
}>();
</script>

<style lang="scss">
.base-chip {
  padding: $space-2 $space-3;
  border-radius: $radius-3;

  @include body-sm($color: $slate-950);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &--static {
    background-color: $orange-300;
  }

  &--success {
    background-color: $green-500;
  }

  &--warning {
    background-color: $yellow-500;
  }
}
</style>
