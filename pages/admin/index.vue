<template>
  <v-container>
    <v-row>
      <v-col cols>
        <h1>Admin dashboard</h1>
      </v-col>
      <v-col cols="auto">
        <v-btn
          is="NuxtLink"
          to="/admin/book/new"
          prepend-icon="mdi-plus"
          color="success"
          >Add book</v-btn
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="pb-0">
        <SearchBar v-model="store.adminSearchTerm" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-data-table-server
          density="compact"
          v-model:page="store.page"
          v-model:items-per-page="store.pageSize"
          :headers="headers"
          :items="store.books"
          :items-length="store.total"
          :loading="store.loading"
          item-value="_id"
          @update:options="handleFetchBooks"
          hover
        >
          <template #item.title="{ item }">
            {{ item.title }}{{ item.subtitle ? `: ${item.subtitle}` : "" }}
          </template>
          <template #item.actions="{ item }">
            <div class="actions-container">
              <v-tooltip text="Delete book" location="top">
                <template v-slot:activator="{ props }">
                  <v-btn
                    v-bind="props"
                    @click="() => handleDeleteBook(item._id)"
                    :disabled="!!deleting"
                    :loading="deleting === item._id"
                    icon="mdi-delete"
                    variant="text"
                    size="small"
                    color="error"
                  ></v-btn>
                </template>
              </v-tooltip>
              <v-tooltip text="View details" location="top">
                <template v-slot:activator="{ props }">
                  <v-btn
                    v-bind="props"
                    is="NavLink"
                    :to="`/books/${item.isbn13}`"
                    icon="mdi-eye"
                    variant="text"
                    size="small"
                    color="primary"
                  ></v-btn>
                </template>
              </v-tooltip>
              <v-tooltip text="Edit book" location="top">
                <template v-slot:activator="{ props }">
                  <v-btn
                    v-bind="props"
                    is="NavLink"
                    :to="`/admin/book/edit/${item.isbn13}`"
                    icon="mdi-pencil"
                    variant="text"
                    size="small"
                    color="action"
                  ></v-btn>
                </template>
              </v-tooltip>
            </div>
          </template>
        </v-data-table-server>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
definePageMeta({ middleware: ["auth", "admin-only"] });

import { CustomNotificationType, type ReadonlyTableHeaders } from "~/types";

const store = useBookStore();
const user = useUserStore();
const notifications = useNotificationStore();

const deleting = ref<string>("");

const handleFetchBooks = ({
  page,
  itemsPerPage,
}: {
  [key: string]: number;
}) => {
  store.fetchBooks(true, page, itemsPerPage, true, store.adminSearchTerm);
};

const handleDeleteBook = async (id: string) => {
  deleting.value = id;
  const { data: deleted, error } = await useFetch<boolean>(
    "/api/admin/book/delete",
    {
      method: "DELETE",
      body: {
        ids: [id],
      },
    }
  );

  if (error?.value) {
    notifications.addNotification(
      CustomNotificationType.ERROR,
      error.value.data
    );
    deleting.value = "";
    return;
  }

  if (deleted.value) {
    setTimeout(() => {
      notifications.addNotification(
        CustomNotificationType.SUCCESS,
        undefined,
        "Deleted book."
      );
      user.initialize();
      handleFetchBooks({ page: store.page, itemsPerPage: store.pageSize });
      deleting.value = "";
    }, 1000);
  } else {
    deleting.value = "";
  }
};

const headers: ReadonlyTableHeaders = [
  { title: "ISBN13", key: "isbn13", sortable: false },
  { title: "Title", key: "title", sortable: false },
  { title: "Authors", key: "authors", sortable: false },
  { title: "Stock", key: "stock", sortable: false },
  { title: "", key: "actions", sortable: false, align: "end" },
];

onMounted(() => {
  setTimeout(() => {
    store.books = [];
    store.page = 1;
  }, 1);
});
</script>

<style scoped lang="scss">
.v-data-table__tr {
  .actions-container {
    visibility: hidden;
    display: flex;
    gap: 0.5rem;
    align-items: center;
    justify-content: flex-end;
  }

  &:hover {
    .actions-container {
      visibility: visible;
    }
  }
}
</style>
