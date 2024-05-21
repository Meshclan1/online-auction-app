// This file is where we define our tables - what they will look like and what properties will be on the table

// Our table is already running on docker

import { pgTable, serial } from "drizzle-orm/pg-core";

export const bids = pgTable("bb_bids", {
  id: serial("id").primaryKey(),
});
