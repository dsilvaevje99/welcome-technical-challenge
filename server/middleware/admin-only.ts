import { User } from "~~/server/models/user.model";
import { getServerSession } from "#auth";

export default defineEventHandler(async (event) => {
  // Only apply middleware to admin endpoints
  if (!event.path.startsWith("/api/admin")) return;

  const session = await getServerSession(event);
  if (!session) {
    throw createError({ status: 401, message: "Unauthenticated" });
  }

  const user = await User.findOne({ email: session.user?.email });
  if (user?.role !== "admin") {
    throw createError({
      status: 401,
      message: "This endpoint is for admins only",
    });
  }
});
