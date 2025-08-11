import { createPinia } from "pinia";
import { createApp } from "vue";

import { uiComponents } from "ui/index";

import App from "./App.vue";

const globalComponents = [...uiComponents];

const app = createApp(App);

globalComponents.forEach(component => app.component(component.name as string, component));

const pinia = createPinia();

app.use(pinia);

app.mount("#app");
