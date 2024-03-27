import { BOOK_PAGE_SIZE } from "~/constants";
import { Book } from "~~/server/models/book.model";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const genreRegex = query.genres
    ? (query.genres as string).replaceAll(",", "|")
    : "";
  const filterByGenreObject = genreRegex
    ? {
        categories: { $regex: genreRegex, $options: "i" },
      }
    : {};

  const searchObject = query.term
    ? { $text: { $search: query.term as string } }
    : {};

  const sortObject = query.sortBy
    ? {
        sort: {
          [query.sortBy as string]: query.sort,
        },
      }
    : {};

  const books = await Book.find(
    { ...searchObject, ...filterByGenreObject },
    { description: 0, categories: 0, num_pages: 0, ratings_count: 0 }, // exclude fields
    {
      skip: (query.skip as number) || 0,
      limit: (query.limit as number) || BOOK_PAGE_SIZE,
      ...sortObject,
    }
  );

  const totalCount = await Book.countDocuments(searchObject);

  return { books, total: totalCount };
});
