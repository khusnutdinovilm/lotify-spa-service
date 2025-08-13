<template>
  <base-dialog
    :is-dialog-open="isDialogOpen"
    dialog-title="Удаление лота"
    dialog-class="dialog-delete-lot"
    @close-dialog="closeDialog"
  >
    <template #base-dialog-content> Вы действительно хотите удалить лот? </template>

    <template #base-dialog-footer>
      <base-button
        btn-label="Отменить"
        btn-type="static"
        :disabled="isProcessDeleteLot"
        @click="closeDialog"
      />

      <base-button
        btn-label="Удалить"
        btn-type="error"
        :loading="isProcessDeleteLot"
        @click="onDeleteLot"
      />
    </template>
  </base-dialog>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";

import { useDialog } from "composable/use-dialog";

import useEventBusStore from "store/use-event-bus-store";

import useLotStore from "modules/lot/store/use-lot-store";
import type { ILot } from "modules/lot/types/lot";

defineOptions({
  name: "dialog-delete-lot",
});

const eventBus = useEventBusStore();
const lotStore = useLotStore();

const { isDialogOpen, openDialog, closeDialog } = useDialog();

const deletedLotId = ref<ILot["id"] | null>();
const isProcessDeleteLot = ref(false);

const onDeleteLot = async () => {
  isProcessDeleteLot.value = true;

  try {
    if (!deletedLotId.value) throw new Error("Не был передан ID лота");

    await lotStore.deleteLot(deletedLotId.value);

    // TODO: уведомление
    closeDialog();
    deletedLotId.value = null;
  } catch (error) {
    throw error;
  } finally {
    isProcessDeleteLot.value = false;
  }
};

onMounted(() => {
  eventBus.on("dialog/delete-lot", lotId => {
    deletedLotId.value = lotId;
    openDialog();
  });
});

onBeforeUnmount(() => {
  eventBus.off("dialog/delete-lot");
  deletedLotId.value = null;
});
</script>

<style lang="scss">
.dialog-delete-lot {
  & .base-dialog__content {
    @include body-lg($color: $slate-400);
    text-align: center;
  }

  & .base-dialog__footer {
    @include flex-row($gap: $space-4);

    & .base-button {
      flex: 1;
    }
  }
}
</style>
