"use client";

import { useState } from "react";
import { TextAlignStart } from "lucide-react";
import SideMenu from "./SideMenu";

export default function MobileMenu() {
  const [sideMenuOpen, isSideMenuOpen] = useState(false);

  return (
    <>
      <button
        title="menu"
        className="hover:text-shop-violet p-2 hover:bg-secondary rounded-full lg:hidden hover-effect"
        onClick={() => isSideMenuOpen(!sideMenuOpen)}
      >
        <TextAlignStart size={26} />
      </button>
      <SideMenu
        isOpen={sideMenuOpen}
        onClose={() => isSideMenuOpen(false)}
      />
    </>
  )
}
