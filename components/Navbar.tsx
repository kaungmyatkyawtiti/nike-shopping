"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "Men", href: "/products?gender=men" },
  { label: "Women", href: "/products?gender=women" },
  { label: "Kids", href: "/products?gender=kids" },
  { label: "Collections", href: "/collections" },
  { label: "Contact", href: "/contact" },
] as const;

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="hidden lg:inline-flex items-center gap-9 capitalize">
      {
        links.map((link, ind) =>
          <Link
            key={ind}
            href={link.href}
            className={cn(
              "relative hover:text-amber-400 group hover-effect",
              pathname === link.href && "text-amber-400"
            )}
          >
            {link.label}
            <span
              className={cn(
                "absolute left-0 -bottom-0.5 h-0.5 w-0 bg-amber-400 group-hover:w-full hover-effect",
                pathname === link.href && "w-full"
              )}
            />
          </Link>
        )
      }
    </nav>
  )
}
