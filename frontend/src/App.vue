<template>
  <app-header />

  <lot-list-page />

  <app-footer />
</template>

<script setup lang="ts">
import AppFooter from "common/app-footer";
import AppHeader from "common/app-header";

import LotListPage from "modules/lot/components/lot-list-page";
</script>

<style lang="scss">
#app {
  background-color: $slate-900;

  border: 1px solid $slate-700;
  border-radius: $radius-3;

  flex: 1;
  display: flex;
  flex-direction: column;
  gap: $space-6;

  & main {
    flex: 1;

    display: flex;
    flex-direction: column;
    gap: $space-6;
  }
}
</style>
