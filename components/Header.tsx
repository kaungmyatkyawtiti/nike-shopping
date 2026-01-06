import Image from "next/image";
import Link from "next/link";
import Navbar from "./Navbar";
import Logo from "./Logo";

export default function Header() {
  return (
    <header className="sticky w-full backdrop-blur-md z-50 bg-white/20 dark:bg-background/60 top-0">
      <div className="flex items-center justify-between px-6 py-2">
        <Logo />
        <Navbar />
        <div className="flex items-center gap-3">
          <p>Search</p>
          <p>Mode</p>
        </div>
      </div>
    </header>
  )
}
