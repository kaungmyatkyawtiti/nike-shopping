import { integer, jsonb, numeric, pgTable, real, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { products } from "./product-shema";
import { colors } from "./filter/color-schema";
import { sizes } from "./filter/size-schema";

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
