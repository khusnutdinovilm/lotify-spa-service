import InfinityList from "./infinity-list.vue";

declare module "vue" {
  export interface GlobalComponents {
    InfinityList: typeof InfinityList;
  }
}
