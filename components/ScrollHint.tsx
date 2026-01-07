import { ChevronRight } from "lucide-react";

export default function ScrollHint() {
  return (
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
      <div
        className="flex h-10 w-10 items-center justify-center rounded-full bg-accent shadow-sm"
      >
        <ChevronRight
          size={26}
          className="text-foreground animate-wiggle"
        />
      </div>

      <div
        className="absolute right-0 h-full w-18 bg-linear-to-l from-black/45 via-black/40 to-transparent"
      />
    </div>
  )
}
