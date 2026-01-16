import { defineRelations } from "drizzle-orm";
import * as schema from "./schema"

export const relations = defineRelations(schema, (r) => ({
  // Auth
  users: {
    sessions: r.many.sessions(),
    accounts: r.many.accounts(),
  },

  sessions: {
    user: r.one.users({
      from: r.sessions.userId,
      to: r.users.id,
    }),
  },

  accounts: {
    user: r.one.users({
      from: r.accounts.userId,
      to: r.users.id,
    }),
  },

  // Products
  products: {
    category: r.one.categories({
      from: r.products.categoryId,
      to: r.categories.id,
    }),
    gender: r.one.genders({
      from: r.products.genderId,
      to: r.genders.id,
    }),
    brand: r.one.brands({
      from: r.products.brandId,
      to: r.brands.id,
    }),
  },

  // Categories
  categories: {
    parent: r.one.categories({
      from: r.categories.parentId,
      to: r.categories.id,
    }),
    children: r.many.categories(),
  },

  // Brands
  brands: {
    products: r.many.products(),
  },

  // Colors
  colors: {
    varants: r.many.productVariants(),
  },

  // Sizes 
  sizes: {
    variants: r.many.productVariants(),
  },

  // Genders
  genders: {
    products: r.many.products(),
  },

  // Product Images
  productImages: {
    product: r.one.products({
      from: r.productImages.productId,
      to: r.products.id,
    }),
    variant: r.one.productVariants({
      from: r.productImages.variantId,
      to: r.productVariants.id,
    })
  },

  // Product Variants
  productVariants: {
    product: r.one.products({
      from: r.productVariants.productId,
      to: r.products.id,
    }),
    color: r.one.colors({
      from: r.productVariants.colorId,
      to: r.colors.id,
    }),
    size: r.one.sizes({
      from: r.productVariants.sizeId,
      to: r.sizes.id,
    }),
    images: r.many.productImages(),
    orderItems: r.many.orderItems(),
    cartItems: r.many.cartItems(),
  },

  // Collections
  collections: {
    junctions: r.many.productCollections(),
  },

  // Product Collections
  productCollections: {
    collection: r.one.collections({
      from: r.productCollections.collectionId,
      to: r.collections.id,
    }),
    product: r.one.products({
      from: r.productCollections.productId,
      to: r.products.id,
    })
  },

  // Carts
  carts: {
    user: r.one.users({
      from: r.carts.userId,
      to: r.users.id,
    }),
    guest: r.one.guests({
      from: r.carts.guestId,
      to: r.guests.id,
    }),
    items: r.many.cartItems(),
  },

  // Cart Items
  cartItems: {
    cart: r.one.carts({
      from: r.cartItems.cartId,
      to: r.carts.id,
    }),
    variant: r.one.productVariants({
      from: r.cartItems.productVariantId,
      to: r.productVariants.id,
    }),
  },

  // Address 
  addresses: {
    user: r.one.users({
      from: r.addresses.userId,
      to: r.users.id,
    })
  },

  // Orders 
  orders: {
    user: r.one.users({
      from: r.orders.userId,
      to: r.users.id,
    }),
    shippingAddress: r.one.addresses({
      from: r.orders.shippingAddressId,
      to: r.addresses.id,
    }),
    billingAddress: r.one.addresses({
      from: r.orders.billingAddressId,
      to: r.addresses.id,
    }),
    items: r.many.orderItems(),
  },

  // Order Items
  orderItems: {
    order: r.one.orders({
      from: r.orderItems.orderId,
      to: r.orders.id,
    }),
    variant: r.one.productVariants({
      from: r.orderItems.productVariantId,
      to: r.productVariants.id,
    }),
  },

  // Payments
  payments: {
    order: r.one.orders({
      from: r.payments.orderId,
      to: r.orders.id,
    })
  },

  // Reviews 
  reviews: {
    product: r.one.products({
      from: r.reviews.productId,
      to: r.products.id,
    }),
    user: r.one.users({
      from: r.reviews.userId,
      to: r.users.id,
    })
  },

  // Wish Lists
  wishlists: {
    user: r.one.users({
      from: r.wishlists.userId,
      to: r.users.id,
    }),
    product: r.one.products({
      from: r.wishlists.productId,
      to: r.products.id,
    })
  }
} as const));
