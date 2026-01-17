import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ReactNode } from "react";

interface FilterAccordionProps {
  value: GroupKey;
  title: string;
  children: ReactNode;
}

export default function FilterAccordion({
  value,
  title,
  children,
}: FilterAccordionProps) {
  return (
    <AccordionItem
      value={value}
      className="border-b"
    >
      <AccordionTrigger className="py-4 text-body-medium">
        {title}
      </AccordionTrigger>
      <AccordionContent className="pt-3">
        {children}
      </AccordionContent>
    </AccordionItem>
  );
}
