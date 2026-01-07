import Image from "next/image";

export type BadgeTone = "red" | "green" | "orange";

export interface ProductCardProps {
  title: string;
  description?: string;
  subtitle?: string;
  meta?: string | string[];
  imageSrc: string;
  imageAlt?: string;
  price?: string | number;
  href?: string;
  badge?: { label: string; tone?: BadgeTone };
  className?: string;
}

const toneToBg: Record<BadgeTone, string> = {
  red: "text-[--color-red]",
  green: "text-[--color-green]",
  orange: "text-[--color-orange]",
};

export default function ProductCard({
  title,
  description,
  subtitle,
  meta,
  imageSrc,
  imageAlt = title,
  price,
  href,
  badge,
  className = "",
}: ProductCardProps) {
  const displayPrice =
    price === undefined ? undefined : typeof price === "number" ? `$${price.toFixed(2)}` : price;

  return (
    <article
      className="group min-w-60 rounded-md bg-card border border-border/60 hover:border-border overflow-hidden"
    >
      <div className="relative aspect-square rounded-t-md">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          loading="eager"
          sizes="auto"
          className="object-cover md:group-hover:scale-105"
        />
      </div>

      <div className="p-4">
        <div className="mb-1 flex items-baseline justify-between gap-3">
          <h3 className="text-heading-3 text-dark-900">{title}</h3>
          {displayPrice && <span className="text-body-medium text-dark-900">{displayPrice}</span>}
        </div>
        {description && <p className="text-body text-dark-700">{description}</p>}
        {subtitle && <p className="text-body text-dark-700">{subtitle}</p>}
        {meta && (
          <p className="mt-1 text-caption text-dark-700">
            {Array.isArray(meta) ? meta.join(" • ") : meta}
          </p>
        )}
      </div>
    </article>
  )
}
