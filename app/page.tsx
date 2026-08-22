import { PageHeader, PageShell } from '@/components/gt/page-header'
import { SiteHeader } from '@/components/site-header'
import { SuggestionGrid } from '@/components/suggestion-grid'
import { TripForm } from '@/components/trip-form'

export default function CreateTripPage() {
  return (
    <div className="min-h-dvh bg-background">
      <SiteHeader />

      <PageShell>
        <PageHeader
          backLabel="My Trips"
          title="Create a new Trip"
          description="Name it, pick your dates and destination, then build the itinerary from suggested places and activities."
        />

        <div className="grid gap-10">
          <TripForm />
          <SuggestionGrid />
        </div>
      </PageShell>
    </div>
  )
}
