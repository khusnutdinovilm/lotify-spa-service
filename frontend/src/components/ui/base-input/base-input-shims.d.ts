import BaseInput from "./base-input.vue";

declare module "vue" {
  export interface GlobalComponents {
    BaseInput: typeof BaseInput;
  }
}
