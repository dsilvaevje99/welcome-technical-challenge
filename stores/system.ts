import { ref } from "vue";
import { defineStore } from "pinia";

export const useSystemStore = defineStore("system", () => {
  const drawerOpen = ref(false);

  const toggleDrawerOpen = () => (drawerOpen.value = !drawerOpen.value);

  return {
    drawerOpen,
    toggleDrawerOpen,
  };
});

type UseNullStore = ReturnType<typeof defineStore>;
type NullStore = ReturnType<UseNullStore>;
type SystemStore = ReturnType<typeof useSystemStore>;
export type SystemStoreSGA = Omit<SystemStore, keyof NullStore>;
