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
    "@sidebase/nuxt-auth",
    "nuxt-server-utils",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
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
    transpile: ["vuetify", "pinia-plugin-persistedstate"],
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
  auth: {
    provider: {
      type: "authjs",
    },
  },
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  routeRules: {
    "/admin": {
      ssr: false,
    },
    "/admin/**": {
      ssr: false,
    },
  },
});
