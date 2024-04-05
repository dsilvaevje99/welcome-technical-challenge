import { ref } from "vue";
import { defineStore } from "pinia";
import { CustomNotificationType } from "~/types";
import type { BookReqBody, User, UserBook } from "~/types";

export const useUserStore = defineStore("user", () => {
  const notifications = useNotificationStore();

  const isAdmin = ref<boolean>(false);
  const tab = ref<number>(1);
  const currBorrowed = ref<UserBook[]>([]);
  const prevBorrowed = ref<UserBook[]>([]);

  const borrowBook = async (body: BookReqBody): Promise<Boolean> => {
    try {
      const { data: user, error } = await useFetch<User>("/api/books/borrow", {
        method: "POST",
        body,
      });

      if (error?.value) {
        notifications.addNotification(
          CustomNotificationType.ERROR,
          error.value.data
        );
        throw new Error(error.value.data.statusMessage);
      }

      if (user.value) {
        notifications.addNotification(
          CustomNotificationType.SUCCESS,
          undefined,
          `Borrowed ${body.books.length} book${
            body.books.length > 1 ? "s" : ""
          }.`
        );
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
      const { data: user, error } = await useFetch<User>("/api/books/return", {
        method: "POST",
        body,
      });

      if (error?.value) {
        notifications.addNotification(
          CustomNotificationType.ERROR,
          error.value.data
        );
        throw new Error(error.value.data.statusMessage);
      }

      if (user.value) {
        notifications.addNotification(
          CustomNotificationType.SUCCESS,
          undefined,
          `Returned ${body.books.length} book${
            body.books.length > 1 ? "s" : ""
          }.`
        );
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
      const { data: user, error } = await useFetch<User>("/api/user/borrowed");

      if (error?.value) {
        notifications.addNotification(
          CustomNotificationType.ERROR,
          error.value.data
        );
        throw new Error(error.value.data.statusMessage);
      }

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
      const { data: user, error } = await useFetch<User>("/api/user/history");

      if (error?.value) {
        notifications.addNotification(
          CustomNotificationType.ERROR,
          error.value.data
        );
        throw new Error(error.value.data.statusMessage);
      }

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
