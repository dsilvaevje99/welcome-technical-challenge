import { ref } from "vue";
import { defineStore } from "pinia";
import type { BookReqBody, User, UserBook } from "~/types";

export const useUserStore = defineStore("user", () => {
  const isAdmin = ref<boolean>(false);
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
      const { data: user } = await useFetch<User>("/api/user/borrowed");
      isAdmin.value = user.value?.role === "admin";
      currBorrowed.value =
        user.value?.checked_out.sort(
          ({ timestamp: a }, { timestamp: b }) =>
            new Date(b).getTime() - new Date(a).getTime()
        ) || [];
    } catch (e) {
      console.error(e);
    }
  };

  const fetchBorrowHistory = async () => {
    try {
      const { data: user } = await useFetch<User>("/api/user/history");
      isAdmin.value = user.value?.role === "admin";
      prevBorrowed.value =
        user.value?.history.sort(
          ({ timestamp: a }, { timestamp: b }) =>
            new Date(b).getTime() - new Date(a).getTime()
        ) || [];
    } catch (e) {
      console.error(e);
    }
  };

  const initialize = () => {
    fetchBorrowedBooks();
    fetchBorrowHistory();
  };

  return {
    isAdmin,
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
