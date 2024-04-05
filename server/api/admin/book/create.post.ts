import type { AdminMultiBookReqBody } from "~/types";
import { Book } from "~/server/models/book.model";

// Endpoint protected by /server/middleware/admin-only.ts
export default defineEventHandler(async (event) => {
  const { books }: AdminMultiBookReqBody = await readBody(event);

  const newBook = await Book.create(books[0]);

  return newBook;
});
