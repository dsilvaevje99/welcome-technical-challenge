import { NuxtAuthHandler } from "#auth";
import GoogleProvider from "next-auth/providers/google";

export default NuxtAuthHandler({
  secret: process.env.SIDEBASE_AUTH_SECRET,
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    GoogleProvider.default({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
});
