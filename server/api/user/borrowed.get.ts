import { User } from "~~/server/models/user.model";
import { getServerSession } from "#auth";

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  if (!session) {
    return { status: 401, message: "unauthenticated" };
  }

  const user = await User.findOne(
    { email: session.user?.email },
    { history: 0 },
    {}
  );

  await user?.populate("checked_out.book");

  return user;
});
