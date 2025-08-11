<template>
  <a href="/" class="app-brand">
    <img v-if="!withoutLogo" src="/logo.png" alt="" class="app-brand__logo" />

    <span v-if="!withoutName" class="app-brand__name"> Lotify </span>
  </a>
</template>

<script setup lang="ts">
defineOptions({
  name: "app-brand",
});

defineProps<{
  withoutLogo?: boolean;
  withoutName?: boolean;
}>();
</script>

<style lang="scss">
.app-brand {
  @include flex-center-y($gap: $space-4);

  &__logo {
    width: 40px;
    height: 40px;
  }

  &__name {
    @include heading-h6($color: $slate-400);
  }
}
</style>
