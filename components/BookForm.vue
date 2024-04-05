<template>
  <v-form
    v-model="valid"
    validate-on="submit"
    :disabled="disabled"
    @submit.stop.prevent="() => $emit('submit')"
  >
    <v-container class="pa-0">
      <v-row>
        <v-col
          v-for="input in fields"
          :key="input.label"
          cols="12"
          :md="input.type === 'textarea' ? '12' : '4'"
        >
          <v-text-field
            v-if="input.type === 'number'"
            v-model.number.trim="formData[input.modelKey as keyof BookDetails]"
            :label="input.label"
            :required="!!input.required"
            :rules="input.rules || []"
          ></v-text-field>
          <v-textarea
            v-else-if="input.type === 'textarea'"
            v-model.trim="formData[input.modelKey as keyof BookDetails]"
            :label="input.label"
            :required="!!input.required"
            :rules="input.rules || []"
            auto-grow
          ></v-textarea>
          <v-text-field
            v-else
            v-model.trim="formData[input.modelKey as keyof BookDetails]"
            :label="input.label"
            :required="!!input.required"
            :rules="input.rules || []"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-btn
            :disabled="disableSubmit"
            :loading="loading"
            type="submit"
            color="success"
            >Submit form</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script setup lang="ts">
import type { BookDetails, InputField } from "~/types";
import {
  requiredRule,
  numberRule,
  yearRule,
  urlRule,
  isbnRule,
} from "~/formRules";

const valid = defineModel<boolean>("valid");
const formData = defineModel<BookDetails>("data", {
  default: {
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
  },
});

const props = defineProps({
  loading: {
    type: Boolean,
    required: true,
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
});

defineEmits(["submit"]);

const disableSubmit = computed<boolean>(() => props.loading || !valid.value);

const fields: InputField[] = [
  {
    modelKey: "isbn13",
    label: "ISBN13",
    required: true,
    rules: [...requiredRule, ...isbnRule],
  },
  {
    modelKey: "title",
    label: "Title",
    required: true,
    rules: [...requiredRule],
  },
  {
    modelKey: "subtitle",
    label: "Subtitle",
  },
  {
    modelKey: "authors",
    label: "Authors",
    required: true,
    rules: [...requiredRule],
  },
  {
    modelKey: "thumbnail",
    label: "Thumbnail URL",
    rules: [...urlRule],
  },
  {
    modelKey: "published_year",
    label: "Published Year",
    rules: [...yearRule],
  },
  {
    modelKey: "categories",
    label: "Categories",
    required: true,
    rules: [...requiredRule],
  },
  {
    modelKey: "num_pages",
    label: "Number of Pages",
    rules: [...numberRule],
  },
  {
    modelKey: "stock",
    label: "Stock",
    type: "number",
    required: true,
    rules: [...requiredRule, ...numberRule],
  },
  {
    modelKey: "description",
    label: "Description",
    required: true,
    rules: [...requiredRule],
    type: "textarea",
  },
];
</script>
