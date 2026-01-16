import { pgTable, uuid, timestamp, integer } from 'drizzle-orm/pg-core';
import { z } from 'zod';
import { guests } from './guest-schema';
import { productVariants } from './variant-schema';
import { users } from './auth-schema';

export const carts = pgTable(
  'carts',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
      .references(() => users.id, { onDelete: 'set null' }),
    guestId: uuid('guest_id')
      .references(() => guests.id, { onDelete: 'set null' }),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  }
);

export const cartItems = pgTable(
  'cart_items',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    cartId: uuid('cart_id')
      .notNull()
      .references(() => carts.id, { onDelete: 'cascade' }),
    productVariantId: uuid('product_variant_id')
      .notNull()
      .references(() => productVariants.id, { onDelete: 'restrict' }),
    quantity: integer('quantity').notNull().default(1),
  }
);

// export const cartsRelations = relations(carts, ({ many, one }) => ({
//   user: one(user, {
//     fields: [carts.userId],
//     references: [user.id],
//   }),
//   guest: one(guests, {
//     fields: [carts.guestId],
//     references: [guests.id],
//   }),
//   items: many(cartItems),
// }));
//
// export const cartItemsRelations = relations(cartItems, ({ one }) => ({
//   cart: one(carts, {
//     fields: [cartItems.cartId],
//     references: [carts.id],
//   }),
//   variant: one(productVariants, {
//     fields: [cartItems.productVariantId],
//     references: [productVariants.id],
//   }),
// }));

export const insertCartSchema = z.object({
  userId: z.string().uuid().optional().nullable(),
  guestId: z.string().uuid().optional().nullable(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const selectCartSchema = insertCartSchema.extend({
  id: z.string().uuid(),

});

export type InsertCart = z.infer<typeof insertCartSchema>;
export type SelectCart = z.infer<typeof selectCartSchema>;

export const insertCartItemSchema = z.object({
  cartId: z.string().uuid(),
  productVariantId: z.string().uuid(),
  quantity: z.number().int().min(1),
});

export const selectCartItemSchema = insertCartItemSchema.extend({
  id: z.string().uuid(),
});

export type InsertCartItem = z.infer<typeof insertCartItemSchema>;
export type SelectCartItem = z.infer<typeof selectCartItemSchema>;
