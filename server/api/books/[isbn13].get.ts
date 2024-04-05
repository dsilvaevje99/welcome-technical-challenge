import { Book } from "~~/server/models/book.model";

export default defineEventHandler(async (event) => {
  const isbn13 = getRouterParam(event, "isbn13");

  const bookDetails = await Book.findOne({ isbn13 }, {}, {});

  return bookDetails;
});
