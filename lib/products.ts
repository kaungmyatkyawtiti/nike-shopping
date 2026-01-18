import { Product, SearchParams } from "@/types";

function toArray(
  v: string | string[] | undefined
) {
  if (!v) return [];
  return Array.isArray(v) ? v : [v];
}

export function getParamArray(
  sp: SearchParams,
  key: string
) {
  const v = sp[key] ?? sp[`${key}[]`];

  return toArray(v);
}

function matchesRange(
  price: number,
  ranges: string[]
) {
  if (ranges.length === 0) return true;

  return ranges.some((r) => {
    const [minStr, maxStr] = r.split("-");
    const min = minStr ? Number(minStr) : 0;
    const max = maxStr ? Number(maxStr) : Infinity;
    return price >= min && price <= max;
  });
}

export function applyFilters(
  data: Product[],
  params: SearchParams
) {
  const genders = getParamArray(params, "gender");
  const sizes = getParamArray(params, "size");
  const colors = getParamArray(params, "color");
  const priceRanges = getParamArray(params, "price");

  return data.filter((p) => {
    const genderOk = genders.length ? genders.includes(p.gender) : true;
    const sizeOk = sizes.length ? sizes.some((s) => p.sizes.includes(s)) : true;
    const colorOk = colors.length ? colors.some((c) => p.colors.includes(c)) : true;
    const priceOk = matchesRange(p.price, priceRanges);
    return genderOk && sizeOk && colorOk && priceOk;
  });
}

export function applySort(
  data: Product[],
  sort?: string
) {
  const list = [...data];
  switch (sort) {
    case "price_desc":
      return list.sort((a, b) => b.price - a.price);
    case "price_asc":
      return list.sort((a, b) => a.price - b.price);
    case "newest":
      return list.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
    case "featured":
    default:
      return list;
  }
}
