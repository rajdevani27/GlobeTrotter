import { Link, createFileRoute } from "@tanstack/react-router";
import { CalendarDays, Map, Plus, UserRound, Wallet } from "lucide-react";
import { useMemo, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { formatINR, trips } from "@/data/mock";

const pages = {
  trips: ["My Trips", "Keep every upcoming journey in one place.", Map],
  create: ["Create a new trip", "Add the essentials, then build your itinerary.", Plus],
  calendar: ["Travel calendar", "See your plans at a glance.", CalendarDays],
  budget: ["Trip budget", "Track spending and stay on target.", Wallet],
  profile: ["Your profile", "Manage your travel preferences.", UserRound],
} as const;
type Feature = keyof typeof pages;
const features = Object.keys(pages) as Feature[];

export const Route = createFileRoute("/$feature")({ component: FeaturePage });

function FeaturePage() {
  const { feature } = Route.useParams();
  const key = features.includes(feature as Feature) ? (feature as Feature) : "trips";
  const [title, description, Icon] = pages[key];
  const [tripName, setTripName] = useState("");
  const [expenses, setExpenses] = useState([
    { name: "Flights", amount: 24000 },
    { name: "Hotel", amount: 18500 },
  ]);
  const total = useMemo(() => expenses.reduce((sum, item) => sum + item.amount, 0), [expenses]);
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="mb-8 flex items-start gap-4">
          <span className="grid size-12 place-items-center rounded-2xl bg-primary text-primary-foreground">
            <Icon className="size-6" />
          </span>
          <div>
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="mt-1 text-muted-foreground">{description}</p>
          </div>
        </div>
        {key === "create" && (
          <section className="max-w-2xl rounded-3xl border bg-card p-6 shadow-soft">
            <label className="text-sm font-semibold" htmlFor="trip-name">
              Trip name
            </label>
            <input
              id="trip-name"
              value={tripName}
              onChange={(e) => setTripName(e.target.value)}
              placeholder="e.g. Winter in Japan"
              className="mt-2 w-full rounded-xl border bg-background px-4 py-3"
            />
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <input type="date" className="rounded-xl border bg-background px-4 py-3" />
              <input
                placeholder="Destination"
                className="rounded-xl border bg-background px-4 py-3"
              />
            </div>
            <Button className="mt-5 rounded-full">Create trip</Button>
          </section>
        )}
        {key === "budget" && (
          <section className="max-w-2xl rounded-3xl border bg-card p-6 shadow-soft">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Current expenses</p>
                <p className="text-3xl font-bold">{formatINR(total)}</p>
              </div>
              <Button
                onClick={() =>
                  setExpenses((items) => [...items, { name: "Activity", amount: 2500 }])
                }
                className="rounded-full"
              >
                <Plus /> Add expense
              </Button>
            </div>
            <div className="mt-6 space-y-3">
              {expenses.map((expense, index) => (
                <div
                  key={`${expense.name}-${index}`}
                  className="flex justify-between rounded-xl bg-secondary px-4 py-3"
                >
                  <span>{expense.name}</span>
                  <span className="font-semibold">{formatINR(expense.amount)}</span>
                </div>
              ))}
            </div>
          </section>
        )}
        {key === "calendar" && (
          <div className="grid gap-4 sm:grid-cols-2">
            {trips.map((trip) => (
              <article key={trip.id} className="rounded-2xl border bg-card p-5">
                <CalendarDays className="size-5 text-primary" />
                <h2 className="mt-3 font-bold">{trip.name}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{trip.dates}</p>
              </article>
            ))}
          </div>
        )}
        {key === "profile" && (
          <section className="max-w-2xl rounded-3xl border bg-card p-6 shadow-soft">
            <div className="flex items-center gap-4">
              <span className="grid size-16 place-items-center rounded-full bg-secondary text-xl font-bold">
                AM
              </span>
              <div>
                <h2 className="text-xl font-bold">Aarav Mehta</h2>
                <p className="text-sm text-muted-foreground">Adventure traveller · India</p>
              </div>
            </div>
            <div className="mt-6 grid gap-3 text-sm">
              <p className="rounded-xl bg-secondary p-4">
                Travel style: Culture, food and city walks
              </p>
              <p className="rounded-xl bg-secondary p-4">Notifications: Trip reminders enabled</p>
            </div>
          </section>
        )}
        {key === "trips" && (
          <div className="grid gap-4 sm:grid-cols-3">
            {trips.map((trip) => (
              <article key={trip.id} className="rounded-3xl border bg-card p-5 shadow-soft">
                <h2 className="font-bold">{trip.name}</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {trip.dates} · {trip.cities} cities
                </p>
                <p className="mt-4 font-semibold">{formatINR(trip.budget)}</p>
                <Link
                  to="/itinerary"
                  className="mt-4 inline-block text-sm font-semibold text-primary hover:underline"
                >
                  Open itinerary →
                </Link>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
