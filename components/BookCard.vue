<template>
  <v-card
    is="NavLink"
    :to="`/books/${book.isbn13}`"
    flat
    link
    class="pt-4 text-center card-container"
  >
    <v-chip
      v-if="noCopiesAvailable"
      color="red-darken-4"
      variant="flat"
      size="small"
      class="unavailable-chip"
      >Currently Unavailable</v-chip
    >
    <div v-else class="actions-container">
      <v-tooltip text="Add to cart" location="end">
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="props"
            size="small"
            icon="mdi-cart"
            color="action"
          ></v-btn>
        </template>
      </v-tooltip>
      <v-tooltip text="One-click borrow" location="end">
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="props"
            size="small"
            icon="mdi-cursor-pointer"
            color="accent"
          ></v-btn>
        </template>
      </v-tooltip>
    </div>
    <v-img height="200" :src="book.thumbnail">
      <template v-slot:placeholder>
        <div
          class="w-50 mx-auto d-flex align-center justify-center fill-height bg-secondary"
        >
          <v-icon>mdi-book</v-icon>
        </div>
      </template>
    </v-img>
    <v-card-title tag="h2" class="text-wrap pb-0">
      {{ book.title }}{{ book.subtitle ? `: ${book.subtitle}` : "" }}
    </v-card-title>
    <v-card-subtitle class="text-wrap">{{ book.authors }}</v-card-subtitle>
    <v-card-text class="pt-0">
      <StarRatings :book="book" class="justify-center" />
      <span v-if="book.published_year"
        >Published {{ book.published_year }}</span
      >
      <span v-else>Unknown year of publication</span>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type { Book } from "~/types";

const props = defineProps({
  book: {
    type: Object as () => Book,
    required: true,
  },
});

const noCopiesAvailable = computed<boolean>(
  () => props.book.stock === props.book.checked_out
);
</script>

<style scoped lang="scss">
.card-container {
  position: relative;

  .unavailable-chip {
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
    z-index: 99999;
  }

  .actions-container {
    visibility: hidden;
    position: absolute;
    top: 1rem;
    right: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    z-index: 99999;
  }
  &:hover {
    .actions-container {
      visibility: visible;
    }
  }
}
</style>
