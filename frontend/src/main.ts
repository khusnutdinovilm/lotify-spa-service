import { createPinia } from "pinia";
import { createApp } from "vue";

import { uiComponents } from "ui/index";

import sharedComponents from "shared/index";

import App from "./App.vue";
import vIntersect from "./directives/v-intersect";

const globalComponents = [...uiComponents, ...sharedComponents];

const app = createApp(App);

globalComponents.forEach(component => app.component(component.name as string, component));

app.directive("intersect", vIntersect);

const pinia = createPinia();

app.use(pinia);

app.mount("#app");
