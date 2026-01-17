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
        "group rounded-md border border-border/60 hover:border-border overflow-hidden",
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

        <div className="absolute inset-0 bg-linear-to-t from-black/75 to-transparent" />

        <div className="absolute bottom-0 left-0 w-full p-4 space-y-1">
          <h3 className="text-lg font-semibold text-white">
            {product.name}
          </h3>
          {displayPrice && (
            <span className="text-sm text-white/90">
              {displayPrice}
            </span>
          )}
        </div>
      </div>

      {/* <div className="p-4"> */}
      {/*   <h3 className="text-lg font-semibold">{product.name}</h3> */}
      {/*   { */}
      {/*     displayPrice && <span className="">{displayPrice}</span> */}
      {/*   } */}
      {/*   {product.subtitle && <p className="description">{product.subtitle}</p>} */}
      {/*   {product.meta && ( */}
      {/*     <p className="mt-1 description"> */}
      {/*       {Array.isArray(product.meta) ? product.meta.join(" • ") : product.meta} */}
      {/*     </p> */}
      {/*   )} */}
      {/* </div> */}
    </article>
  );
}
