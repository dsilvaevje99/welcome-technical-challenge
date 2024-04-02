<template>
  <v-app-bar flat height="100" scroll-behavior="hide">
    <template v-slot:prepend>
      <v-app-bar-nav-icon
        class="d-block d-lg-none"
        @click.stop="store.toggleDrawerOpen"
      ></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title
      :class="`${
        $vuetify.display.smAndUp && 'text-h4'
      } font-weight-bold overflow-y-visible`"
    >
      Welcome <span class="text-secondary">Library</span></v-app-bar-title
    >

    <template v-slot:append>
      <AuthButton class="mr-10 hidden-md-and-down" />
      <v-btn icon="mdi-cart" color="action" class="mr-3"></v-btn>
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useSystemStore } from "~/stores/system";

const store = useSystemStore();
</script>
