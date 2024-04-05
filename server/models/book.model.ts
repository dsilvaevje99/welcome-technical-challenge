import { Schema, model } from "mongoose";

const BookSchema = new Schema({
  isbn13: String,
  title: String,
  subtitle: String,
  authors: String,
  categories: String,
  thumbnail: String,
  description: String,
  published_year: String,
  average_rating: String,
  ratings_count: String,
  num_pages: String,
  stock: Number,
  checked_out: Number,
});

BookSchema.index({
  isbn13: "text",
  title: "text",
  subtitle: "text",
  authors: "text",
});

export const Book = model("Book", BookSchema);
