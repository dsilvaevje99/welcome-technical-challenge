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
      <AuthButton class="mt-12 hidden-lg-and-up" />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useSystemStore } from "~/stores/system";

const store = useSystemStore();
const user = useUserStore();

const routes = computed(() => [
  {
    icon: "mdi-book",
    label: "Library",
    route: "/",
  },
  {
    icon: "mdi-account",
    label: "My page",
    route: "/my-page",
  },
  ...(user.isAdmin
    ? [
        {
          icon: "mdi-key",
          label: "Admin dashboard",
          route: "/admin",
        },
      ]
    : []),
]);
</script>
