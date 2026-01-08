import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const verificationsTable = pgTable("verifications", {
  id: uuid("id").defaultRandom().primaryKey(),
  indentifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
