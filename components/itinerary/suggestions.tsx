"use client"

import { useState } from "react"
import { Star, BedDouble, UtensilsCrossed, MapPin, Check, RefreshCw } from "lucide-react"
import { HOTELS, RESTAURANTS, type Hotel, type Restaurant } from "@/lib/itinerary-data"
import { cn } from "@/lib/utils"

interface SuggestionsProps {
  hotelId: string
  restaurantId: string
  onSelectHotel: (id: string) => void
  onSelectRestaurant: (id: string) => void
}

function inr(n: number) {
  return `₹${n.toLocaleString("en-IN")}`
}

export function Suggestions({ hotelId, restaurantId, onSelectHotel, onSelectRestaurant }: SuggestionsProps) {
  const [hotelOpen, setHotelOpen] = useState(false)
  const [restOpen, setRestOpen] = useState(false)

  const hotel = HOTELS.find((h) => h.id === hotelId) ?? HOTELS[0]
  const restaurant = RESTAURANTS.find((r) => r.id === restaurantId) ?? RESTAURANTS[0]

  return (
    <section className="rounded-3xl border border-border bg-card p-6 shadow-sm">
      <h3 className="font-display text-lg font-bold text-foreground">Stay & dine</h3>
      <p className="text-xs text-muted-foreground">Suggested picks — swap anytime</p>

      {/* Hotel */}
      <div className="mt-5">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <BedDouble className="size-4" /> Hotel
          </span>
          <button
            onClick={() => setHotelOpen((v) => !v)}
            className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-primary transition-colors hover:bg-accent"
          >
            <RefreshCw className="size-3.5" />
            {hotelOpen ? "Close" : "Change"}
          </button>
        </div>

        <div className="mt-2 rounded-2xl border border-border bg-secondary/60 p-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-display font-bold text-foreground">{hotel.name}</p>
              <p className="mt-0.5 inline-flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="size-3.5" />
                {hotel.location}
              </p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-lg bg-card px-2 py-1 text-xs font-semibold text-foreground shadow-sm">
              <Star className="size-3.5 fill-warning text-warning" />
              {hotel.rating}
            </span>
          </div>
          <p className="mt-2 text-sm font-bold text-primary">
            {inr(hotel.pricePerNight)}
            <span className="font-normal text-muted-foreground"> / night</span>
          </p>
        </div>

        {hotelOpen ? (
          <div className="mt-2 flex flex-col gap-2">
            {HOTELS.filter((h) => h.id !== hotel.id).map((h) => (
              <OptionRow
                key={h.id}
                title={h.name}
                subtitle={`${h.location} · ★ ${h.rating}`}
                price={`${inr(h.pricePerNight)}/night`}
                onSelect={() => {
                  onSelectHotel(h.id)
                  setHotelOpen(false)
                }}
              />
            ))}
          </div>
        ) : null}
      </div>

      {/* Restaurant */}
      <div className="mt-6">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <UtensilsCrossed className="size-4" /> Restaurant
          </span>
          <button
            onClick={() => setRestOpen((v) => !v)}
            className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-primary transition-colors hover:bg-accent"
          >
            <RefreshCw className="size-3.5" />
            {restOpen ? "Close" : "Change"}
          </button>
        </div>

        <div className="mt-2 rounded-2xl border border-border bg-secondary/60 p-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-display font-bold text-foreground">{restaurant.name}</p>
              <p className="mt-0.5 inline-flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="size-3.5" />
                {restaurant.location}
              </p>
            </div>
            <span className="rounded-lg bg-card px-2 py-1 text-xs font-semibold text-foreground shadow-sm">
              {restaurant.cuisine}
            </span>
          </div>
          <p className="mt-2 text-sm font-bold text-primary">
            ~{inr(restaurant.estimatedCost)}
            <span className="font-normal text-muted-foreground"> for two</span>
          </p>
        </div>

        {restOpen ? (
          <div className="mt-2 flex flex-col gap-2">
            {RESTAURANTS.filter((r) => r.id !== restaurant.id).map((r) => (
              <OptionRow
                key={r.id}
                title={r.name}
                subtitle={`${r.cuisine} · ${r.location}`}
                price={`~${inr(r.estimatedCost)}`}
                onSelect={() => {
                  onSelectRestaurant(r.id)
                  setRestOpen(false)
                }}
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}

function OptionRow({
  title,
  subtitle,
  price,
  onSelect,
}: {
  title: string
  subtitle: string
  price: string
  onSelect: () => void
}) {
  return (
    <button
      onClick={onSelect}
      className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-background p-3 text-left transition-colors hover:border-primary/50 hover:bg-accent"
    >
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-foreground">{title}</p>
        <p className="truncate text-xs text-muted-foreground">{subtitle}</p>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-foreground">{price}</span>
        <span className="flex size-6 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
          <Check className="size-3.5" />
        </span>
      </div>
    </button>
  )
}
