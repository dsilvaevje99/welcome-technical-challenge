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
          v-model:data="formData"
          :loading="editing"
          :disabled="fetching || !Object.keys(formData).length"
          @submit="handleSubmit"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
definePageMeta({ middleware: ["auth", "admin-only"] });

import { onMounted } from "vue";
import type { BookDetails } from "~/types";

const { params } = useRoute();
const router = useRouter();
const store = useBookStore();

const fetching = ref<boolean>(false);
const editing = ref<boolean>(false);
const valid = ref<boolean>(false);
const formData = reactive<BookDetails | {}>({});

const handleSubmit = async () => {
  editing.value = true;
  const { data: updated } = await useFetch<BookDetails>(
    "/api/admin/book/edit",
    {
      method: "PUT",
      body: { book: formData },
    }
  );
  if (updated.value) {
    store.adminSearchTerm = updated.value.isbn13;
    setTimeout(() => {
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
    const { data } = await useFetch<BookDetails>(`/api/books/${params.isbn13}`);
    if (data.value) {
      Object.assign(formData, data.value);
      valid.value = true;
    }
    fetching.value = false;
  }, 1);
});
</script>
