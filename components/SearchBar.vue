<template>
  <v-text-field
    name="Search"
    v-model="model"
    variant="outlined"
    placeholder="Search by title, author or isbn13..."
    clearable
    rounded
    flat
  >
    <template #prepend-inner>
      <v-progress-circular
        v-if="store.searching"
        indeterminate
        size="24"
        width="2"
      ></v-progress-circular>
      <v-icon v-else>mdi-magnify</v-icon>
    </template>
  </v-text-field>
</template>

<script setup lang="ts">
const store = useBookStore();
const model = defineModel();
</script>
