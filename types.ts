export type Book = {
  _id?: any;
  isbn13: string;
  title: string;
  subtitle?: string;
  authors: string;
  thumbnail: string;
  published_year?: string;
  average_rating?: string;
  stock: number | null;
  checked_out: number;
};

export type BookDetails = Book & {
  categories?: string;
  description: string;
  num_pages: string;
  ratings_count?: string;
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

export type User = {
  email: string;
  role: string;
  checked_out: UserBook[];
  history: UserBook[];
};

export type UserBook = {
  _id: any;
  book: BookDetails;
  timestamp: Date;
};

export type BookReqBody = {
  books: {
    book: string; // book ID
    timestamp: Date;
  }[];
};

export type AdminMultiBookReqBody = {
  books: BookDetails[];
};

export type AdminSingleBookReqBody = {
  book: BookDetails;
};

export type InputRules = Array<(v: string | number) => true | string>;

export type InputField = {
  modelKey: string;
  label: string;
  rules?: InputRules;
  required?: boolean;
  type?: string;
  placeholder?: string;
};
