<template>
  <div class="about-dev">
    <span class="about-dev__item about-dev__item--caption">about dev:</span>

    <a :href="links.hh" class="about-dev__item" target="_blank">
      <div class="about-dev__hh">hh</div>
    </a>

    <a :href="links.gihub" class="about-dev__item" target="_blank">
      <base-icon name="github" />
    </a>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "about-dev",
});

const links = {
  hh: "https://ufa.hh.ru/resume/ac103434ff0c3d98070039ed1f353577456176",
  gihub: "https://github.com/khusnutdinovilm",
};
</script>

<style lang="scss">
.about-dev {
  display: flex;

  &__item {
    @include flex-center;
    @include body-md($color: $slate-400);

    padding: $space-5;

    border-right: 1px solid $slate-700;

    &--caption {
      padding: $space-5 $space-6;
    }

    & svg {
      width: 24px;
      height: 24px;
    }
  }

  &__hh {
    @include flex-center;

    width: 24px;
    height: 24px;

    border-radius: 50%;
    background-color: $slate-400;

    @include body-sm($color: $slate-400);

    color: $slate-950;
  }
}
</style>
