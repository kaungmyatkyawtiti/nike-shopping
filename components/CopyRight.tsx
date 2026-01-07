import Image from "next/image";
import Link from "next/link";

export default function CopyRight() {
  return (
    <div className="border-t border-border">
      <div className="mx-auto max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-4 px-4 py-6">
        <div className="flex items-center gap-2">
          <Image src="/globe.svg" alt="" width={16} height={16} />
          <span>Croatia</span>
          <span className="text-[15px] font-medium">© 2025 Nike, Inc. All Rights Reserved</span>
        </div>
        <ul className="flex items-center gap-6 text-[15px] font-medium">
          {["Guides", "Terms of Sale", "Terms of Use", "Nike Privacy Policy"].map((t) => (
            <li key={t}>
              <Link href="#">{t}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

