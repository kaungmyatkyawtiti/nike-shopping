import { integer, jsonb, numeric, pgTable, real, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { products } from "./product-shema";
import { colors } from "./filter/color-schema";
import { sizes } from "./filter/size-schema";
import { orderItems } from "./order-schema";
import { productImages } from "./image-schema";
import { cartItems } from "./cart-schema";
import z from "zod";

export const productVariants = pgTable(
  'product_variants',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    productId: uuid('product_id')
      .notNull()
      .references(() => products.id, { onDelete: 'cascade' }),
    sku: text('sku').notNull().unique(),
    price: numeric('price', { precision: 10, scale: 2 }).notNull(),
    salePrice: numeric('sale_price', { precision: 10, scale: 2 }),
    colorId: uuid('color_id')
      .notNull()
      .references(() => colors.id, { onDelete: 'restrict' }),
    sizeId: uuid('size_id')
      .notNull()
      .references(() => sizes.id, { onDelete: 'restrict' }),
    inStock: integer('in_stock').notNull().default(0),
    weight: real('weight'),
    dimensions: jsonb('dimensions'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  }
);

// export const productVariantsRelations = relations(productVariants, ({ one, many }) => ({
//   product: one(products, {
//     fields: [productVariants.productId],
//     references: [products.id],
//   }),
//   color: one(colors, {
//     fields: [productVariants.colorId],
//     references: [colors.id],
//   }),
//   size: one(sizes, {
//     fields: [productVariants.sizeId],
//     references: [sizes.id],
//   }),
//   images: many(productImages),
//   orderItems: many(orderItems),
//   cartItems: many(cartItems),
// }));

export const insertVariantSchema = z.object({
  productId: z.uuid(),
  sku: z
    .string()
    .min(1),
  price: z.string(),
  salePrice: z
    .string()
    .optional()
    .nullable(),
  colorId: z
    .uuid(),
  sizeId: z.uuid(),
  inStock: z
    .number()
    .int()
    .nonnegative()
    .optional(),
  weight: z
    .number()
    .optional()
    .nullable(),
  dimensions: z
    .object({
      length: z.number(),
      width: z.number(),
      height: z.number(),
    })
    .partial()
    .optional()
    .nullable(),
  createdAt: z.date().optional(),
});

export const selectVariantSchema = insertVariantSchema.extend({
  id: z.uuid(),
});

export type InsertVariant = z.infer<typeof insertVariantSchema>;

export type SelectVariant = z.infer<typeof selectVariantSchema>;
