<template>
  <v-container>
    <v-row align="center">
      <v-col cols="auto">
        <v-avatar
          color="surface-variant"
          icon="mdi-user"
          size="x-large"
          :image="data?.user?.image || ''"
        ></v-avatar>
      </v-col>
      <v-col cols>
        <h1>{{ data?.user?.name }}</h1>
        <p>{{ data?.user?.email }}</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-tabs v-model="store.tab" bg-color="grey-lighten-3">
          <v-tab :value="1" prepend-icon="mdi-book">Borrowed books</v-tab>
          <v-tab :value="2" prepend-icon="mdi-clock">Borrow history</v-tab>
        </v-tabs>
        <v-window v-model="store.tab" class="mt-4">
          <v-window-item :value="1">
            <h2>Borrowed books</h2>
            <v-container>
              <v-row v-if="store.currBorrowed.length">
                <v-col
                  v-for="book in store.currBorrowed"
                  :key="book._id"
                  lg="3"
                  md="4"
                  sm="6"
                  cols="12"
                >
                  <BookCard
                    :book="book.book"
                    :timestamp="book.timestamp"
                    borrowed
                  />
                </v-col>
              </v-row>
              <v-row v-else>
                <p class="mt-6 text-grey">No books currently borrowed</p>
              </v-row>
            </v-container>
          </v-window-item>
          <v-window-item :value="2">
            <h2>Borrow History</h2>
            <v-container>
              <v-row v-if="store.prevBorrowed.length">
                <v-col
                  v-for="book in store.prevBorrowed"
                  :key="book._id"
                  lg="3"
                  md="4"
                  sm="6"
                  cols="12"
                >
                  <BookCard :book="book.book" :timestamp="book.timestamp" />
                </v-col>
              </v-row>
              <v-row v-else>
                <p class="mt-6 text-grey">No books have been returned</p>
              </v-row>
            </v-container>
          </v-window-item>
        </v-window>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
definePageMeta({ middleware: "auth" });

const { data } = useAuth();
const store = useUserStore();

store.initialize();
</script>
