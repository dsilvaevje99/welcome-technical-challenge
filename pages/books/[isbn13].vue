<template>
  <v-container class="pa-0 pa-sm-2">
    <v-row>
      <v-col
        ><v-btn @click="$router.back()" prepend-icon="mdi-arrow-left" flat
          >Back to previous page</v-btn
        ></v-col
      ></v-row
    >
    <v-progress-circular v-if="fetching" indeterminate></v-progress-circular>
    <v-row v-else-if="book">
      <v-col cols="12" sm="4">
        <v-img
          :width="thumbnailWidth"
          class="mx-auto"
          min-height="200"
          :src="book.thumbnail"
        >
          <template v-slot:placeholder>
            <div
              class="d-flex align-center justify-center fill-height bg-secondary"
            >
              <v-icon>mdi-book</v-icon>
            </div>
          </template>
        </v-img>
      </v-col>
      <v-col cols="12" sm="8">
        <p class="mx-4 text-caption text-grey">ISBN13: {{ book.isbn13 }}</p>
        <v-container>
          <v-row class="mt-n4">
            <v-col cols="12" md>
              <h2>
                {{ book.title }}{{ book.subtitle ? `: ${book.subtitle}` : "" }}
              </h2>
              <p class="text-grey">{{ book.authors }}</p>
            </v-col>
            <v-col cols="auto">
              <StarRatings :book="book" />
              <span class="text-grey pl-1">
                from {{ book.ratings_count }} reviews</span
              >
            </v-col>
          </v-row>
        </v-container>
        <v-container v-if="copiesAvailable">
          <v-row>
            <v-col cols="auto">
              <v-btn
                @click="() => cart.books.push(book)"
                color="action"
                prepend-icon="mdi-cart"
                >Add to cart</v-btn
              >
            </v-col>
            <v-col cols="auto">
              <v-btn
                @click="() => handleQuickBorrow(book._id)"
                color="accent"
                prepend-icon="mdi-cursor-pointer"
                >Borrow with one click</v-btn
              >
            </v-col>
          </v-row>
        </v-container>
        <p class="px-4 py-2">{{ book.description }}</p>
        <p class="pa-4 pt-0 text-grey">
          <span v-if="book.published_year"
            >Published {{ book.published_year }}</span
          >
          <span v-else>Unknown year of publication</span>
          <span class="mx-2">|</span> {{ book.num_pages }} pages
          <span class="mx-2">|</span>
          <span :class="!copiesAvailable && 'text-error'"
            >{{ copiesAvailable }} copies currently available</span
          >
        </p>
        <v-chip v-if="book.categories" class="mx-4" variant="outlined">{{
          book.categories
        }}</v-chip>
      </v-col>
      <v-col v-if="similarBooks.length" cols="12" class="mt-10">
        <h3>Similar books</h3>
        <v-container>
          <v-row>
            <v-col
              v-for="similarBook in similarBooks"
              :key="similarBook._id"
              lg="3"
              md="4"
              sm="6"
              cols="12"
            >
              <BookCard :book="similarBook" />
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12">
        <p class="text-h6 text-center text-grey">
          Couldn't find this book, try again later.
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import type { Book, BookDetails, GetBooksPayload } from "~/types";
import { useDisplay } from "vuetify";
import { watch } from "vue";

const { params } = useRoute();
const router = useRouter();
const store = useUserStore();
const cart = useCartStore();

const currBreakpoint = ref(useDisplay());
const book = ref<BookDetails | null>(null);
const fetching = ref<boolean>(false);
const similarBooks = ref<Book[]>([]);

const thumbnailWidth = computed(() =>
  currBreakpoint.value.xs ? "50%" : "100%"
);
const copiesAvailable = computed<number>(() =>
  book.value ? book.value.stock - book.value.checked_out : 0
);

const handleQuickBorrow = async (_id: string) => {
  const borrowed = await store.borrowBook({
    books: [{ book: _id, timestamp: new Date() }],
  });
  if (borrowed) {
    store.tab = 1;
    router.push("/my-page");
  }
};

const fetchSimilarBooks = async () => {
  if (!book.value) return;

  const { data } = await useFetch<GetBooksPayload>(
    `/api/books?limit=8&genres=${book.value.categories}`
  );

  if (data.value) {
    similarBooks.value = data.value.books;
  }
};

watch(book, () => fetchSimilarBooks());

onMounted(() => {
  // Necessary workaround for Nuxt to run fetch in frontend
  setTimeout(async () => {
    fetching.value = true;
    const { data } = await useFetch<BookDetails>(`/api/books/${params.isbn13}`);
    if (data.value) book.value = data.value;
    fetching.value = false;
  }, 1);
});
</script>
