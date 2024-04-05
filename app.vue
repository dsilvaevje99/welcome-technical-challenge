<template>
  <Head>
    <Title>Welcome Library</Title>
  </Head>
  <v-app>
    <AppBar />
    <Navigation />
    <Notifications />
    <v-main>
      <div class="px-1 px-md-6 px-lg-12">
        <NuxtPage />
      </div>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
const user = useUserStore();

user.initialize();
</script>

<style lang="scss">
@use "./settings";
</style>
