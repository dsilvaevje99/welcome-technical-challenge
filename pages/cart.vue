<template>
  <v-container>
    <v-row align="center">
      <v-col cols xs="12" sm>
        <h1>Books in cart ({{ cart.count }})</h1>
      </v-col>
      <v-col cols="auto" xs="12" sm="auto">
        <v-btn
          @click="handleCheckout"
          :disabled="!cart.count"
          color="action"
          size="large"
          prepend-icon="mdi-book"
          >Check out</v-btn
        >
      </v-col>
    </v-row>
    <v-row v-if="cart.books.length">
      <v-col
        v-for="book in cart.books"
        :key="book._id"
        lg="3"
        md="4"
        sm="6"
        cols="12"
      >
        <BookCard :book="book" inCart />
      </v-col>
      <v-col cols="12">
        <v-btn
          @click="handleClearCart"
          variant="tonal"
          color="error"
          prepend-icon="mdi-delete"
          >Clear cart</v-btn
        >
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12">
        <p class="mt-6 text-grey">No books added to cart</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
definePageMeta({ middleware: "auth" });

const router = useRouter();
const cart = useCartStore();
const store = useUserStore();

const handleCheckout = async () => {
  const books = cart.books.map(({ _id }) => ({
    book: _id,
    timestamp: new Date(),
  }));
  const borrowed = await store.borrowBook({ books });
  if (borrowed) {
    cart.books = [];
    store.tab = 1;
    router.push("/my-page");
  }
};

const handleClearCart = () => {
  cart.books = [];
  router.push("/");
};
</script>
