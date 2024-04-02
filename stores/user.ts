import { ref } from "vue";
import { defineStore } from "pinia";
import type { BookReqBody, User, UserBook } from "~/types";

export const useUserStore = defineStore("user", () => {
  const tab = ref<number>(1);
  const currBorrowed = ref<UserBook[]>([]);
  const prevBorrowed = ref<UserBook[]>([]);

  const borrowBook = async (body: BookReqBody): Promise<Boolean> => {
    try {
      const { data: user } = await useFetch<User>("/api/books/borrow", {
        method: "POST",
        body,
      });
      if (user.value) {
        fetchBorrowedBooks();
        return true;
      }
      return false;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  const returnBook = async (body: BookReqBody): Promise<Boolean> => {
    try {
      const { data: user } = await useFetch<User>("/api/books/return", {
        method: "POST",
        body,
      });
      if (user.value) {
        initialize();
        return true;
      }
      return false;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  const fetchBorrowedBooks = async () => {
    try {
      const { data: borrowed } = await useFetch<UserBook[]>(
        "/api/user/borrowed"
      );
      currBorrowed.value = borrowed.value || [];
    } catch (e) {
      console.error(e);
    }
  };

  const fetchBorrowHistory = async () => {
    try {
      const { data: history } = await useFetch<UserBook[]>("/api/user/history");
      prevBorrowed.value = history.value || [];
    } catch (e) {
      console.error(e);
    }
  };

  const initialize = () => {
    fetchBorrowedBooks();
    fetchBorrowHistory();
  };

  return {
    tab,
    currBorrowed,
    prevBorrowed,
    borrowBook,
    returnBook,
    initialize,
  };
});

type UseNullStore = ReturnType<typeof defineStore>;
type NullStore = ReturnType<UseNullStore>;
type UserStore = ReturnType<typeof useUserStore>;
export type UserStoreSGA = Omit<UserStore, keyof NullStore>;
