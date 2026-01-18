import Card from "@/components/Card";
import Filters from "@/components/Filter";
import Sort from "@/components/Sort";
import { Badge } from "@/components/ui/badge";
import { MOCK_PRODUCTS } from "@/constants";
import { getActiveBadges } from "@/lib/badges";
import { applyFilters, applySort } from "@/lib/products";
import { SearchParams } from "@/types";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;

  const filtered = applyFilters(MOCK_PRODUCTS, sp);
  const sorted = applySort(filtered, (sp.sort as string) || "featured");

  const activeBadges = getActiveBadges(sp);

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <header className="flex items-center justify-between py-6">
        <h2 className="text-lg">New ({sorted.length})</h2>
        <Sort />
      </header>

      {activeBadges.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {activeBadges.map((b, i) => (
            <Badge
              key={`${b}-${i}`}
            >
              {b}
            </Badge>
          ))}
        </div>
      )}

      <section className="grid grid-cols-1 gap-6 md:grid-cols-[240px_1fr]">
        <Filters />
        <div>
          {sorted.length === 0 ? (
            <div className="my-15 text-center">
              <p className="font-semibold">No products match your filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 pb-6">
              {sorted.map((p) => (
                <Card
                  key={p.id}
                  product={p}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
