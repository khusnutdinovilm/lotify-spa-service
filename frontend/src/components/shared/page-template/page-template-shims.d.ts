import PageTemplate from "./page-template.vue";

declare module "vue" {
  export interface GlobalComponents {
    PageTemplate: typeof PageTemplate;
  }
}
