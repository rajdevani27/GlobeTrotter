import { Link } from "@tanstack/react-router";
import { Globe2 } from "lucide-react";
import { cn } from "@/lib/utils";

type BrandProps = {
  className?: string;
  /** Renders on dark/photographic backgrounds. */
  onDark?: boolean;
};

export function Brand({ className, onDark = false }: BrandProps) {
  return (
    <Link
      to="/"
      aria-label="GlobeTrotter home"
      className={cn("inline-flex items-center gap-2.5 group", className)}
    >
      <span
        className={cn(
          "grid size-9 place-items-center rounded-xl transition-transform duration-300 group-hover:rotate-12",
          onDark ? "bg-background/15 text-primary-foreground" : "bg-primary text-primary-foreground",
        )}
      >
        <Globe2 className="size-5" aria-hidden="true" />
      </span>
      <span
        className={cn(
          "text-display text-xl font-semibold tracking-tight",
          onDark ? "text-primary-foreground" : "text-foreground",
        )}
      >
        GlobeTrotter
      </span>
    </Link>
  );
}
