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
      <v-btn is="NavLink" to="/cart" icon color="action" class="mr-6">
        <template #default>
          <v-badge
            v-if="cart.count"
            :content="cart.count"
            floating
            color="green"
          >
            <v-icon>mdi-cart</v-icon>
          </v-badge>
          <v-icon v-else>mdi-cart</v-icon>
        </template>
      </v-btn>
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useSystemStore } from "~/stores/system";
import { useCartStore } from "~/stores/cart";

const store = useSystemStore();
const cart = useCartStore();
</script>
