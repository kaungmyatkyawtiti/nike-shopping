import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import { ModeToggle } from "./ModeToggle";
import Navbar from "./Navbar";

export default function Header() {
  return (
    <header
      className="py-3 px-4 border-b border-border top-0 z-50 sticky backdrop-blur-md bg-background/60"
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
