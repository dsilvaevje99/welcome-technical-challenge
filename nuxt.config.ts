import { createResolver } from "@nuxt/kit";
import vuetify from "vite-plugin-vuetify";

const { resolve } = createResolver(import.meta.url);

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    "vuetify/lib/styles/main.sass",
    "@mdi/font/css/materialdesignicons.min.css",
  ],
  modules: [
    "nuxt-server-utils",
    "@pinia/nuxt",
    [
      "@nuxtjs/google-fonts",
      {
        families: {
          ["Schibsted Grotesk"]: true,
          download: true,
          inject: true,
        },
      },
    ],
  ],
  build: {
    transpile: ["vuetify"],
  },
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  },
  hooks: {
    "vite:extendConfig": (config) => {
      config.plugins?.push(
        vuetify({
          styles: { configFile: resolve("./settings.scss") },
        })
      );
    },
  },
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
});
