import { SearchParams } from "@/types";
import { getParamArray } from "./products";

export function formatPriceRange(range: string) {
  const [min, max] = range.split("-");

  if (min && max) return `$${min} - $${max}`;
  if (min) return `Over $${min}`;
  return `$0 - $${max}`;
}

export function getActiveBadges(sp: SearchParams) {
  const badgeSources = [
    {
      key: "gender",
      format: (v: string) => v[0].toUpperCase() + v.slice(1),
    },
    {
      key: "size",
      format: (v: string) => `Size: ${v}`,
    },
    {
      key: "color",
      format: (v: string) => v[0].toUpperCase() + v.slice(1),
    },
    {
      key: "price",
      format: formatPriceRange,
    },
  ];

  return badgeSources.flatMap(({ key, format }) =>
    getParamArray(sp, key).map(format)
  );
}
