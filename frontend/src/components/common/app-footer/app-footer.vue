<template>
  <footer class="app-footer">
    <div class="app-footer__wrapper">
      <about-dev />

      <app-brand without-logo />
    </div>
  </footer>
</template>

<script setup lang="ts">
import AboutDev from "common/about-dev";
import AppBrand from "common/app-brand";

defineOptions({
  name: "app-footer",
});
</script>

<style lang="scss">
.app-footer {
  border-top: 1px solid $slate-700;

  &__wrapper {
    @include flex-row;
    justify-content: space-between;
  }

  & .app-brand {
    display: none;

    @media screen and (min-width: 768px) {
      display: block;
      padding: $space-5 $space-6;
      border-left: 1px solid $slate-700;
    }
  }
}
</style>
