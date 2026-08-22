"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { Globe, Share2, FileDown, Save, Sparkles, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TripDetails } from "@/components/itinerary/trip-details"
import { ItineraryTimeline } from "@/components/itinerary/itinerary-timeline"
import { BudgetSummary } from "@/components/itinerary/budget-summary"
import { MapPreview } from "@/components/itinerary/map-preview"
import { Suggestions } from "@/components/itinerary/suggestions"
import { TripReminders } from "@/components/itinerary/trip-reminders"
import { ActivityDialog } from "@/components/itinerary/activity-dialog"
import { ShareDialog, ExportDialog } from "@/components/itinerary/share-dialogs"
import { Toast } from "@/components/itinerary/toast"
import {
  DEFAULT_TRIP,
  HOTELS,
  RESTAURANTS,
  categoryTotals,
  generateItinerary,
  type Activity,
  type DayPlan,
  type Trip,
} from "@/lib/itinerary-data"

export default function Page() {
  const [trip, setTrip] = useState<Trip>(DEFAULT_TRIP)
  const [days, setDays] = useState<DayPlan[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [hasItinerary, setHasItinerary] = useState(false)

  const [hotelId, setHotelId] = useState(HOTELS[0].id)
  const [restaurantId, setRestaurantId] = useState(RESTAURANTS[0].id)

  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<Activity | null>(null)
  const [defaultDay, setDefaultDay] = useState(1)

  const [shareOpen, setShareOpen] = useState(false)
  const [exportOpen, setExportOpen] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  const numDays = days.length || 1
  const numNights = Math.max(1, numDays - 1)

  const totals = useMemo(() => {
    const base = categoryTotals(days)
    const hotel = HOTELS.find((h) => h.id === hotelId) ?? HOTELS[0]
    const restaurant = RESTAURANTS.find((r) => r.id === restaurantId) ?? RESTAURANTS[0]
    base.Hotels = hotel.pricePerNight * numNights
    base.Food += restaurant.estimatedCost * numDays
    if (base.Flights === 0) base.Flights = 15000
    return base
  }, [days, hotelId, restaurantId, numDays, numNights])

  const total = useMemo(() => Object.values(totals).reduce((s, v) => s + v, 0), [totals])

  function handleGenerate() {
    setIsGenerating(true)
    setTimeout(() => {
      setDays(generateItinerary(trip))
      setHasItinerary(true)
      setIsGenerating(false)
      setToast("Itinerary generated for " + (trip.destination || "your trip"))
    }, 900)
  }

  function openAdd(day: number) {
    setEditing(null)
    setDefaultDay(day)
    setDialogOpen(true)
  }

  function openEdit(activity: Activity) {
    setEditing(activity)
    setDefaultDay(activity.day)
    setDialogOpen(true)
  }

  function saveActivity(activity: Activity) {
    setDays((prev) => {
      // remove existing instance (in case day changed)
      const cleaned = prev.map((d) => ({
        ...d,
        activities: d.activities.filter((a) => a.id !== activity.id),
      }))
      return cleaned.map((d) => {
        if (d.day !== activity.day) return d
        const activities = [...d.activities, activity].sort((a, b) => a.time.localeCompare(b.time))
        return { ...d, activities }
      })
    })
    setToast(editing ? "Activity updated" : "Activity added")
  }

  function deleteActivity(day: number, id: string) {
    setDays((prev) =>
      prev.map((d) => (d.day === day ? { ...d, activities: d.activities.filter((a) => a.id !== id) } : d)),
    )
    setToast("Activity removed")
  }

  function moveActivity(day: number, index: number, direction: -1 | 1) {
    setDays((prev) =>
      prev.map((d) => {
        if (d.day !== day) return d
        const next = [...d.activities]
        const target = index + direction
        if (target < 0 || target >= next.length) return d
        ;[next[index], next[target]] = [next[target], next[index]]
        return { ...d, activities: next }
      }),
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
          <div className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Globe className="size-5" />
            </span>
            <div className="leading-tight">
              <span className="font-display text-base font-bold text-foreground">GlobeTrotter</span>
              <span className="block text-xs text-muted-foreground">Itinerary Builder</span>
            </div>
          </div>
          {hasItinerary ? (
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-9" onClick={() => setShareOpen(true)}>
                <Share2 className="size-4" />
                <span className="hidden sm:inline">Share</span>
              </Button>
              <Button variant="outline" size="sm" className="h-9" onClick={() => setExportOpen(true)}>
                <FileDown className="size-4" />
                <span className="hidden sm:inline">Export</span>
              </Button>
              <Button size="sm" className="h-9" onClick={() => setToast("Itinerary saved to your trips")}>
                <Save className="size-4" />
                <span className="hidden sm:inline">Save</span>
              </Button>
            </div>
          ) : null}
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        <TripDetails trip={trip} onChange={setTrip} onGenerate={handleGenerate} isGenerating={isGenerating} />

        {!hasItinerary ? (
          <section className="mt-8 flex flex-col items-center rounded-3xl border border-dashed border-border bg-card/50 px-6 py-14 text-center">
            <div className="relative size-40 sm:size-52">
              <Image
                src="/images/trip-empty-state.png"
                alt="Illustration of a world map with a travel route and location pins"
                fill
                className="object-contain"
                priority
              />
            </div>
            <h2 className="mt-6 font-display text-xl font-bold text-foreground text-balance sm:text-2xl">
              Your adventure starts here
            </h2>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground text-pretty">
              Fill in your trip details above and hit{" "}
              <span className="font-medium text-foreground">Generate itinerary</span> to see a personalized
              day-by-day plan, budget breakdown and route preview.
            </p>
            <Button size="lg" className="mt-6 h-11 px-6" onClick={handleGenerate} disabled={isGenerating}>
              <Sparkles className="size-4" />
              Generate my itinerary
            </Button>
          </section>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
                    {trip.destination || "Your trip"}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {numDays} {numDays === 1 ? "day" : "days"} · {trip.travelers}{" "}
                    {trip.travelers === 1 ? "traveler" : "travelers"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="h-9" onClick={handleGenerate}>
                    <RotateCcw className="size-4" />
                    Regenerate
                  </Button>
                  <Button size="sm" className="h-9" onClick={() => openAdd(1)}>
                    <Sparkles className="size-4" />
                    Add activity
                  </Button>
                </div>
              </div>

              <ItineraryTimeline
                days={days}
                onEditActivity={openEdit}
                onDeleteActivity={deleteActivity}
                onMoveActivity={moveActivity}
                onAddActivity={openAdd}
              />
            </div>

            <aside className="flex flex-col gap-6 lg:sticky lg:top-20 lg:h-fit">
              <BudgetSummary totals={totals} total={total} budget={trip.budget} />
              <MapPreview destination={trip.destination} />
              <Suggestions
                hotelId={hotelId}
                restaurantId={restaurantId}
                onSelectHotel={(id) => {
                  setHotelId(id)
                  setToast("Hotel updated")
                }}
                onSelectRestaurant={(id) => {
                  setRestaurantId(id)
                  setToast("Restaurant updated")
                }}
              />
              <TripReminders days={days} />
            </aside>
          </div>
        )}
      </div>

      <ActivityDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={saveActivity}
        editing={editing}
        numDays={numDays}
        defaultDay={defaultDay}
      />
      <ShareDialog open={shareOpen} onClose={() => setShareOpen(false)} destination={trip.destination} />
      <ExportDialog open={exportOpen} onClose={() => setExportOpen(false)} />
      <Toast message={toast} onDone={() => setToast(null)} />
    </main>
  )
}
