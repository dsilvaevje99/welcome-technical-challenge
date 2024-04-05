<template>
  <div class="d-flex align-center">
    <v-icon v-for="num in stars" :key="num" color="yellow-darken-2"
      >mdi-star</v-icon
    >
    <v-icon v-for="num in missingStars" :key="num + stars" color="grey"
      >mdi-star-outline</v-icon
    >
    <span class="ml-2">{{ book?.average_rating || "No ratings" }}</span>
  </div>
</template>

<script setup lang="ts">
import type { Book, BookDetails } from "~/types";

const props = defineProps({
  book: {
    type: Object as () => Book | BookDetails,
    required: true,
  },
});

const stars = computed(() =>
  Math.round(Number(props.book.average_rating || 0))
);
const missingStars = computed(() => 5 - stars.value);
</script>
