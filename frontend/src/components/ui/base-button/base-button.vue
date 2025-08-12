<template>
  <button
    class="base-button"
    :class="`base-button--${btnType}`"
    :form="form"
    :type="htmlType"
    :disabled="disabled"
    @click="onClick"
  >
    <base-loader v-if="loading" width="19.6" height="19.6" />
    <div v-else class="base-button__content">
      <div v-if="prependIcon" class="base-button__icon base-button__icon--prepend">
        <base-icon :name="prependIcon" />
      </div>
      <div v-if="centerIcon" class="base-button__icon base-button__icon--center">
        <base-icon :name="centerIcon" />
      </div>
      <div v-else class="base-button__label">
        <slot>
          {{ btnLabel }}
        </slot>
      </div>
      <div v-if="appendIcon" class="base-button__icon base-button__icon--append">
        <base-icon :name="appendIcon" />
      </div>
    </div>
  </button>
</template>

<script setup lang="ts">
import type { IBaseButtonEmits, IBaseButtonProps } from "./types";

defineOptions({
  name: "base-button",
});

const { btnType = "default", htmlType = "button", ...props } = defineProps<IBaseButtonProps>();

const emit = defineEmits<IBaseButtonEmits>();

const onClick = (event: MouseEvent) => {
  if (!props.loading) {
    emit("click", event);
  }
};
</script>

<style lang="scss">
.base-button {
  --bg-color: transparent;
  --bg-hover-color: transparent;
  --font-color: $gray-50;
  --border-color: transparent;
  --border-hover-color: transparent;

  @include flex-center($direction: row);

  padding: 10px 12px;

  border-radius: $radius-3;
  border: 1px solid var(--border-color);

  transition: all 0.3s ease-out;

  background-color: var(--bg-color);

  &__content {
    @include flex-center-y($gap: $space-3);
  }

  &__icon {
    @include flex-center;

    color: var(--font-color);
  }

  &__label {
    @include body-sm($color: var(--font-color));
  }

  &:hover:not(:disabled):not(:has(.base-button__loader)) {
    background-color: var(--bg-hover-color);
    border-color: var(--border-hover-color);
  }

  &:has(.base-button__loader) {
    cursor: progress;
  }

  &--static {
    --bg-color: #{$orange-300};
    --bg-hover-color: #{$orange-200};
  }

  &--default {
    --bg-color: #{$slate-600};
    --bg-hover-color: #{$slate-500};
  }

  &--ghost {
    --bg-color: transparent;
    --bg-hover-color: #{$slate-800};
    --font-color: #{$slate-50};
    --border-color: #{$slate-50};
  }

  &--success {
    --bg-color: #{$green-500};
    --bg-hover-color: #{$green-400};
  }

  &--error {
    --bg-color: #{$red-500};
    --bg-hover-color: #{$red-400};
  }

  &--warning {
    --bg-color: #{$yellow-500};
    --bg-hover-color: #{$yellow-400};
  }

  &:disabled {
    --bg-color: #{$slate-700};
    --font-color: #{$slate-500};

    cursor: not-allowed;
  }

  &--static,
  &--default,
  &--success,
  &--error,
  &--warning {
    --font-color: #{$slate-950};
  }
}
</style>
