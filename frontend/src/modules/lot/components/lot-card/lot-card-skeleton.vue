<template>
  <article class="lot-card lot-card--skeleton">
    <base-skeleton height="250px" />

    <div class="lot-card__body">
      <div class="lot-card__content">
        <base-skeleton height="18px" border-radius="8px" />

        <base-skeleton width="80px" height="16px" border-radius="8px" />
      </div>

      <footer class="lot-card__footer">
        <base-skeleton width="42px" height="38px" border-radius="8px" />

        <base-skeleton width="42px" height="38px" border-radius="8px" />
      </footer>
    </div>
  </article>
</template>

<script setup lang="ts">
defineOptions({
  name: "lot-card-skeleton",
});
</script>
