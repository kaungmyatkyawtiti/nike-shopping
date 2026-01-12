import Image from "next/image";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-dvh grid grid-cols-1 lg:grid-cols-2">
      <section className="hidden lg:flex flex-col justify-between bg-card p-10 border-r">
        <div className="flex items-center">
          <div className="h-9 w-9 rounded-md bg-orange-500 inline-flex items-center justify-center p-1">
            <Image
              src="/logo.svg"
              alt="Nike"
              width={20}
              height={20}
              className="w-auto h-auto"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Just Do It</h2>
          <p className="max-w-md text-foreground/85">
            Join millions of athletes and fitness enthusiasts who trust Nike for their performance needs.
          </p>
          <div className="flex gap-2" aria-hidden="true">
            <span className="h-2 w-2 rounded-full bg-white" />
            <span className="h-2 w-2 rounded-full bg-white/80" />
            <span className="h-2 w-2 rounded-full bg-white/60" />
          </div>
        </div>

        <p className="text-sm font-medium">© 2025 Nike. All rights reserved.</p>
      </section>

      <section className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">{children}</div>
      </section>
    </main>
  );
}
