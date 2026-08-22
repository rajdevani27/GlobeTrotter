"use client"

import { CalendarDays, Heart, MapPin, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Section } from "@/components/profile/controls"
import { favoritePlaces, savedItineraries, tripHistory } from "@/lib/profile-data"

export function TabTrips() {
  return (
    <div className="flex flex-col gap-6">
      <Section title="Trip History" description="A record of your completed adventures.">
        <ul className="flex flex-col gap-3">
          {tripHistory.map((t) => (
            <li
              key={t.id}
              className="flex flex-col gap-3 rounded-xl border border-border p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent text-xl" aria-hidden="true">
                  {t.emoji}
                </span>
                <div>
                  <p className="flex items-center gap-1 text-sm font-semibold text-foreground">
                    <MapPin className="size-3.5 text-primary" />
                    {t.destination}
                  </p>
                  <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <CalendarDays className="size-3" /> {t.dates}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Wallet className="size-3" /> Spent {t.budget}
                    </span>
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                View
              </Button>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Saved Itineraries" description="Trip plans you've bookmarked for later.">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {savedItineraries.map((it) => (
            <div key={it.id} className="rounded-xl border border-border p-4 transition-colors hover:border-primary/40">
              <p className="text-sm font-semibold text-foreground text-balance">{it.title}</p>
              <p className="mt-2 text-xs text-muted-foreground">
                {it.days} · {it.stops} stops
              </p>
              <Button variant="link" size="sm" className="mt-2 px-0">
                View itinerary
              </Button>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Favorite Places" description="Destinations you've marked as favorites.">
        <div className="flex flex-wrap gap-2">
          {favoritePlaces.map((p) => (
            <span
              key={p}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground"
            >
              <Heart className="size-3.5 text-primary" />
              {p}
            </span>
          ))}
        </div>
      </Section>
    </div>
  )
}
