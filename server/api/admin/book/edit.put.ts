import type { AdminSingleBookReqBody } from "~/types";
import { Book } from "~/server/models/book.model";

// Endpoint protected by /server/middleware/admin-only.ts
export default defineEventHandler(async (event) => {
  const { book }: AdminSingleBookReqBody = await readBody(event);

  const { _id, ...newVals } = book;

  const updatedBook = await Book.findByIdAndUpdate(_id, newVals, { new: true });

  return updatedBook;
});
