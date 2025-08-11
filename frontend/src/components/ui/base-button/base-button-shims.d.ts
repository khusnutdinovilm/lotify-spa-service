import BaseButton from "./base-button.vue";

declare module "vue" {
  export interface GlobalComponents {
    BaseButton: typeof BaseButton;
  }
}
