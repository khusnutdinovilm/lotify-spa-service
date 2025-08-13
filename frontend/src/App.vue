<template>
  <app-header />

  <lot-list-page />

  <app-footer />

  <dialog-create-lot />
  <dialog-update-lot />
  <dialog-delete-lot />
</template>

<script setup lang="ts">
import AppFooter from "common/app-footer";
import AppHeader from "common/app-header";

import DialogCreateLot from "modules/lot/components/dialog-create-lot";
import DialogDeleteLot from "modules/lot/components/dialog-delete-lot";
import DialogUpdateLot from "modules/lot/components/dialog-update-lot";
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
