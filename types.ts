export type Book = {
  _id: any;
  isbn13: string;
  title: string;
  subtitle?: string;
  authors: string;
  thumbnail: string;
  published_year?: string;
  average_rating?: string;
  stock: number;
  checked_out: number;
};

export type BookDetails = Book & {
  categories?: string;
  description: string;
  num_pages: string;
  ratings_count: string;
};

export type GetBooksPayload = {
  books: Book[];
  total: number;
};

export type SortOption = {
  sortBy: keyof BookDetails;
  dir: "asc" | "desc";
};

export type BookFilters = {
  sort: SortOption;
  genres: string[][];
};