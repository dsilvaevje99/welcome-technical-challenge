import { Book } from "~/server/models/book.model";
import { User } from "~/server/models/user.model";

// Endpoint protected by /server/middleware/admin-only.ts
export default defineEventHandler(async (event) => {
  const { ids }: { ids: string[] } = await readBody(event);

  await Book.deleteMany({ _id: { $in: ids } });

  // Here I am just removing any record of the book for every user, in a real project
  // I would handle it another way as the user stil posesses a physical copy
  await User.updateMany(
    { "checked_out.book": { $in: ids }, "history.book": { $in: ids } },
    {
      $pull: {
        checked_out: { book: { $in: ids } },
        history: { book: { $in: ids } },
      },
    }
  );

  return true;
});
