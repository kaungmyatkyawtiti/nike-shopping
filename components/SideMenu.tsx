import { cn } from "@/lib/utils";
import Logo from "./Logo";
import { Search, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { ModeToggle } from "./ModeToggle";
import { NAV_LINKS } from "./Navbar";

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

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
        className="max-w-72 bg-card h-screen text-foreground/85 p-5 border-r border-r-border/50 flex flex-col gap-5 overflow-y-auto"
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

        <div className="flex flex-col space-y-2">
          {
            NAV_LINKS.map((link, ind) =>
              <Link
                key={ind}
                href={link.href}
                className={cn(
                  "text-muted-foreground hover:text-shop-violet hover:bg-accent py-2 px-3 rounded-md font-medium hover-effect",
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
