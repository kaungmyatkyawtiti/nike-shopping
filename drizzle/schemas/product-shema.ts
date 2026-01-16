import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { categories } from "./category-schema";
import { brands } from "./brand-schema";
import { relations } from "drizzle-orm";
import { genders } from "./filter/gender-schema";
import z from "zod";

export const products = pgTable(
  "products",
  {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text("name").notNull(),
    description: text("description").notNull(),
    categoryId: uuid("category_id")
      .notNull()
      .references(() => categories.id, { onDelete: "set null" }),
    genderId: uuid("gender_id")
      .notNull()
      .references(() => genders.id, { onDelete: "set null" }),
    brandId: uuid("brand_id")
      .notNull()
      .references(() => brands.id, { onDelete: "set null" }),
    isPublished: boolean('is_published').notNull().default(false),
    defaultVariantId: uuid('default_variant_id').primaryKey(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  }
)

export const productsRelations = relations(products, ({ one }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  gender: one(genders, {
    fields: [products.genderId],
    references: [genders.id],
  }),
  brand: one(brands, {
    fields: [products.brandId],
    references: [brands.id],
  }),
}));

export const insertProductSchema = z.object({
  name: z
    .string()
    .min(1),
  description: z
    .string()
    .min(1),
  categoryId: z
    .uuid()
    .optional()
    .nullable(),
  genderId: z
    .uuid()
    .optional()
    .nullable(),
  brandId: z
    .uuid()
    .optional()
    .nullable(),
  isPublished: z
    .boolean()
    .optional(),
  defaultVariantId: z
    .uuid()
    .optional()
    .nullable(),
  createdAt: z
    .date()
    .optional(),
  updatedAt: z
    .date()
    .optional(),
});

export const selectProductSchema = insertProductSchema.extend({
  id: z.uuid(),
});

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type SelectProduct = z.infer<typeof selectProductSchema>;
