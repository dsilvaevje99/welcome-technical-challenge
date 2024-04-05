// plugins/vuetify.js
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: true,
    components,
    directives,
    theme: {
      defaultTheme: "default",
      themes: {
        default: {
          dark: false,
          colors: {
            background: "#FFFFFF",
            surface: "#FFFFFF",
            primary: "#000000",
            secondary: "#9f9f9f",
            accent: "#9658b7",
            success: "#328e32",
            warning: "#FB8C00",
            error: "#e74c3c",
            action: "#1063ad",
          },
        },
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
