import {
  MapPin,
  CalendarDays,
  Users,
  Wallet,
  Sparkles,
  Mountain,
  Camera,
  UtensilsCrossed,
  ShoppingBag,
  Palmtree,
  Landmark,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, inputClass } from "./fields";
import { PREFERENCES, type Category, type Trip } from "@/lib/itinerary-data";
import { cn } from "@/lib/utils";

const PREF_ICONS: Record<Category, typeof Mountain> = {
  Adventure: Mountain,
  Sightseeing: Camera,
  Food: UtensilsCrossed,
  Shopping: ShoppingBag,
  Relaxation: Palmtree,
  Culture: Landmark,
  Travel: MapPin,
};

interface TripDetailsProps {
  trip: Trip;
  onChange: (trip: Trip) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

export function TripDetails({ trip, onChange, onGenerate, isGenerating }: TripDetailsProps) {
  function togglePreference(pref: Category) {
    const has = trip.preferences.includes(pref);
    onChange({
      ...trip,
      preferences: has ? trip.preferences.filter((p) => p !== pref) : [...trip.preferences, pref],
    });
  }

  return (
    <section className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <div className="flex items-center gap-2 text-sm font-medium text-primary">
        <Sparkles className="size-4" />
        Step 1 · Trip details
      </div>
      <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-foreground text-balance sm:text-3xl">
        Create your itinerary
      </h2>
      <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-muted-foreground">
        Tell us where you&apos;re headed and what you love — we&apos;ll craft a smart day-by-day
        plan you can fully customize.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Field label="Destination" htmlFor="destination" className="sm:col-span-2 lg:col-span-1">
          <div className="relative">
            <MapPin className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              id="destination"
              value={trip.destination}
              onChange={(e) => onChange({ ...trip, destination: e.target.value })}
              placeholder="e.g. Paris, France"
              className={cn(inputClass, "pl-9")}
            />
          </div>
        </Field>

        <Field label="Start date" htmlFor="startDate">
          <div className="relative">
            <CalendarDays className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              id="startDate"
              type="date"
              value={trip.startDate}
              onChange={(e) => onChange({ ...trip, startDate: e.target.value })}
              className={cn(inputClass, "pl-9")}
            />
          </div>
        </Field>

        <Field label="End date" htmlFor="endDate">
          <div className="relative">
            <CalendarDays className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              id="endDate"
              type="date"
              value={trip.endDate}
              min={trip.startDate}
              onChange={(e) => onChange({ ...trip, endDate: e.target.value })}
              className={cn(inputClass, "pl-9")}
            />
          </div>
        </Field>

        <Field label="Travelers" htmlFor="travelers">
          <div className="relative">
            <Users className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              id="travelers"
              type="number"
              min={1}
              max={20}
              value={trip.travelers}
              onChange={(e) =>
                onChange({ ...trip, travelers: Math.max(1, Number(e.target.value) || 1) })
              }
              className={cn(inputClass, "pl-9")}
            />
          </div>
        </Field>

        <Field label="Budget (₹)" htmlFor="budget" className="sm:col-span-2 lg:col-span-1">
          <div className="relative">
            <Wallet className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              id="budget"
              type="number"
              min={0}
              step={1000}
              value={trip.budget}
              onChange={(e) =>
                onChange({ ...trip, budget: Math.max(0, Number(e.target.value) || 0) })
              }
              className={cn(inputClass, "pl-9")}
            />
          </div>
        </Field>
      </div>

      <div className="mt-6">
        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Travel preferences
        </span>
        <div className="mt-2.5 flex flex-wrap gap-2">
          {PREFERENCES.map((pref) => {
            const Icon = PREF_ICONS[pref];
            const active = trip.preferences.includes(pref);
            return (
              <button
                key={pref}
                type="button"
                onClick={() => togglePreference(pref)}
                aria-pressed={active}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all",
                  active
                    ? "border-primary bg-primary text-primary-foreground shadow-sm"
                    : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground",
                )}
              >
                <Icon className="size-4" />
                {pref}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-7 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          {trip.preferences.length > 0
            ? `Focusing on ${trip.preferences.join(" · ")}`
            : "Pick at least one preference to personalize your trip."}
        </p>
        <Button
          size="lg"
          onClick={onGenerate}
          disabled={isGenerating}
          className="h-11 px-6 text-sm"
        >
          {isGenerating ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Generating…
            </>
          ) : (
            <>
              <Sparkles className="size-4" />
              Generate itinerary
            </>
          )}
        </Button>
      </div>
    </section>
  );
}
