import { ref } from "vue";
import { defineStore } from "pinia";
import type { Book } from "~/types";

export const useCartStore = defineStore(
  "cart",
  () => {
    const books = ref<Book[]>([]);

    const count = computed<number>(() => books.value.length);

    const removeBook = (id: string) => {
      books.value = books.value.filter((book) => book._id !== id);
    };

    return {
      books,
      count,
      removeBook,
    };
  },
  {
    persist: {
      paths: ["books"],
      storage: persistedState.localStorage,
    },
  }
);

type UseNullStore = ReturnType<typeof defineStore>;
type NullStore = ReturnType<UseNullStore>;
type CartStore = ReturnType<typeof useCartStore>;
export type CartStoreSGA = Omit<CartStore, keyof NullStore>;
