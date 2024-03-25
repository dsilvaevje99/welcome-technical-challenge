<template>
  <Head>
    <Title>Welcome Library</Title>
  </Head>
  <v-app>
    <AppBar />
    <Navigation />
    <v-main>
      <div class="px-1 px-md-6 px-lg-12">
        <NuxtPage />
      </div>
    </v-main>
  </v-app>
</template>

<style lang="scss">
@use "./settings";
</style>
