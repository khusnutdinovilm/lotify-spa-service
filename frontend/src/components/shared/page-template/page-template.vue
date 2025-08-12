<template>
  <main class="page container">
    <div v-if="showPageHeader" class="page__header">
      <h1 v-if="pageTitle" class="page__title">
        {{ pageTitle }}
      </h1>
    </div>

    <div class="page__content" :class="pageContentClasses">
      <slot v-if="isContentLoading" name="page-loading"></slot>
      <slot v-else-if="isContentEmpty" name="page-empty"></slot>
      <slot v-else name="page-content"></slot>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed } from "vue";

defineOptions({
  name: "page-template",
});

const props = defineProps<{
  pageTitle?: string;
  isContentLoading?: boolean;
  isContentEmpty?: boolean;
}>();

const showPageHeader = computed(() => !!props.pageTitle);

const pageContentClasses = computed(() => ({
  "page__content--loading": props.isContentLoading,
  "page__content--empty": props.isContentEmpty,
}));
</script>

<style lang="scss">
.page {
  @include flex-col($gap: $space-6);

  &__title {
    @include heading-h4($color: $slate-400, $weight: 600);
  }

  &__content {
    flex: 1;

    &--empty {
      @include flex-center;
    }
  }
}
</style>
