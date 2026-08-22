import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarDays, Compass, MapPin, Pencil, Plus, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { RegionSelector } from "@/components/RegionSelector";
import { DestinationCard } from "@/components/DestinationCard";
import { TripCard } from "@/components/TripCard";
import { BudgetSummary } from "@/components/BudgetSummary";
import { QuickActionCard } from "@/components/QuickActionCard";
import { Footer } from "@/components/Footer";
import { destinations, formatINR, trips, upcomingTrip } from "@/data/mock";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GlobeTrotter — Plan Your Next Adventure" },
      {
        name: "description",
        content:
          "Discover destinations, organize multi-city itineraries and track your travel budget with GlobeTrotter.",
      },
      { property: "og:title", content: "GlobeTrotter — Plan Your Next Adventure" },
      {
        property: "og:description",
        content:
          "Discover destinations, organize multi-city itineraries and track your travel budget with GlobeTrotter.",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const [saved, setSaved] = useState<string[]>([]);

  const toggleSave = (id: string) => {
    setSaved((prev) => {
      const isSaved = prev.includes(id);
      const city = destinations.find((d) => d.id === id)?.city ?? "Destination";
      toast(isSaved ? `${city} removed from saved` : `${city} saved to your list`);
      return isSaved ? prev.filter((x) => x !== id) : [...prev, id];
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <RegionSelector />

        {/* Recommended destinations */}
        <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6">
          <div className="flex items-end justify-between gap-4">
            <div className="min-w-0">
              <h2 className="text-2xl font-bold sm:text-3xl">Recommended for you</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Handpicked places based on your travel style.
              </p>
            </div>
            <Link
              to="/explore"
              className="shrink-0 cursor-pointer text-sm font-semibold text-primary hover:underline"
            >
              View all →
            </Link>
          </div>

          <div className="no-scrollbar -mx-4 mt-6 flex gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
            {destinations.map((destination) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
                saved={saved.includes(destination.id)}
                onToggleSave={toggleSave}
              />
            ))}
          </div>
        </section>

        {/* Upcoming trip + budget */}
        <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6">
          <h2 className="text-2xl font-bold sm:text-3xl">Upcoming trip</h2>
          <div className="mt-6 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
            <article className="overflow-hidden rounded-3xl border border-border bg-card shadow-card">
              <div className="grid md:grid-cols-[minmax(0,240px)_1fr]">
                <img
                  src={upcomingTrip.image}
                  alt={upcomingTrip.name}
                  loading="lazy"
                  width={800}
                  height={600}
                  className="h-48 w-full object-cover md:h-full"
                />
                <div className="flex flex-col gap-4 p-6">
                  <div className="min-w-0">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/15 px-2.5 py-1 text-xs font-semibold text-brand">
                      <Sparkles className="size-3.5" /> 72% planned
                    </span>
                    <h3 className="mt-3 text-2xl font-bold">{upcomingTrip.name}</h3>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                      <MapPin className="size-4 shrink-0" />
                      {upcomingTrip.route}
                    </p>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                      <CalendarDays className="size-4 shrink-0" />
                      {upcomingTrip.dates}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {[
                      { label: "Days", value: `${upcomingTrip.days}` },
                      { label: "Cities", value: `${upcomingTrip.cities}` },
                      { label: "Budget", value: formatINR(upcomingTrip.budget) },
                      { label: "Estimated", value: formatINR(upcomingTrip.estimated) },
                    ].map((stat) => (
                      <div key={stat.label} className="rounded-2xl bg-secondary px-3 py-2">
                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                        <p className="truncate text-sm font-bold">{stat.value}</p>
                      </div>
                    ))}
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Planning progress</span>
                      <span>{upcomingTrip.progress}%</span>
                    </div>
                    <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${upcomingTrip.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Button asChild variant="hero" className="w-full rounded-full sm:w-auto">
                      <Link to="/itinerary">View Trip</Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full rounded-full sm:w-auto">
                      <Link to="/$feature" params={{ feature: "create" }}>
                        <Pencil /> Edit
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </article>

            <BudgetSummary />
          </div>
        </section>

        {/* Your trips */}
        <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6">
          <h2 className="text-2xl font-bold sm:text-3xl">Your trips</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {trips.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        </section>

        {/* Quick actions */}
        <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6">
          <h2 className="text-2xl font-bold sm:text-3xl">Quick actions</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <QuickActionCard
              icon={Plus}
              title="Plan a Trip"
              description="Create a new multi-city itinerary."
              to="/create"
            />
            <QuickActionCard
              icon={Compass}
              title="Explore"
              description="Discover destinations and activities."
              to="/explore"
            />
            <QuickActionCard
              icon={CalendarDays}
              title="Calendar"
              description="View your upcoming travel plans."
              to="/calendar"
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
