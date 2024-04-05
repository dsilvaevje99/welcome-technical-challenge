import { ref } from "vue";
import { defineStore } from "pinia";
import { BOOK_PAGE_SIZE } from "~/constants";
import { CustomNotificationType } from "~/types";
import type { Book, BookFilters, GetBooksPayload } from "~/types";

export const useBookStore = defineStore(
  "book",
  () => {
    const notifications = useNotificationStore();

    const books = ref<Book[]>([]);
    const total = ref<number>(0);
    const page = ref<number>(1);
    const pageSize = ref<number>(10);
    const searchTerm = ref<string>("");
    const adminSearchTerm = ref<string>("");
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

    const fetchBooks = async (
      replaceArray = false,
      currPage = page.value,
      itemsPerPage = BOOK_PAGE_SIZE,
      disableFilters = false,
      term = searchTerm.value
    ) => {
      if (loading.value) return;

      loading.value = true;
      try {
        const { data, error } = await useFetch<GetBooksPayload>(
          `/api/books?skip=${
            (currPage - 1) * itemsPerPage
          }&limit=${itemsPerPage}&term=${term || ""}&sortBy=${
            disableFilters ? "" : filters.sort.sortBy
          }&sort=${disableFilters ? "" : filters.sort.dir}&genres=${
            disableFilters ? "" : formattedGenreFilter.value
          }`
        );

        if (error?.value) {
          notifications.addNotification(
            CustomNotificationType.ERROR,
            error.value.data
          );
          throw new Error(error.value.data.statusMessage);
        }

        if (data.value) {
          const fetchedBooks = data.value.books;
          if (replaceArray) {
            books.value = fetchedBooks;
          } else {
            books.value = [books.value, fetchedBooks].flat();
          }
          total.value = data.value.total;
        }
      } catch (e) {
        console.error(e);
      }
      searching.value = false;
      loading.value = false;
    };

    watch(searchTerm, () => {
      clearTimeout(timer.value);
      searching.value = true;
      page.value = 1;

      timer.value = setTimeout(() => {
        fetchBooks(true);
      }, 400);
    });

    watch(adminSearchTerm, () => {
      clearTimeout(timer.value);
      searching.value = true;
      page.value = 1;

      timer.value = setTimeout(() => {
        fetchBooks(
          true,
          undefined,
          pageSize.value,
          true,
          adminSearchTerm.value
        );
      }, 400);
    });

    watch(filters, () => {
      page.value = 1;
      fetchBooks(true);
    });

    return {
      books,
      page,
      pageSize,
      total,
      searchTerm,
      adminSearchTerm,
      loading,
      searching,
      filters,
      fetchBooks,
    };
  },
  {
    persist: {
      paths: ["pageSize"],
      storage: persistedState.localStorage,
    },
  }
);

type UseNullStore = ReturnType<typeof defineStore>;
type NullStore = ReturnType<UseNullStore>;
type BookStore = ReturnType<typeof useBookStore>;
export type BookStoreSGA = Omit<BookStore, keyof NullStore>;
