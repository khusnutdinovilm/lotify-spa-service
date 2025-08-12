import BaseImage from "./base-image.vue";

declare module "vue" {
  export interface GlobalComponents {
    BaseImage: typeof BaseImage;
  }
}
