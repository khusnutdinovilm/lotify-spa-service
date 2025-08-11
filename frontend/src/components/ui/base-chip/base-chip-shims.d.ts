import BaseChip from "./base-chip.vue";

declare module "vue" {
  export interface GlobalComponents {
    BaseChip: typeof BaseChip;
  }
}
