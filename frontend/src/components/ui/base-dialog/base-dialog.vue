<template>
  <teleport to="body">
    <transition name="base-dialog-transition">
      <div v-if="isDialogOpen" class="base-dialog" :class="dialogClass">
        <div class="base-dialog__overlay" @click="onCloseDialog"></div>

        <div class="base-dialog__body" @click.stop>
          <div class="base-dialog__header">
            <div class="base-dialog__title">
              {{ dialogTitle }}
            </div>

            <dialog-close-btn class="base-dialog__close" @click="onCloseDialog" />
          </div>

          <div class="base-dialog__wrapper-content">
            <div class="base-dialog__content">
              <slot name="base-dialog-content"></slot>
            </div>
          </div>

          <div class="base-dialog__footer">
            <slot name="base-dialog-footer" :close-dialog="onCloseDialog"></slot>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { onBeforeUnmount, watch } from "vue";

import DialogCloseBtn from "./dialog-close-btn.vue";

import type { IBaseDialogEmits, IBaseDialogProps } from "./types";

defineOptions({
  name: "base-dialog",
});

const props = defineProps<IBaseDialogProps>();

const emits = defineEmits<IBaseDialogEmits>();

const onCloseDialog = () => emits("close-dialog");

watch(
  () => props.isDialogOpen,
  visible => {
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  },
  { immediate: true },
);

onBeforeUnmount(() => {
  document.body.style.overflow = "";
});
</script>

<style lang="scss">
.base-dialog {
  --font-color: #{$slate-400};

  position: fixed;
  inset: 0;

  @include flex-col;
  align-items: stretch;
  justify-content: flex-end;

  @media screen and (min-width: 768px) {
    justify-content: center;
    align-items: center;
  }

  &__overlay {
    position: absolute;
    inset: 0;
    background-color: $gray-alpha-950;
    cursor: pointer;
  }

  &__body {
    padding: $space-5;

    @include flex-col($gap: $space-6);

    border-radius: $radius-4 $radius-4 0 0;
    border-top: 1px solid $slate-800;

    background-color: $slate-950;

    cursor: default;

    max-height: 80dvh;

    z-index: 1;

    @media screen and (min-width: 768px) {
      width: 700px;
      border: 1px solid $slate-800;
      border-radius: $radius-4;
    }
  }

  &__header {
    position: relative;

    @include flex-col($gap: $space-5);

    @media screen and (min-width: 768px) {
      flex-direction: row;
    }
  }

  &__title {
    flex: 1;
    @include heading-h5($color: var(--font-color));
    text-align: center;
  }

  &__close {
    position: absolute;
    top: calc(-100% - $space-7);
    left: 50%;
    transform: translateX(-50%);

    @media screen and (min-width: 768px) {
      position: static;
      transform: translateX(0);
    }
  }

  &__wrapper-content {
    overflow-y: scroll;
    padding: 0 $space-3;

    @include custom-scroll($slate-600);
  }
}

.base-dialog-transition {
  &-enter-from,
  &-leave-to {
    opacity: 0;

    .base-dialog__body {
      transform: translateY(100%);

      @media screen and (min-width: 768px) {
        transform: scale(0.95);
      }
    }
  }

  &-enter-active,
  &-leave-active {
    transition: opacity 0.5s ease;

    .base-dialog__body {
      transition: transform 0.5s ease;
    }
  }

  &-enter-to,
  &-leave-from {
    opacity: 1;

    .base-dialog__body {
      transform: translateY(0);

      @media screen and (min-width: 768px) {
        transform: scale(1);
      }
    }
  }
}
</style>
