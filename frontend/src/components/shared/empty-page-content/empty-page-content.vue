<template>
  <div class="empty-page-content">
    <div class="empty-page-content__icon">
      <base-icon :name="emptyIcon" />
    </div>

    <h2 class="empty-page-content__title">
      {{ emptyTitle }}
    </h2>

    <div class="empty-page-content__body">
      <slot>{{ emptyBody }}</slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IconName } from "ui/base-icon/types";

defineOptions({
  name: "empty-page-content",
});

const {
  emptyIcon = "error-warning",
  emptyTitle = "Здесь пусто",
  emptyBody = "Очень пусто",
} = defineProps<{
  emptyTitle?: string;
  emptyBody?: string;
  emptyIcon?: IconName;
}>();
</script>

<style lang="scss">
.empty-page-content {
  --font-color: #{$slate-300};

  @include flex-center($gap: $space-4);

  &__icon {
    color: $yellow-700;

    width: 150px;
    height: 150px;

    @media screen and (min-width: 576px) {
      width: 200px;
      height: 200px;
    }

    & svg {
      width: 100%;
      height: 100%;
    }
  }

  &__title {
    @include heading-h4($color: $slate-300, $weight: 700);
  }

  &__body {
    @include body-lg($color: var(--font-color));
  }
}
</style>
