// this file specifies where our migrations will live and other information drizzle may need

import { env } from "@/env";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  out: "./drizzle", // our migration scripts will live in a auto created drizzle folder
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  verbose: true,
  strict: true,
});
