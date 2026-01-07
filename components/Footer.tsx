import Image from "next/image";
import Link from "next/link";
import CopyRight from "./CopyRight";

const columns = [
  {
    title: "Featured",
    links: ["Air Force 1", "Huarache", "Air Max 90", "Air Max 95"],
  },
  {
    title: "Shoes",
    links: ["All Shoes", "Custom Shoes", "Jordan Shoes", "Running Shoes"],
  },
  {
    title: "Clothing",
    links: ["All Clothing", "Modest Wear", "Hoodies & Pullovers", "Shirts & Tops"],
  },
  {
    title: "Kids'",
    links: [
      "Infant & Toddler Shoes",
      "Kids' Shoes",
      "Kids' Jordan Shoes",
      "Kids' Basketball Shoes",
    ],
  },
] as const;

const socialLinks = [
  { src: "/x.svg", alt: "X" },
  { src: "/facebook.svg", alt: "Facebook" },
  { src: "/instagram.svg", alt: "Instagram" },
]

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-12 xl:grid-cols-12">
          <div className="xl:col-span-3">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.svg" alt="Logo" width={40} height={40} />
              <span className="text-xl font-semibold tracking-tight">
                Nike
              </span>
            </Link>

            <p className="mt-4 max-w-xs text-[16px] text-muted-foreground">
              Bringing you the best shoes and apparel for everyday performance.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-4 xl:col-span-7">
            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="mb-4 font-semibold uppercase tracking-wide text-foreground">
                  {col.title}
                </h4>

                <ul className="space-y-3">
                  {col.links.map((l) => (
                    <li key={l}>
                      <Link
                        href="#"
                        className="text-[16px] text-muted-foreground hover:text-foreground hover:underline"
                      >
                        {l}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex items-start gap-3 xl:col-span-2 xl:justify-end">
            {socialLinks.map((s) => (
              <Link
                key={s.alt}
                href="#"
                aria-label={s.alt}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-muted dark:bg-white/80 hover:bg-input hover:dark:bg-white"
              >
                <Image
                  src={s.src}
                  alt={s.alt}
                  width={16}
                  height={16}
                  className="opacity-80"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <CopyRight />
    </footer>
  );
}
