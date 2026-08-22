import { CalendarDays, MapPin, Wallet } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { formatINR, type Trip } from "@/data/mock";
import { cn } from "@/lib/utils";

const statusStyles: Record<Trip["status"], string> = {
  Upcoming: "bg-primary/10 text-primary",
  Completed: "bg-secondary text-secondary-foreground",
  Planning: "bg-brand/15 text-brand",
};

export function TripCard({ trip }: { trip: Trip }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift">
      <div className="relative overflow-hidden">
        <img
          src={trip.image}
          alt={trip.name}
          loading="lazy"
          width={800}
          height={600}
          className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span
          className={cn(
            "absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-semibold",
            statusStyles[trip.status],
          )}
        >
          {trip.status}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="truncate text-lg font-bold">{trip.name}</h3>
        <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="size-3.5" />
            {trip.dates}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="size-3.5" />
            {trip.cities} {trip.cities === 1 ? "City" : "Cities"}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Wallet className="size-3.5" />
            {formatINR(trip.budget)}
          </span>
        </div>
        <Button asChild
          variant="outline"
          className="mt-auto w-full rounded-full"
        >
          <Link to="/itinerary">View Trip</Link>
        </Button>
      </div>
    </article>
  );
}
