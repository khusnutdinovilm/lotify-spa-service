import BaseIcon from "./base-icon.vue";

declare module "vue" {
  export interface GlobalComponents {
    BaseIcon: typeof BaseIcon;
  }
}
