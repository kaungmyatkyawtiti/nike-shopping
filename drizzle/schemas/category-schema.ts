import { relations } from "drizzle-orm";
import { foreignKey, pgTable, text, uuid } from "drizzle-orm/pg-core";

export const categories = pgTable(
  "categories",
  {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text("name").notNull(),
    slug: text('slug').notNull().unique(),
    parentId: uuid('parent_id'),
  },
  (t) => ({
    parentFk: foreignKey({
      columns: [t.parentId],
      foreignColumns: [t.id],
    }).onDelete('set null'),
  })
)

export const categoriesRelations = relations(categories, ({ many, one }) => ({
  parent: one(categories, {
    fields: [categories.parentId],
    references: [categories.id],
  }),
  children: many(categories),
}));
