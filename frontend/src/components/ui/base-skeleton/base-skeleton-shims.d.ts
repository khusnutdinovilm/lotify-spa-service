import BaseSkeleton from "./base-skeleton.vue";

declare module "vue" {
  export interface GlobalComponents {
    BaseSkeleton: typeof BaseSkeleton;
  }
}
