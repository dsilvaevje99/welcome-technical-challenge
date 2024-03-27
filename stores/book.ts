import { ref } from "vue";
import { defineStore } from "pinia";
import { BOOK_PAGE_SIZE } from "~/constants";
import type { Book, BookFilters, GetBooksPayload } from "~/types";

export const useBookStore = defineStore("book", () => {
  const books = ref<Book[]>([]);
  const total = ref<number>(0);
  const chunk = ref<number>(0);
  const searchTerm = ref<string>("");
  const searching = ref<boolean>(false);
  const loading = ref<boolean>(false);
  const timer = ref();
  const filters = reactive<BookFilters>({
    sort: {
      sortBy: "title",
      dir: "asc",
    },
    genres: [],
  });

  const formattedGenreFilter = computed<string>(() =>
    filters.genres.length ? [...new Set(filters.genres.flat())].join(",") : ""
  );

  const fetchBooks = async (isSearching = false) => {
    if (loading.value) return;

    loading.value = true;
    try {
      const { data } = await useFetch<GetBooksPayload>(
        `/api/books?skip=${chunk.value * BOOK_PAGE_SIZE}&term=${
          searchTerm.value || ""
        }&sortBy=${filters.sort.sortBy}&sort=${filters.sort.dir}&genres=${
          formattedGenreFilter.value
        }`
      );

      if (data.value) {
        const fetchedBooks = data.value.books;
        if (isSearching) {
          books.value = fetchedBooks;
        } else {
          books.value = [books.value, fetchedBooks].flat();
        }
        total.value = data.value.total;
        chunk.value = chunk.value + 1;
      }
    } catch (e) {}
    searching.value = false;
    loading.value = false;
  };

  watch(searchTerm, () => {
    clearTimeout(timer.value);
    searching.value = true;
    chunk.value = 0;

    timer.value = setTimeout(() => {
      fetchBooks(true);
    }, 400);
  });

  watch(filters, () => {
    books.value = [];
    chunk.value = 0;
    fetchBooks();
  });

  return {
    books,
    total,
    searchTerm,
    loading,
    searching,
    filters,
    fetchBooks,
  };
});

type UseNullStore = ReturnType<typeof defineStore>;
type NullStore = ReturnType<UseNullStore>;
type BookStore = ReturnType<typeof useBookStore>;
export type BookStoreSGA = Omit<BookStore, keyof NullStore>;
