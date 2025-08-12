<template>
  <article class="lot-card">
    <header class="lot-card__header">
      <div class="lot-card__chips">
        <base-chip> #{{ lot.id }}</base-chip>

        <base-chip :type="lotStatus.type">{{ lotStatus.text }}</base-chip>
      </div>

      <base-image :src="lot.photo" class="lot-card__image" />
    </header>

    <div class="lot-card__body">
      <div class="lot-card__content">
        <div class="lot-card__title">
          {{ lot.title }}
        </div>

        <div class="lot-card__price">
          {{ lotPrice }}
        </div>
      </div>

      <footer class="lot-card__footer">
        <base-button btn-type="error" center-icon="bin" @click.prevent="openDeleteLotDialog" />

        <base-button btn-type="warning" center-icon="pencil" @click.prevent="openUpdateLotDialog" />
      </footer>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from "vue";

import BaseImage from "ui/base-image";

import useEventBusStore from "store/use-event-bus-store";

import type { ILot } from "modules/lot/types/lot";

defineOptions({
  name: "lot-card",
});

const props = defineProps<{
  lot: ILot;
}>();

const eventBus = useEventBusStore();

const lotPrice = computed(() => {
  const { price } = props.lot;
  const localePrice = price.toLocaleString("ru-RU");

  return `${localePrice} ₽`;
});

const lotStatus = computed(() => ({
  text: props.lot.status === "active" ? "Активен" : "Завершен",
  type: (props.lot.status === "active" ? "success" : "warning") as "success" | "warning",
}));

function openDeleteLotDialog() {
  eventBus.emit("dialog/delete-lot", props.lot.id);
}

function openUpdateLotDialog() {
  eventBus.emit("dialog/update-lot", props.lot);
}
</script>

<style src="./lot-card.scss"></style>
