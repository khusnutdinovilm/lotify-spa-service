<template>
  <div class="base-input" :class="baseInputClasses">
    <label :for="id" class="base-input__label">
      {{ label }}
    </label>

    <input :id="id" v-model.trim="inputValue" :type="type" step="0.01" class="base-input__field" />

    <span v-if="errorText" class="base-input__error-text">
      {{ errorText }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";

import type { IBaseInputProps } from "./types";

defineOptions({
  name: "base-input",
});

const { type = "text", ...props } = defineProps<IBaseInputProps>();

const model = defineModel<string | number>({ required: true });
const updateModel = (newValue: string | number) => {
  model.value = newValue;
};

let timeoutId: ReturnType<typeof setTimeout> | null = null;

const inputValue = ref<string | number>(model.value);
watch(inputValue, newInputValue => {
  if (props.debounce) {
    if (timeoutId) clearTimeout(timeoutId);

    timeoutId = setTimeout(() => updateModel(newInputValue), props.debounce);
  } else {
    updateModel(newInputValue);
  }
});

const baseInputClasses = computed(() => ({
  "base-input--error": props.errorText,
}));
</script>

<style lang="scss">
.base-input {
  --font-color: #{$slate-400};
  --field-color: #{$slate-400};
  --field-border-color: transparent;
  --field-bg-color: #{$slate-700};

  @include flex-col($gap: $space-3);

  &__label {
    @include body-md($color: var(--font-color));
  }

  &__field {
    padding: $space-4;

    border-radius: $radius-3;
    border: 1px solid var(--field-border-color);

    background-color: var(--field-bg-color);

    transition: all 0.3s ease-out;

    @include body-md($color: var(--font-color));

    &:focus {
      --field-border-color: #{$slate-300};
    }

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }

    &[type="number"] {
      -moz-appearance: textfield;
    }
  }

  &--error &__field {
    --field-border-color: #{$red-500};
    --field-bg-color: #{$red-alpha-950};
  }

  &__error-text {
    @include body-sm($color: $red-500);
  }
}
</style>
