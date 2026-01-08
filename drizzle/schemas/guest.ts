import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const guestsTable = pgTable("guests", {
  id: uuid("id").defaultRandom().primaryKey(),
  accessToken: text("access_token").unique().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
