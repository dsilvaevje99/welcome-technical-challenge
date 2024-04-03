<template>
  <v-card
    is="NavLink"
    :to="`/books/${book.isbn13}`"
    flat
    link
    class="pt-4 text-center card-container"
  >
    <v-chip
      v-if="addedToCart && !inCart && !borrowed"
      @click.stop.prevent="() => cart.removeBook(book._id)"
      color="green"
      variant="flat"
      size="small"
      class="card-chip"
      ><v-icon class="mr-1">mdi-check</v-icon> Added to cart</v-chip
    >
    <div v-if="!disableAllActions" :style="{ display: 'contents' }">
      <div v-if="inCart" class="actions-container">
        <v-tooltip text="Remove from cart" location="end">
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              @click.stop.prevent="() => cart.removeBook(book._id)"
              size="small"
              icon="mdi-book-minus"
              color="primary"
            ></v-btn>
          </template>
        </v-tooltip>
      </div>
      <div v-else-if="borrowed" class="actions-container">
        <v-tooltip text="Return book" location="end">
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              @click.stop.prevent="() => handleReturn(book._id)"
              size="small"
              icon="mdi-book-arrow-left"
              color="action"
            ></v-btn>
          </template>
        </v-tooltip>
      </div>
      <v-chip
        v-else-if="noCopiesAvailable"
        color="red-darken-4"
        variant="flat"
        size="small"
        class="card-chip"
        >Currently Unavailable</v-chip
      >
      <div v-else class="actions-container">
        <v-tooltip text="Add to cart" location="end">
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              @click.stop.prevent="() => cart.books.push(book)"
              size="small"
              icon="mdi-cart"
              color="action"
            ></v-btn>
          </template>
        </v-tooltip>
        <v-tooltip
          v-if="status === 'authenticated'"
          text="One-click borrow"
          location="end"
        >
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              @click.stop.prevent="() => handleQuickBorrow(book._id)"
              size="small"
              icon="mdi-cursor-pointer"
              color="accent"
            ></v-btn>
          </template>
        </v-tooltip>
      </div>
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
      <StarRatings v-if="!timestamp" :book="book" class="justify-center" />
      <span v-if="book.published_year"
        >Published {{ book.published_year }}</span
      >
      <span v-else>Unknown year of publication</span>
      <span v-if="timestamp" class="d-block mt-2 font-weight-bold text-action">
        {{ borrowed ? "Borrowed" : "Returned" }}
        {{ new Date(timestamp).toLocaleDateString() }}
      </span>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type { Book } from "~/types";

const { status } = useAuth();
const router = useRouter();
const store = useUserStore();
const cart = useCartStore();

const props = defineProps({
  book: {
    type: Object as () => Book,
    required: true,
  },
  timestamp: {
    type: Date,
    required: false,
    default: null,
  },
  borrowed: {
    type: Boolean,
    required: false,
    default: false,
  },
  inCart: {
    type: Boolean,
    required: false,
    default: false,
  },
  disableActions: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const noCopiesAvailable = computed<boolean>(
  () => props.book.stock === props.book.checked_out
);
const addedToCart = computed<boolean>(() =>
  props.inCart ? false : !!cart.books.find((b) => b._id === props.book._id)
);
const disableAllActions = computed<boolean>(
  () => props.disableActions || addedToCart.value
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

const handleReturn = async (_id: string) => {
  const returned = await store.returnBook({
    books: [{ book: _id, timestamp: new Date() }],
  });
  if (returned) {
    store.tab = 2;
  }
};
</script>

<style scoped lang="scss">
.card-container {
  position: relative;

  .card-chip {
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
