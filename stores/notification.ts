import { ref } from "vue";
import { defineStore } from "pinia";
import {
  type CustomNotification,
  CustomNotificationType as ItemType,
} from "~/types";

export const useNotificationStore = defineStore("notification", () => {
  const notifications = ref<CustomNotification[]>([]);

  const addNotification = (type: ItemType, event?: any, message?: string) => {
    console.log("EVENT: ", event);
    const id = new Date().getTime();
    const errorCode =
      event?.statusCode ||
      event?.status ||
      event?.response.statusCode ||
      event?.response.status ||
      "Unknown error";
    const title =
      type === ItemType.SUCCESS
        ? "Success!"
        : type === ItemType.ERROR
        ? `${errorCode}: Oops!`
        : "";
    const text =
      message ||
      event?.statusMessage ||
      event?.message ||
      event?.response.message ||
      "An unknown event occurred.";

    notifications.value = [
      {
        id,
        type,
        title,
        text,
      },
      ...notifications.value,
    ];

    setTimeout(() => removeNotification(id), 8000);
  };

  const removeNotification = (id: number) => {
    notifications.value = notifications.value.filter((ntf) => ntf.id !== id);
  };

  return {
    notifications,
    addNotification,
    removeNotification,
  };
});

type UseNullStore = ReturnType<typeof defineStore>;
type NullStore = ReturnType<UseNullStore>;
type NotificationStore = ReturnType<typeof useNotificationStore>;
export type NotificationStoreSGA = Omit<NotificationStore, keyof NullStore>;
