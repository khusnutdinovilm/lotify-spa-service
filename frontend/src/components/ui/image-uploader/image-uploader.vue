<template>
  <div
    class="image-uploader"
    :class="{ 'image-uploader--uploaded': image || previewImage }"
    @dragover.prevent
    @drop.prevent="onDrop"
    @click.stop="triggerFileInputDialog"
  >
    <input
      ref="fileInputRef"
      type="file"
      class="image-uploader__input"
      :accept="accept"
      @change="onFileChange"
    />

    <template v-if="!previewImage">
      <base-button btn-type="success" @click.stop="triggerFileInputDialog">
        <base-icon name="image-add" />
      </base-button>
    </template>
    <template v-else>
      <div class="image-uploader__preview-image">
        <base-button btn-type="error" @click.prevent.stop="resetImage">
          <base-icon name="bin" />
        </base-button>

        <base-image :src="previewImage" />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineOptions({
  name: "image-uploader",
});

const { accept = ".jpg,.png,.webp", preview = "" } = defineProps<{
  accept?: string;
  preview?: string;
}>();

const image = defineModel<File | null>({ required: true });

const fileInputRef = ref<HTMLInputElement | null>(null);

const previewImage = ref(preview);
const resetImage = () => {
  image.value = null;
  previewImage.value = "";
  fileInputRef.value = null;
};

const triggerFileInputDialog = () => fileInputRef.value?.click();

const onDrop = (event: DragEvent) => {
  const file = event.dataTransfer?.files[0] || null;
  if (!file) return;

  handleFile(file);
};

const onFileChange = (event: Event) => {
  if (!(event.target instanceof HTMLInputElement)) return;

  const target = event.target;
  const file = target.files?.[0];

  if (!file) return;

  handleFile(file);
};

const handleFile = (file: File) => {
  image.value = file;

  const reader = new FileReader();

  reader.onload = (event: ProgressEvent<FileReader>) => {
    const target = event.target;
    if (target) {
      previewImage.value = target.result as string;
    }
  };

  reader.readAsDataURL(file);
};
</script>

<style lang="scss">
.image-uploader {
  padding: $space-5;

  border: 3px dashed $slate-400;
  border-radius: $radius-4;

  @include flex-center;

  cursor: pointer;
  overflow: hidden;

  &__input {
    display: none;
  }

  & span {
    @include body-md($color: $slate-400);
    text-align: center;
  }

  &__preview-image {
    flex: 1;
    position: relative;

    & .base-button {
      position: absolute;
      top: $space-5;
      right: $space-5;
    }
  }

  & svg {
    width: 20px;
    height: 20px;
  }

  & img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    aspect-ratio: 1 /1;
  }

  &--uploaded {
    padding: 0;
    border-style: solid;
    border-width: 1px;
  }
}
</style>
