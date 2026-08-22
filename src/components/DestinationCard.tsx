import { Heart, MapPin, Star, Wallet } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import type { Destination } from "@/data/mock";
import { cn } from "@/lib/utils";

interface Props {
  destination: Destination;
  saved: boolean;
  onToggleSave: (id: string) => void;
}

export function DestinationCard({ destination, saved, onToggleSave }: Props) {
  return (
    <article className="group flex w-[260px] shrink-0 flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift sm:w-auto">
      <div className="relative overflow-hidden">
        <img
          src={destination.image}
          alt={`${destination.city}, ${destination.country}`}
          loading="lazy"
          width={800}
          height={600}
          className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <button
          aria-label={saved ? "Remove from saved" : "Save destination"}
          onClick={() => onToggleSave(destination.id)}
          className="absolute right-3 top-3 grid size-9 cursor-pointer place-items-center rounded-full bg-card/90 text-foreground shadow-soft transition-transform hover:scale-110"
        >
          <Heart
            className={cn("size-4.5", saved && "fill-brand text-brand")}
          />
        </button>
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-card/90 px-2.5 py-1 text-xs font-semibold">
          <Star className="size-3.5 fill-brand text-brand" />
          {destination.rating}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="min-w-0">
          <h3 className="truncate text-lg font-bold">{destination.city}</h3>
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="size-3.5 shrink-0" />
            {destination.country}
          </p>
        </div>
        <p className="text-sm text-muted-foreground">{destination.description}</p>
        <div className="mt-auto flex items-center justify-between gap-2 pt-1">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
            <Wallet className="size-3.5" />
            {destination.cost}
          </span>
          <Button
            size="sm"
            variant="hero"
            className="rounded-full"
            onClick={() => toast(`${destination.city} details coming soon`)}
          >
            View
          </Button>
        </div>
      </div>
    </article>
  );
}
