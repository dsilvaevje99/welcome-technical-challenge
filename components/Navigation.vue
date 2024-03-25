<template>
  <v-navigation-drawer v-model="store.drawerOpen" app floating>
    <v-list density="compact" nav class="ml-3">
      <v-list-item
        v-for="route in routes"
        is="NavLink"
        :to="route.route"
        :prepend-icon="route.icon"
        :title="route.label"
        :value="route.label"
      ></v-list-item>
      <v-list-item
        class="mt-12 hidden-lg-and-up"
        prepend-icon="mdi-google"
        title="Login with Google"
        value="Google"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useSystemStore } from "~/stores/system";

const store = useSystemStore();

const routes = [
  {
    icon: "mdi-view-dashboard",
    label: "Library",
    route: "/",
  },
  {
    icon: "mdi-account",
    label: "My page",
    route: "/my-page",
  },
  {
    icon: "mdi-key",
    label: "Admin dashboard",
    route: "/admin",
  },
];
</script>
