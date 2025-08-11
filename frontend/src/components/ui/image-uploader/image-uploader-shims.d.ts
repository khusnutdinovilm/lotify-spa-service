import ImageUploader from "./image-uploader.vue";

declare module "vue" {
  export interface GlobalComponents {
    ImageUploader: typeof ImageUploader;
  }
}
