<template>
  <base-dialog
    :is-dialog-open="isDialogOpen"
    dialog-title="Создание лота"
    dialog-class="dialog-create-lot"
    @close-dialog="closeDialog"
  >
    <template #base-dialog-content>
      <form id="create-lot-form" class="form dialog-create-lot__form" @submit.prevent="submitForm">
        <div class="form__group dialog-create-lot__form-fields">
          <base-input
            id="lot-title"
            v-model="form.title"
            :error-text="formErr.title"
            label="Название"
          />

          <base-input
            id="lot-price"
            v-model="form.price"
            :error-text="formErr.price"
            type="number"
            label="Цена"
          />

          <base-checkbox id="lot-status" v-model="isFinished"> Завершен </base-checkbox>
        </div>

        <div class="form__group dialog-create-lot__form-uploader">
          <image-uploader v-model="form.photo" />
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
        btn-label="Создать"
        form="create-lot-form"
        html-type="submit"
        btn-type="success"
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
import { type ICreateLotDto } from "modules/lot/types/lot";

defineOptions({
  name: "dialog-create-lot",
});

const eventBus = useEventBusStore();

const { isDialogOpen, openDialog, closeDialog } = useDialog();

const lotStore = useLotStore();

interface IForm extends Omit<ICreateLotDto, "photo"> {
  photo: File | null;
}

const MAX_TITLE_LENGTH = 3;

const form = reactive<IForm>({
  title: "",
  price: 0,
  photo: null,
  status: "active",
});

const formErr = reactive<Record<keyof Omit<IForm, "status">, string>>({
  title: "",
  price: "",
  photo: "",
});

const resetForm = () => {
  form.photo = null;
  form.title = "";
  form.price = 0;
};

function isTitleValid() {
  return typeof form.title === "string" && form.title.length > MAX_TITLE_LENGTH;
}

function isPriceValid() {
  return typeof form.price === "number" && form.price > 0;
}

function isPhotoValid() {
  return form.photo !== null && form.photo instanceof File;
}

function isFormValid() {
  formErr.title = !isTitleValid() ? "Некорректное значение поля" : "";
  formErr.price = !isPriceValid() ? "Некорректное значение поля" : "";
  formErr.photo = !isPhotoValid() ? "Необходимо выбрать изображение" : "";

  return Object.values(formErr).every(err => !err.length);
}

const isFinished = computed({
  get() {
    return form.status === "finished";
  },
  set(newValue) {
    form.status = newValue ? "finished" : "active";
  },
});

const isSubmitting = ref(false);

const submitForm = async () => {
  if (!isFormValid()) return;

  isSubmitting.value = true;

  try {
    const { title, price, status, photo } = form;

    await lotStore.createLot({
      title,
      price,
      status,
      photo: photo as File,
    });

    closeDialog();
    resetForm();
  } catch (error) {
    throw error;
  } finally {
    isSubmitting.value = false;
  }
};

onMounted(() => {
  eventBus.on("dialog/create-lot", () => {
    openDialog();
  });
});

onBeforeUnmount(() => {
  eventBus.off("dialog/create-lot");
  resetForm();
});
</script>

<style lang="scss">
.dialog-create-lot {
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
