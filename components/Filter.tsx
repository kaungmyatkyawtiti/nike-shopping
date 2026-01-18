"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { getArrayParam, removeParams, toggleArrayParam } from "../lib/query";
import { Button } from "./ui/button";
import { GroupKey } from "@/types";
import FilterSection from "./FilterAccordion";

export default function Filters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = useMemo(() => `?${searchParams.toString()}`, [searchParams]);

  const [open, setOpen] = useState(false);

  const activeCounts = {
    gender: getArrayParam(search, "gender").length,
    size: getArrayParam(search, "size").length,
    color: getArrayParam(search, "color").length,
    price: getArrayParam(search, "price").length,
  };

  const handleToggle = (key: GroupKey, value: string) => {
    const url = toggleArrayParam(pathname, search, key, value);
    router.push(url, { scroll: false });
  };

  const handleClearAll = () => {
    const url = removeParams(pathname, search, ["gender", "size", "color", "price", "page"]);
    router.push(url, { scroll: false });
  };

  return (
    <>
      <div className="mb-4 md:hidden">
        <Button
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
        >
          Filters
        </Button>
      </div>

      <aside
        className="sticky top-20 hidden h-fit min-w-60 rounded-md border bg-card p-4 md:block mb-6"
      >
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-semibold">Filters</h3>
          <Button
            size="sm"
            onClick={handleClearAll}
          >
            Clear all
          </Button>
        </div>

        <FilterSection
          search={search}
          onToggle={handleToggle}
          activeCounts={activeCounts}
        />
      </aside>

      {open && (
        <div
          className="fixed inset-0 z-50 md:hidden"
          role="dialog"
          aria-modal="true">
          <div
            className="absolute inset-0 bg-black/40"
            aria-hidden="true"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-y-0 right-0 w-80 max-w-[80%] overflow-auto bg-sidebar p-4 shadow-lg">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="font-semibold">Filters</h3>
              <Button size="sm" onClick={handleClearAll}>
                Clear all
              </Button>
            </div>

            <FilterSection
              search={search}
              onToggle={handleToggle}
              activeCounts={activeCounts}
            />
          </div>
        </div>
      )}
    </>
  );
}
