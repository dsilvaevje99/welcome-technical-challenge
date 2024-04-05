<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="pb-0">
        <SearchBar v-model="store.searchTerm" />
      </v-col>
      <v-col cols="12" class="pt-0">
        <BookFilters />
      </v-col>
    </v-row>
    <v-row v-if="store.books.length || store.loading">
      <v-col
        v-for="book in store.books"
        :key="book._id"
        lg="3"
        md="4"
        sm="6"
        cols="12"
      >
        <BookCard :book="book" />
      </v-col>
      <div v-if="store.loading" :style="{ display: 'contents' }">
        <v-col
          v-for="num in BOOK_PAGE_SIZE"
          :key="num"
          lg="3"
          md="4"
          sm="6"
          cols="12"
        >
          <v-skeleton-loader type="image,article" loading></v-skeleton-loader>
        </v-col>
      </div>
      <v-col cols="12">
        <p class="text-center">
          Showing <strong>{{ store.books.length }}</strong> of
          <strong>{{ store.total }}</strong> results
        </p>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12">
        <p class="text-h6 text-center text-grey">
          Found no books matching those criteria
        </p>
      </v-col>
    </v-row>
  </v-container>
  <v-btn
    v-if="showScrollToTopBtn"
    @click="handleScrollToTop"
    icon="mdi-arrow-up"
    color="black"
    :style="{ position: 'fixed', bottom: '2rem', right: '2rem' }"
  ></v-btn>
</template>

<script setup lang="ts">
import { BOOK_PAGE_SIZE } from "~/constants";

const store = useBookStore();

const showScrollToTopBtn = ref<boolean>(false);

const moreBooksToFetch = computed<boolean>(
  () => store.books.length < store.total
);

const handleScrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  setTimeout(() => {
    showScrollToTopBtn.value = false;
  }, 100);
};

const handleScroll = () => {
  const closeToBottomOfWindow =
    Math.max(document.documentElement.scrollTop, document.body.scrollTop) +
      window.innerHeight >
    document.documentElement.offsetHeight - 300;

  if (closeToBottomOfWindow) {
    showScrollToTopBtn.value = true;
    if (moreBooksToFetch.value) {
      store.fetchBooks(false);
      store.page = store.page + 1;
    }
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  // Necessary workaround for Nuxt to call fetch in store
  setTimeout(() => {
    if (store.page === 1) store.fetchBooks(true);
  }, 1);
});

onBeforeUnmount(() => window.removeEventListener("scroll", handleScroll));
</script>
