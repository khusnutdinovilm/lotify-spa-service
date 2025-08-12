<template>
  <page-template
    page-title="Список лотов"
    :is-content-loading="isLotsLoading"
    :is-content-empty="isLotsEmpty"
    class="lot-list-page"
  >
    <template #page-loading>
      <lot-card-skeleton v-for="item in 8" :key="item" />
    </template>

    <template #page-empty>
      <empty-page-content empty-title="Список лотов пуст" empty-body="Список лотов пуст" />
    </template>

    <template #page-content>
      <infinity-list
        :items="lotStore.lots"
        :current-page="lotStore.currentPage"
        :last-page="lotStore.lastPage"
        :is-next-page-loading="isLotsMoreLoading"
        @is-intersect="loadMoreLots"
      >
        <template #list-item="{ item: lot }">
          <lot-card :lot="lot" />
        </template>
      </infinity-list>
    </template>
  </page-template>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

import { LotCard, LotCardSkeleton } from "modules/lot/components/lot-card";
import useLotStore from "modules/lot/store/use-lot-store";

defineOptions({
  name: "lot-list-page",
});

const lotStore = useLotStore();

const isLotsLoading = ref(false);
const isLotsEmpty = computed(() => !lotStore.lots.length);

const isLotsMoreLoading = ref(false);

async function loadMoreLots(page: number) {
  isLotsMoreLoading.value = true;

  try {
    await lotStore.getLots(page);
  } catch (error) {
    throw error;
  } finally {
    isLotsMoreLoading.value = false;
  }
}

onMounted(async () => {
  isLotsLoading.value = true;

  try {
    await lotStore.getLots();
  } catch (error) {
    throw error;
  } finally {
    isLotsLoading.value = false;
  }
});
</script>

<style lang="scss">
.lot-list-page {
  & .page__content--loading {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: $space-5;

    @media (min-width: 1200px) {
      grid-template-columns: repeat(4, minmax(250px, 1fr));
    }
  }
}
</style>
