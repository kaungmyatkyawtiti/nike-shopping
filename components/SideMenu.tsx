import { cn } from "@/lib/utils";
import Logo from "./Logo";
import { Search, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { ModeToggle } from "./ModeToggle";

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}
const links = [
  { label: "Men", href: "/products?gender=men" },
  { label: "Women", href: "/products?gender=women" },
  { label: "Kids", href: "/products?gender=kids" },
  { label: "Collections", href: "/collections" },
  { label: "Contact", href: "/contact" },
] as const;

export default function SideMenu({
  isOpen,
  onClose
}: SideMenuProps) {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "fixed inset-y-0 h-screen left-0 z-50 w-full bg-black/40 shadow-xl lg:hidden hover-effect",
        isOpen ? "translate-x-0" : "-translate-x-full",
      )}
      onClick={onClose}
    >
      <div
        className="min-w-72 max-w-96 bg-card h-screen text-foreground/85 p-5 border-r border-r-border/50 flex flex-col gap-5 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <Button
            onClick={onClose}
            title="close"
            variant="ghost"
            size="icon-sm"
            className="rounded-full hover:bg-secondary"
          >
            <X size={18} />
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <Logo />
          <div className="lg:hidden">
            <ModeToggle />
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          {
            links.map((link, ind) =>
              <Link
                key={ind}
                href={link.href}
                className={cn(
                  "text-muted-foreground hover:text-shop-violet hover:bg-accent py-2 px-3 rounded-md font-semibold hover-effect",
                  pathname === link.href && "text-shop-violet bg-accent"
                )}
              >
                {link.label}
              </Link>
            )
          }
        </div>
      </div>
    </div >
  )
}
