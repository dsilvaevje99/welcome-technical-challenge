<template>
  <div>
    <v-btn v-if="notLoggedIn" @click="signIn" variant="outlined">
      <template #prepend>
        <v-progress-circular
          v-if="status === 'loading'"
          indeterminate
          size="24"
          width="2"
        ></v-progress-circular>
        <v-icon v-else>mdi-google</v-icon>
      </template>
      Login with Google
    </v-btn>
    <v-menu v-else>
      <template v-slot:activator="{ props }">
        <v-btn variant="tonal" v-bind="props">
          <template #prepend>
            <v-avatar
              color="surface-variant"
              icon="mdi-user"
              size="x-small"
              :image="data?.user?.image || ''"
            ></v-avatar>
          </template>
          {{ firstName }}
        </v-btn>
      </template>
      <v-list>
        <v-list-item value="logout">
          <v-list-item-title @click="() => signOut({ callbackUrl: '/' })"
            >Log out</v-list-item-title
          >
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script setup lang="ts">
const { status, data, signIn, signOut } = useAuth();

const notLoggedIn = computed<boolean>(
  () => status.value === "unauthenticated" || status.value === "loading"
);
const firstName = computed<string>(
  () => data.value?.user?.name?.split(" ")[0] || ""
);
</script>
