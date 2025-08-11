import BaseDialog from "./base-dialog.vue";

declare module "vue" {
  export interface GlobalComponents {
    BaseDialog: typeof BaseDialog;
  }
}
