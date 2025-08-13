<template>
  <base-dialog
    :is-dialog-open="isDialogOpen"
    dialog-title="Редактирование лота"
    dialog-class="dialog-update-lot"
    @close-dialog="closeDialog"
  >
    <template #base-dialog-content>
      <form id="update-lot-form" class="form dialog-update-lot__form" @submit.prevent="submitForm">
        <div class="form__group">
          <base-input
            id="lot-title"
            v-model="form.title as string"
            :error-text="formErrors.title"
            label="Название"
          />

          <base-input
            id="lot-price"
            v-model="form.price as number"
            :error-text="formErrors.price"
            type="number"
            label="Цена"
          />

          <base-checkbox id="lot-status" v-model="statusFinished" label="Завершен" />
        </div>

        <div class="form__group dialog-update-lot__form-uploader">
          <image-uploader v-model="form.photo!" :preview="imagePreview" />
        </div>
      </form>
    </template>

    <template #base-dialog-footer>
      <base-button
        btn-label="Отменить"
        btn-type="ghost"
        :disabled="isSubmitting"
        @click="closeDialog"
      />

      <base-button
        btn-label="Обновить"
        form="update-lot-form"
        btn-type="success"
        html-type="submit"
        :loading="isSubmitting"
      />
    </template>
  </base-dialog>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref } from "vue";

import { useDialog } from "composable/use-dialog";

import useEventBusStore from "store/use-event-bus-store";

import useLotStore from "modules/lot/store/use-lot-store";
import type { ILot, IUpdateLotDto } from "modules/lot/types/lot";

defineOptions({
  name: "dialog-update-lot",
});

const { isDialogOpen, openDialog, closeDialog } = useDialog();

const eventBus = useEventBusStore();
const lotStore = useLotStore();

const imagePreview = ref("");

const lotUpdatedId = ref<ILot["id"] | null>(null);

const form = reactive<IUpdateLotDto>({
  title: "",
  price: 0,
  status: "active",
  photo: null,
});

const formErrors = reactive<Record<keyof IUpdateLotDto, string>>({
  title: "",
  price: "",
  status: "",
  photo: "",
});

function resetFormFields() {
  form.title = "";
  form.price = 0;
  form.status = "active";
  form.photo = null;
}

const statusFinished = computed({
  get() {
    return form.status === "finished";
  },
  set(newVal) {
    form.status = newVal ? "finished" : "active";
  },
});

const isSubmitting = ref(false);

const submitForm = async () => {
  // validate

  isSubmitting.value = true;

  try {
    const { title, price, status, photo } = form;

    await lotStore.updateLot(lotUpdatedId.value!, {
      title,
      price,
      status,
      photo,
    });

    // notify
    closeDialog();
    resetFormFields();
  } catch (error) {
    throw error;
  } finally {
    isSubmitting.value = false;
  }
};

onMounted(() => {
  eventBus.on("dialog/update-lot", payload => {
    form.title = payload.title;
    form.price = payload.price;
    form.status = payload.status;
    form.photo = null;
    imagePreview.value = payload.photo;
    lotUpdatedId.value = payload.id;

    openDialog();
  });
});

onBeforeUnmount(() => {
  eventBus.off("dialog/update-lot");
  resetFormFields();
});
</script>

<style lang="scss">
.dialog-update-lot {
  & .base-dialog__footer {
    @include flex-row($gap: $space-4);

    & .base-button {
      flex: 1;
    }
  }

  &__form {
    &.form {
      @media screen and (min-width: 768px) {
        flex-flow: row nowrap;
      }
    }

    &-fields {
      align-self: center;
    }

    & .form__group {
      flex: 1;
    }

    &-uploader.form__group {
      @include flex-center;

      & .image-uploader {
        width: 250px;
        height: 250px;
      }
    }
  }
}
</style>
