<template>
  <div class="infinity-list">
    <div class="infinity-list__list">
      <template v-for="item in items" :key="item.id">
        <slot name="list-item" :item="item"></slot>
      </template>
    </div>

    <div
      v-if="currentPage !== lastPage"
      v-intersect="intersectOptions"
      class="infinity-list__bottom"
    >
      <base-loader type="dots" width="16" height="16" />
    </div>
  </div>
</template>

<script setup lang="ts" generic="T extends { id: number }">
defineOptions({
  name: "infinity-list",
});

const { currentPage = 1, ...props } = defineProps<{
  items: T[];
  isNextPageLoading?: boolean;
  currentPage?: number;
  lastPage?: number;
}>();

const emits = defineEmits<{
  (e: "is-intersect", page: number): void;
}>();

const intersectOptions = {
  callback: onIntersecting,
  options: {
    rootMargin: "200px",
  },
};

function onIntersecting() {
  if (props.isNextPageLoading) return;
  emits("is-intersect", currentPage + 1);
}
</script>

<style lang="scss">
.infinity-list {
  @include flex-col($gap: $space-6);

  &__list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: $space-5;

    @media (min-width: 1200px) {
      grid-template-columns: repeat(4, minmax(250px, 1fr));
    }
  }

  &__bottom {
    @include flex-center;
  }
}
</style>
