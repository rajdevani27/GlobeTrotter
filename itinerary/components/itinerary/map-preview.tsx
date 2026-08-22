"use client"

import { useState } from "react"
import { MapPin, BedDouble, UtensilsCrossed, Camera, Route, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface MarkerData {
  id: string
  label: string
  x: number
  y: number
  type: "hotel" | "restaurant" | "activity"
}

interface MapPreviewProps {
  destination: string
}

const MARKERS: MarkerData[] = [
  { id: "m1", label: "Hôtel Lumière", x: 22, y: 68, type: "hotel" },
  { id: "m2", label: "Landmark Tower", x: 44, y: 40, type: "activity" },
  { id: "m3", label: "Grand Museum", x: 68, y: 30, type: "activity" },
  { id: "m4", label: "Le Petit Jardin", x: 80, y: 62, type: "restaurant" },
  { id: "m5", label: "Old Town", x: 54, y: 74, type: "activity" },
]

const LEGS = [
  { from: "m1", to: "m2", time: "25 min" },
  { from: "m2", to: "m3", time: "12 min" },
  { from: "m3", to: "m4", time: "18 min" },
  { from: "m4", to: "m5", time: "15 min" },
]

const MARKER_STYLES = {
  hotel: { icon: BedDouble, cls: "bg-chart-4 text-primary-foreground" },
  restaurant: { icon: UtensilsCrossed, cls: "bg-warning text-warning-foreground" },
  activity: { icon: Camera, cls: "bg-primary text-primary-foreground" },
} as const

export function MapPreview({ destination }: MapPreviewProps) {
  const [showRoute, setShowRoute] = useState(true)
  const byId = (id: string) => MARKERS.find((m) => m.id === id)!

  return (
    <section className="rounded-3xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-xl bg-accent text-primary">
            <MapPin className="size-5" />
          </span>
          <div>
            <h3 className="font-display text-lg font-bold text-foreground">Map preview</h3>
            <p className="text-xs text-muted-foreground">{destination || "Your destination"}</p>
          </div>
        </div>
        <Button
          variant={showRoute ? "default" : "outline"}
          size="sm"
          className="h-9"
          onClick={() => setShowRoute((v) => !v)}
        >
          <Route className="size-4" />
          {showRoute ? "Hide route" : "View route"}
        </Button>
      </div>

      <div className="relative mt-5 aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border bg-secondary">
        {/* stylized map base */}
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute -left-10 top-1/3 h-24 w-2/3 -rotate-6 rounded-full bg-primary/10"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-8 right-4 h-28 w-40 rounded-3xl bg-chart-3/15"
          aria-hidden="true"
        />

        {/* route lines */}
        {showRoute ? (
          <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
            {LEGS.map((leg) => {
              const a = byId(leg.from)
              const b = byId(leg.to)
              return (
                <line
                  key={`${leg.from}-${leg.to}`}
                  x1={`${a.x}%`}
                  y1={`${a.y}%`}
                  x2={`${b.x}%`}
                  y2={`${b.y}%`}
                  stroke="var(--primary)"
                  strokeWidth={2}
                  strokeDasharray="6 6"
                  strokeLinecap="round"
                />
              )
            })}
          </svg>
        ) : null}

        {/* travel-time labels */}
        {showRoute
          ? LEGS.map((leg) => {
              const a = byId(leg.from)
              const b = byId(leg.to)
              const mx = (a.x + b.x) / 2
              const my = (a.y + b.y) / 2
              return (
                <span
                  key={`t-${leg.from}-${leg.to}`}
                  className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-border bg-card px-2 py-0.5 text-[0.65rem] font-semibold text-muted-foreground shadow-sm"
                  style={{ left: `${mx}%`, top: `${my}%` }}
                >
                  {leg.time}
                </span>
              )
            })
          : null}

        {/* markers */}
        {MARKERS.map((m) => {
          const { icon: Icon, cls } = MARKER_STYLES[m.type]
          return (
            <div
              key={m.id}
              className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1"
              style={{ left: `${m.x}%`, top: `${m.y}%` }}
            >
              <span className={cn("flex size-8 items-center justify-center rounded-full shadow-md ring-2 ring-card", cls)}>
                <Icon className="size-4" />
              </span>
              <span className="max-w-24 truncate rounded-md bg-card/90 px-1.5 text-[0.65rem] font-medium text-foreground shadow-sm">
                {m.label}
              </span>
            </div>
          )
        })}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-primary" /> Activity
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-chart-4" /> Hotel
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-warning" /> Restaurant
        </span>
        <span className="ml-auto inline-flex items-center gap-1 font-medium text-primary">
          <Navigation className="size-3.5" />
          Route ready for live maps
        </span>
      </div>
    </section>
  )
}
