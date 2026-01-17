import { cn } from "@/lib/utils";
import { Product } from "@/types";
import Image from "next/image";

export type BadgeTone = "red" | "green" | "orange";

export interface CardProps {
  product: Product;
  className?: string;
}

const toneToBg: Record<BadgeTone, string> = {
  red: "text-[--color-red]",
  green: "text-[--color-green]",
  orange: "text-[--color-orange]",
};

export default function Card({
  product,
  className,
}: CardProps) {
  const displayPrice =
    product.price === undefined ? undefined : typeof product.price === "number" ? `$${product.price.toFixed(2)}` : product.price;

  return (
    <article
      className={cn(
        "group rounded-md bg-card border border-border/60 hover:border-border overflow-hidden",
        className
      )}
    >
      <div className="relative aspect-square overflow-hidden rounded-t-md">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1280px) 360px, (min-width: 1024px) 300px, (min-width: 640px) 45vw, 90vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <div className="mb-1 flex items-baseline justify-between gap-3">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          {
            displayPrice && <span className="">{displayPrice}</span>
          }
        </div>
        {product.subtitle && <p className="description">{product.subtitle}</p>}
        {product.meta && (
          <p className="mt-1 description">
            {Array.isArray(product.meta) ? product.meta.join(" • ") : product.meta}
          </p>
        )}
      </div>
    </article>
  );
}
