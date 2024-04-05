<template>
  <v-container class="filter-container">
    <v-row>
      <v-col cols="auto" class="pa-0 pr-8">
        <v-select
          v-model="store.filters.sort"
          label="Sort"
          :items="sortByOptions"
          item-props
          density="compact"
          variant="underlined"
          hide-details
        ></v-select>
      </v-col>
      <v-col cols="auto" class="pa-0">
        <v-select
          v-model="store.filters.genres"
          label="Genres"
          multiple
          :items="genreOptions"
          item-props
          density="compact"
          variant="underlined"
          hide-details
          :style="{ minWidth: '10rem' }"
        ></v-select>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import type { SortOption } from "~/types";
import { useBookStore } from "~/stores/book";

interface Options {
  title: string;
  value: SortOption | string[];
}

const sortByOptions: Options[] = [
  {
    title: "Alphabetically",
    value: { sortBy: "title", dir: "asc" },
  },
  {
    title: "Best rating",
    value: { sortBy: "average_rating", dir: "desc" },
  },
  {
    title: "Newest first",
    value: { sortBy: "published_year", dir: "desc" },
  },
  {
    title: "Oldest first",
    value: { sortBy: "published_year", dir: "asc" },
  },
];

const genreOptions: Options[] = [
  {
    title: "Adventure",
    value: ["adventure"],
  },
  {
    title: "Biography",
    value: ["biography", "autobiography"],
  },
  {
    title: "Culture",
    value: ["american", "africa", "europe", "australia", "english", "life"],
  },
  {
    title: "Drama",
    value: ["drama"],
  },
  {
    title: "Education",
    value: ["education", "computers"],
  },
  {
    title: "Fiction",
    value: ["fiction", "ficticious"],
  },
  {
    title: "Fantasy",
    value: ["fantasy"],
  },
  {
    title: "Mystery",
    value: ["detective", "mystery", "crime"],
  },
  {
    title: "Religion",
    value: ["religion", "christian", "clergy"],
  },
  {
    title: "Romance",
    value: ["romance"],
  },
];

const store = useBookStore();
</script>
