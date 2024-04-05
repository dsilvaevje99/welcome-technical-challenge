<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Edit book ({{ params.isbn13 }})</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <BookForm
          v-model:valid="valid"
          v-model:data="formData.book"
          :loading="editing"
          :disabled="fetching || !formData.book"
          @submit="handleSubmit"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
definePageMeta({ middleware: ["auth", "admin-only"] });

import { onMounted } from "vue";
import { CustomNotificationType, type BookDetails } from "~/types";

const { params } = useRoute();
const router = useRouter();
const store = useBookStore();
const notifications = useNotificationStore();

const fetching = ref<boolean>(false);
const editing = ref<boolean>(false);
const valid = ref<boolean>(false);
const formData = reactive<{ book: BookDetails | undefined }>({
  book: undefined,
});

const handleSubmit = async () => {
  editing.value = true;
  const { data: updated, error } = await useFetch<BookDetails>(
    "/api/admin/book/edit",
    {
      method: "PUT",
      body: { book: formData },
    }
  );

  if (error?.value) {
    notifications.addNotification(
      CustomNotificationType.ERROR,
      error.value.data
    );
    editing.value = false;
    return;
  }

  if (updated.value) {
    store.adminSearchTerm = updated.value.isbn13;
    setTimeout(() => {
      notifications.addNotification(
        CustomNotificationType.SUCCESS,
        undefined,
        `Edited book "${formData.book?.title}"`
      );
      editing.value = false;
      router.push("/admin");
    }, 1000);
  } else {
    editing.value = false;
  }
};

onMounted(() => {
  // Necessary workaround for Nuxt to run fetch in frontend
  setTimeout(async () => {
    fetching.value = true;
    const { data, error } = await useFetch<BookDetails>(
      `/api/books/${params.isbn13}`
    );
    if (error?.value) {
      notifications.addNotification(
        CustomNotificationType.ERROR,
        error.value.data
      );
      editing.value = false;
      return;
    }
    if (data.value) {
      formData.book = data.value;
      valid.value = true;
    }
    fetching.value = false;
  }, 1);
});
</script>
