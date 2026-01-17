import { randomUUID } from "crypto";
import {
  genders,
  colors,
  sizes,
  brands,
  categories,
  products,
  productVariants,
  productImages,
  users,
  guests,
} from "./schema";
import { eq } from "drizzle-orm";
import { db } from ".";

export async function seed() {
  try {
    console.log("Seeding base lookup tables...");

    await db
      .insert(genders)
      .values([
        { label: "Men", slug: "men" },
        { label: "Women", slug: "women" },
        { label: "Unisex", slug: "unisex" },
      ])
      .onConflictDoNothing({ target: genders.slug });

    await db
      .insert(colors)
      .values([
        { name: "Black", slug: "black", hexCode: "#000000" },
        { name: "White", slug: "white", hexCode: "#FFFFFF" },
        { name: "Red", slug: "red", hexCode: "#FF0000" },
      ])
      .onConflictDoNothing({ target: colors.slug });

    await db
      .insert(sizes)
      .values([
        { name: "US 8", slug: "us-8", sortOrder: 1 },
        { name: "US 9", slug: "us-9", sortOrder: 2 },
        { name: "US 10", slug: "us-10", sortOrder: 3 },
      ])
      .onConflictDoNothing({ target: sizes.slug });

    await db
      .insert(brands)
      .values([
        { name: "Nike", slug: "nike", logoUrl: "/logos/nike.png" },
        { name: "Adidas", slug: "adidas", logoUrl: "/logos/adidas.png" },
      ])
      .onConflictDoNothing({ target: brands.slug });

    await db
      .insert(categories)
      .values([{ name: "Shoes", slug: "shoes", parentId: null }])
      .onConflictDoNothing({ target: categories.slug });

    await db
      .insert(users)
      .values([
        {
          name: "Dev User",
          email: "dev@example.com",
          emailVerified: true,
          image: null,
        },
      ])
      .onConflictDoNothing({ target: users.email });

    await db
      .insert(guests)
      .values([{ accessToken: "guest-token-1" }])
      .onConflictDoNothing({ target: guests.accessToken });

    const [men] = await db.select().from(genders).where(eq(genders.slug, "men"));
    const [nike] = await db.select().from(brands).where(eq(brands.slug, "nike"));
    const [shoes] = await db.select().from(categories).where(eq(categories.slug, "shoes"));
    const [black] = await db.select().from(colors).where(eq(colors.slug, "black"));
    const [size9] = await db.select().from(sizes).where(eq(sizes.slug, "us-9"));

    if (!men || !nike || !shoes || !black || !size9) {
      throw new Error("Required lookup rows missing after insert");
    }

    console.log("Seeding a sample product + variant...");

    const insertedProducts = await db
      .insert(products)
      .values({
        name: "Nike Air Max",
        description: "Classic running shoe.",
        categoryId: shoes.id,
        genderId: men.id,
        brandId: nike.id,
        isPublished: true,
        defaultVariantId: randomUUID(),
      })
      .onConflictDoNothing()
      .returning();

    let productRow = insertedProducts[0];
    if (!productRow) {
      const [found] = await db.select().from(products).where(eq(products.name, "Nike Air Max"));
      productRow = found;
    }

    if (!productRow) {
      throw new Error("Failed to create or find product");
    }

    const insertedVariants = await db
      .insert(productVariants)
      .values({
        productId: productRow.id,
        sku: "NIKE-AIR-001",
        price: "120.00",
        salePrice: null,
        colorId: black.id,
        sizeId: size9.id,
        inStock: 100,
      })
      .onConflictDoNothing()
      .returning();

    let variantRow = insertedVariants[0];
    if (!variantRow) {
      const [foundV] = await db
        .select()
        .from(productVariants)
        .where(eq(productVariants.sku, "NIKE-AIR-001"));
      variantRow = foundV;
    }

    if (!variantRow) {
      throw new Error("Failed to create or find product variant");
    }

    await db.update(products).set({ defaultVariantId: variantRow.id }).where(eq(products.id, productRow.id));

    await db
      .insert(productImages)
      .values({ productId: productRow.id, variantId: variantRow.id, url: "/shoes/shoe-10.avif", isPrimary: true })
      .onConflictDoNothing()
      .returning();

    console.log("Seeding complete.");
  } catch (err) {
    console.error("Seed failed:", err);
    throw err;
  }
}

if (require.main === module) {
  seed()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}
