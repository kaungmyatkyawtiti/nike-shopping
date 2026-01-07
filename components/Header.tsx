// import Image from "next/image";
// import Link from "next/link";
// import Navbar from "./Navbar";
// import Logo from "./Logo";
// import { ModeToggle } from "./ModeToggle";
//
// export default function Header() {
//   return (
//     <header className="sticky w-full backdrop-blur-md z-50 bg-white/20 dark:bg-background/60 top-0">
//       <div className="flex items-center justify-between px-6 py-2">
//         <Logo />
//         <Navbar />
//         <div className="flex items-center gap-3">
//           <p>Search</p>
//           <ModeToggle />
//         </div>
//       </div>
//     </header>
//   )
// }
//
// "use client";
//
// import Link from "next/link";
// import Navbar from "./Navbar";
// import Logo from "./Logo";
// import { ModeToggle } from "./ModeToggle";
// import { ShoppingBag, Search } from "lucide-react";
//
// export default function Header() {
//   return (
//     <header className="sticky top-0 z-50 w-full border-b bg-background/70 backdrop-blur">
//       <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
//         {/* Left: Logo */}
//         <div className="flex items-center gap-3">
//           <Logo />
//         </div>
//
//         {/* Center: Desktop Nav */}
//         <Navbar />
//
//         {/* Right: Actions */}
//         <div className="flex items-center gap-4">
//           <button className="hidden sm:inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground">
//             <Search className="h-5 w-5" />
//           </button>
//
//           <Link
//             href="/cart"
//             className="hidden sm:inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
//           >
//             My Cart (2)
//           </Link>
//
//           <ModeToggle />
//         </div>
//       </div>
//     </header>
//   );
// }
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import { ModeToggle } from "./ModeToggle";
import Navbar from "./Navbar";

export default function Header() {
  return (
    <header
      className="py-3 px-2 border-b border-border top-0 z-50 sticky backdrop-blur-md bg-background/60"
    >
      <div
        className="flex items-center justify-between text-foreground/80 mx-auto max-w-5xl"
      >
        <div className="flex items-center gap-2">
          <MobileMenu />
          <Logo />
        </div>

        <Navbar />

        <div className="flex items-center gap-4">
          <p>Search</p>
          <p>My Cart</p>
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
