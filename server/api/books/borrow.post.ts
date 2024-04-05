import { User } from "~~/server/models/user.model";
import { getServerSession } from "#auth";
import { BookReqBody } from "~/types";
import { Book } from "~/server/models/book.model";

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  if (!session) {
    return { status: 401, message: "unauthenticated" };
  }

  const body: BookReqBody = await readBody(event);

  const user = await User.findOneAndUpdate(
    { email: session.user?.email },
    { $push: { checked_out: { $each: body.books } } },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  const bookIds = body.books.map(({ book }) => book);
  await Book.updateMany(
    { _id: { $in: bookIds } },
    { $inc: { checked_out: 1 } }
  );

  return user;
});
