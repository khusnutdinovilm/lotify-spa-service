import BaseLoader from "./base-loader.vue";

declare module "vue" {
  export interface GlobalComponents {
    BaseLoader: typeof BaseLoader;
  }
}
