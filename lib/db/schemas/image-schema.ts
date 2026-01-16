import { pgTable, text, uuid, integer, boolean } from 'drizzle-orm/pg-core';
import { z } from 'zod';
import { products } from './product-shema';
import { productVariants } from './variant-schema';

export const productImages = pgTable(
  'product_images',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    productId: uuid('product_id')
      .notNull()
      .references(() => products.id, { onDelete: 'cascade' }),
    variantId: uuid('variant_id')
      .references(() => productVariants.id, { onDelete: 'set null' }),
    url: text('url').notNull(),
    sortOrder: integer('sort_order').notNull().default(0),
    isPrimary: boolean('is_primary').notNull().default(false),
  }
);

// export const productImagesRelations = relations(productImages, ({ one }) => ({
//   product: one(products, {
//     fields: [productImages.productId],
//     references: [products.id],
//   }),
//   variant: one(productVariants, {
//     fields: [productImages.variantId],
//     references: [productVariants.id],
//   }),
// }));

export const insertProductImageSchema = z.object({
  productId: z.uuid(),
  variantId: z
    .uuid()
    .optional()
    .nullable(),
  url: z
    .string()
    .min(1),
  sortOrder: z
    .number()
    .int()
    .optional(),
  isPrimary: z
    .boolean()
    .optional(),
});

export const selectProductImageSchema = insertProductImageSchema.extend({
  id: z.uuid(),
});

export type InsertProductImage = z.infer<typeof insertProductImageSchema>;
export type SelectProductImage = z.infer<typeof selectProductImageSchema>;
