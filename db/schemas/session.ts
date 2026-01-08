import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { usersTable } from "./user";

export const sessionsTable = pgTable("sessions", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => usersTable.id, { onDelete: "cascade" }).notNull(),
  token: text("token").unique().notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
