import EmptyPageContent from "./empty-page-content.vue";

declare module "vue" {
  export interface GlobalComponents {
    EmptyPageContent: typeof EmptyPageContent;
  }
}
