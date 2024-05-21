import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { database } from "./db/database";

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(database),
  providers: [Google],
});
