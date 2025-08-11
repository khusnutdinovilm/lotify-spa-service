import BaseCheckbox from "./base-checkbox.vue";

declare module "vue" {
  export interface GlobalComponents {
    BaseCheckbox: typeof BaseCheckbox;
  }
}
