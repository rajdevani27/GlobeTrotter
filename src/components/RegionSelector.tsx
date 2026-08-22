import { useState } from "react";
import { toast } from "sonner";
import { regions } from "@/data/mock";
import { cn } from "@/lib/utils";

export function RegionSelector() {
  const [active, setActive] = useState<string>(regions[0]?.id ?? "");

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h2 className="text-2xl font-bold sm:text-3xl">Explore the world</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Find inspiration for your next journey.
      </p>

      <div className="no-scrollbar -mx-4 mt-5 flex gap-3 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
        {regions.map((region) => (
          <button
            key={region.id}
            onClick={() => {
              setActive(region.id);
              toast(`Showing ideas for ${region.name}`);
            }}
            className={cn(
              "flex shrink-0 cursor-pointer items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-all hover:-translate-y-0.5",
              active === region.id
                ? "border-primary bg-primary text-primary-foreground shadow-soft"
                : "border-border bg-card text-foreground hover:border-primary/40",
            )}
          >
            <span aria-hidden>{region.emoji}</span>
            {region.name}
          </button>
        ))}
      </div>
    </section>
  );
}
