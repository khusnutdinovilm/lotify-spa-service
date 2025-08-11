<template>
  <header class="app-header">
    <div class="app-header__wrapper">
      <app-brand class="app-header__brand" />

      <div class="app-header__actions">
        <base-button btn-type="success" prepend-icon="add" @click="openCreateLotDialog">
          Добавить лот
        </base-button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import AppBrand from "common/app-brand";

defineOptions({
  name: "app-header",
});

const openCreateLotDialog = () => {};
</script>

<style lang="scss">
.app-header {
  border-bottom: 1px solid $slate-700;

  &__wrapper {
    @include flex-center-y;
    justify-content: space-between;
    padding: $space-5 $space-6;
  }

  &__actions {
    & .base-button__label {
      display: none;

      @media screen and (min-width: 768px) {
        display: block;
      }
    }
  }
}
</style>
