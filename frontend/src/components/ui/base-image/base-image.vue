<template>
  <div v-intersect="intersectionOption" class="base-image">
    <base-skeleton v-if="status === 'loading'" />
    <div v-else-if="status === 'error'" class="base-image__error">
      <base-icon name="error-warning" />
    </div>
    <img
      v-else
      :src="src"
      class="base-image__image"
      loading="lazy"
      @load="onDomLoad"
      @error="onDomError"
    />
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from "vue";

defineOptions({
  name: "base-image",
});

const props = defineProps<{
  src: string;
  alt?: string;
}>();

const intersectionOption = {
  callback: onVisible,
  options: {
    once: true,
    rootMargin: "200px",
  },
};

function onVisible() {
  if (props.src && status.value === "loading") {
    startLoading(props.src);
  }
}

const status = ref<"loading" | "loaded" | "error">("loading");

let preload: HTMLImageElement | null = null;
const clearPreloadHandler = () => {
  if (preload) {
    preload.onload = null;
    preload.onerror = null;
    preload = null;
  }
};
let loadToken = 0;

function startLoading(newSrc: string) {
  loadToken++;
  const token = loadToken;

  if (!newSrc) {
    status.value = "error";
    if (preload) {
      clearPreloadHandler();
    }
    return;
  }

  status.value = "loading";

  preload = new Image();

  preload.onload = () => {
    if (token !== loadToken) return;
    status.value = "loaded";
    if (preload) {
      clearPreloadHandler();
    }
  };

  preload.onerror = () => {
    if (token !== loadToken) return;

    status.value = "error";
    if (preload) {
      clearPreloadHandler();
    }
  };

  preload.src = newSrc;
}

watch(
  () => props.src,
  newSrc => {
    if (status.value === "loaded" || status.value === "error") {
      startLoading(newSrc);
    } else if (!newSrc) {
      status.value = "error";
      clearPreloadHandler();
    }
  },
  {
    immediate: true,
  },
);

const onDomLoad = () => (status.value = "loaded");
const onDomError = () => (status.value = "error");

onBeforeUnmount(() => {
  if (preload) {
    clearPreloadHandler();
  }
});
</script>

<style lang="scss">
.base-image {
  &__image {
    display: block;
    width: 100%;
    height: 100%;
    user-select: none;
    aspect-ratio: 1 / 1;
    object-fit: cover;
  }

  &__error {
    width: 100%;
    height: 100%;

    background-color: $gray-alpha-600;
    color: $red-600;

    @include flex-center;

    & svg {
      width: 50%;
      height: 50%;
    }
  }
}
</style>
