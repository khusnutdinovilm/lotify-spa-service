import "vue";

import BaseIcon from "./base-icon";

declare module "vue" {
  export interface GlobalComponents {
    BaseIcon: typeof BaseIcon;
  }
}

export {};
