import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { GroupKey } from "@/types";
import { ReactNode } from "react";
import { COLORS, DEFAULT_FILTER_SECTIONS, GENDERS, PRICES, SIZES } from "@/constants";
import { getArrayParam } from "@/lib/query";

interface FilterAccordionProps {
  value: GroupKey;
  title: string;
  children: ReactNode;
}

function FilterAccordion({
  value,
  title,
  children,
}: FilterAccordionProps) {
  return (
    <AccordionItem
      value={value}
      className="border-b"
    >
      <AccordionTrigger className="text-[16px]">
        {title}
      </AccordionTrigger>
      <AccordionContent>
        {children}
      </AccordionContent>
    </AccordionItem>
  );
}

interface FilterSectionProps {
  search: string;
  onToggle: (key: GroupKey, value: string) => void;
  activeCounts: Record<GroupKey, number>;
}

function getTitle(
  title: string,
  count?: number
): string {
  return count && count > 0 ? `${title} (${count})` : title;
}

export default function FilterSection({
  search,
  onToggle,
  activeCounts,
}: FilterSectionProps) {
  return (
    <Accordion
      type="multiple"
      defaultValue={DEFAULT_FILTER_SECTIONS}
    >
      <FilterAccordion
        value="gender"
        title={getTitle("Gender", activeCounts.gender)}
      >
        <ul className="space-y-3">
          {GENDERS.map((g) => {
            const checked = getArrayParam(search, "gender").includes(g);
            return (
              <li key={g} className="flex items-center gap-2">
                <input
                  id={`gender-${g}`}
                  type="checkbox"
                  className="h-4 w-4"
                  checked={checked}
                  onChange={() => onToggle("gender" as GroupKey, g)}
                />
                <label htmlFor={`gender-${g}`} className="text-[15px]">
                  {g[0].toUpperCase() + g.slice(1)}
                </label>
              </li>
            );
          })}
        </ul>
      </FilterAccordion>
      <FilterAccordion
        value="size"
        title={getTitle("Size", activeCounts.size)}
      >
        <ul className="grid grid-cols-4 gap-3">
          {SIZES.map((s) => {
            const checked = getArrayParam(search, "size").includes(s);
            return (
              <li key={s}>
                <label className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4"
                    checked={checked}
                    onChange={() => onToggle("size", s)}
                  />
                  <span className="text-[15px]">{s}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </FilterAccordion>
      <FilterAccordion
        value="color"
        title={getTitle("Color", activeCounts.color)}
      >
        <ul className="grid grid-cols-2 gap-2">
          {COLORS.map((c) => {
            const checked = getArrayParam(search, "color").includes(c);
            return (
              <li key={c} className="flex items-center gap-2">
                <input
                  id={`color-${c}`}
                  type="checkbox"
                  className="h-4 w-4"
                  checked={checked}
                  onChange={() => onToggle("color", c)}
                />
                <label htmlFor={`color-${c}`} className="text-[15px] capitalize">
                  {c}
                </label>
              </li>
            );
          })}
        </ul>
      </FilterAccordion>
      <FilterAccordion
        value="price"
        title={getTitle("Price", activeCounts.price)}
      >
        <ul className="space-y-3">
          {PRICES.map((p) => {
            const checked = getArrayParam(search, "price").includes(p.id);
            return (
              <li key={p.id} className="flex items-center gap-2">
                <input
                  id={`price-${p.id}`}
                  type="checkbox"
                  className="h-4 w-4"
                  checked={checked}
                  onChange={() => onToggle("price", p.id)}
                />
                <label htmlFor={`price-${p.id}`} className="text-[15px]">
                  {p.label}
                </label>
              </li>
            );
          })}
        </ul>
      </FilterAccordion>
    </Accordion>
  );
}
