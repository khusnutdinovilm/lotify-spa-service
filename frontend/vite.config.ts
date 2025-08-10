import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vueDevTools from "vite-plugin-vue-devtools";

import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],

  resolve: {
    alias: {
      "assets/": fileURLToPath(new URL("./src/assets/", import.meta.url)),
      "styles/": fileURLToPath(new URL("./src/styles/", import.meta.url)),
      "ui/": fileURLToPath(new URL("./src/components/ui/", import.meta.url)),
      "shared/": fileURLToPath(new URL("./src/components/shared/", import.meta.url)),
      "common/": fileURLToPath(new URL("./src/components/common/", import.meta.url)),
      "composable/": fileURLToPath(new URL("./src/composable/", import.meta.url)),
      "api/": fileURLToPath(new URL("./src/api/", import.meta.url)),
      "store/": fileURLToPath(new URL("./src/store/", import.meta.url)),
      "modules/": fileURLToPath(new URL("./src/modules/", import.meta.url)),
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "styles/variables/index" as *;
          @use "styles/mixins/index" as *;
        `,
      },
    },
  },
});
