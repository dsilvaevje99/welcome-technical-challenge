<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Add new book</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <BookForm
          v-model:valid="valid"
          v-model:data="formData"
          :loading="creating"
          @submit="handleSubmit"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
definePageMeta({ middleware: ["auth", "admin-only"] });

import { CustomNotificationType, type BookDetails } from "~/types";

const router = useRouter();
const store = useBookStore();
const notifications = useNotificationStore();

const creating = ref<boolean>(false);
const valid = ref<boolean>(false);
const formData = reactive<BookDetails>({
  isbn13: "",
  title: "",
  subtitle: "",
  authors: "",
  categories: "",
  thumbnail: "",
  description: "",
  published_year: "",
  average_rating: "0",
  ratings_count: "0",
  num_pages: "",
  stock: null,
  checked_out: 0,
});

const handleSubmit = async () => {
  if (!valid) return;

  creating.value = true;
  const { data: created, error } = await useFetch<BookDetails>(
    "/api/admin/book/create",
    {
      method: "POST",
      body: { books: [formData] },
    }
  );

  if (error?.value) {
    notifications.addNotification(
      CustomNotificationType.ERROR,
      error.value.data
    );
    creating.value = false;
    return;
  }

  if (created.value) {
    store.adminSearchTerm = created.value.isbn13;
    setTimeout(() => {
      notifications.addNotification(
        CustomNotificationType.SUCCESS,
        undefined,
        `Added book "${formData.title}"`
      );
      creating.value = false;
      router.push("/admin");
    }, 1000);
  } else {
    creating.value = false;
  }
};
</script>
