<template>
  <label :for="id" class="base-checkbox" :class="{ 'base-checkbox--checked': checked }">
    <input :id="id" v-model="checked" type="checkbox" class="base-checkbox__input" />

    <div class="base-checkbox__box">
      <transition name="checkbox-box-transition">
        <base-icon v-if="checked" name="check" />
      </transition>
    </div>

    <div v-if="label || $slots['default']" class="base-checkbox__label">
      <slot>{{ label }}</slot>
    </div>
  </label>
</template>

<script setup lang="ts">
defineOptions({
  name: "base-checkbox",
});

defineProps<{
  id: string;
  label?: string;
}>();

const checked = defineModel<boolean>({ required: true });
</script>

<style lang="scss">
.base-checkbox {
  --font-color: #{$gray-50};

  &__input {
    display: none;
  }

  @include flex-center-y($gap: $space-6);

  color: var(--font-color);

  &:hover,
  &:focus {
    .base-checkbox__box {
      outline: 3px solid $slate-700;
    }
  }

  &__box {
    padding: $space-2;

    width: 20px;
    height: 20px;

    background-color: $slate-900;

    @include flex-center;

    border: 1px solid $slate-500;
    border-radius: $radius-1;

    transition: background-color 0.5s ease;

    & svg {
      width: 12px;
      height: 12px;
    }
  }

  &--checked &__box {
    background-color: $slate-500;
  }
}

.checkbox-box-transition {
  &-enter-from,
  &-leave-to {
    opacity: 0;
  }

  &-enter-active,
  &-leaver-active {
    transition: opacity 0.5s ease;
  }

  &-enter-to,
  &-leave-from {
    opacity: 1;
  }
}
</style>
