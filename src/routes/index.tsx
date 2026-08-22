import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarRange, Compass, Map, Route as RouteIcon, Sparkles } from "lucide-react";
import { Brand } from "@/components/globetrotter/Brand";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/use-auth";
import heroCoast from "@/assets/hero-coast.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GlobeTrotter — Plan Trips You Actually Take" },
      {
        name: "description",
        content:
          "GlobeTrotter is a calm, modern trip planner: create trips, build day-by-day itineraries and keep every journey in one place.",
      },
      { property: "og:title", content: "GlobeTrotter — Plan Trips You Actually Take" },
      {
        property: "og:description",
        content:
          "Create trips, build day-by-day itineraries and keep every journey organised with GlobeTrotter.",
      },
    ],
  }),
  component: LandingPage,
});

const highlights = [
  {
    icon: Compass,
    title: "Plan with clarity",
    body: "Shape your route, dates and stops without spreadsheets or scattered notes.",
  },
  {
    icon: CalendarRange,
    title: "Day-by-day itineraries",
    body: "Lay out each travel day so you always know what comes next.",
  },
  {
    icon: Map,
    title: "All trips, one place",
    body: "Past adventures and future plans stay together in your personal dashboard.",
  },
];

function LandingPage() {
  const { session, loading } = useAuth();

  return (
    <div className="min-h-screen">
      <header className="absolute inset-x-0 top-0 z-10">
        <nav
          aria-label="Main"
          className="mx-auto flex max-w-6xl items-center justify-between px-5 py-6 sm:px-8"
        >
          <Brand onDark />
          <div className="flex items-center gap-2 sm:gap-3">
            {!loading && session ? (
              <Button asChild size="sm" variant="secondary">
                <Link to="/dashboard">Go to dashboard</Link>
              </Button>
            ) : (
              <>
                <Button
                  asChild
                  size="sm"
                  variant="ghost"
                  className="text-primary-foreground hover:bg-primary-foreground/15 hover:text-primary-foreground"
                >
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild size="sm" variant="secondary">
                  <Link to="/signup">Sign up</Link>
                </Button>
              </>
            )}
          </div>
        </nav>
      </header>

      <section className="relative isolate overflow-hidden">
        <img
          src={heroCoast}
          alt="Aerial view of a coastal road above turquoise water at golden hour"
          width={1920}
          height={1280}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-ocean-deep/70" />
        <div className="relative mx-auto flex min-h-[92svh] max-w-6xl flex-col justify-center px-5 pb-20 pt-32 sm:px-8">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary-foreground/25 bg-primary-foreground/10 px-3.5 py-1.5 text-xs font-medium uppercase tracking-widest text-primary-foreground">
            <Sparkles className="size-3.5" aria-hidden="true" />
            Travel planning, simplified
          </span>
          <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.05] text-primary-foreground sm:text-6xl lg:text-7xl">
            Plan the trip. Then go take it.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-primary-foreground/85 sm:text-lg">
            GlobeTrotter gives every journey a home — routes, stops, travel days and everything you
            want to remember, organised in one beautifully simple workspace.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="sm:px-8">
              <Link to="/signup">Start planning free</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/15 hover:text-primary-foreground sm:px-8"
            >
              <Link to="/login">I already have an account</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold sm:text-4xl">A calmer way to travel-plan</h2>
          <p className="mt-3 text-muted-foreground">
            Built for people who love the journey but not the admin. Set up an account and your
            planning workspace is ready in seconds.
          </p>
        </div>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map(({ icon: Icon, title, body }) => (
            <li key={title} className="surface-card-interactive p-7">
              <span className="grid size-11 place-items-center rounded-xl bg-secondary text-secondary-foreground">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
        <div className="surface-card overflow-hidden bg-gradient-ocean p-8 sm:p-14">
          <div className="max-w-xl">
            <RouteIcon className="size-8 text-primary-foreground" aria-hidden="true" />
            <h2 className="mt-5 text-3xl font-semibold text-primary-foreground sm:text-4xl">
              Your next adventure is one account away
            </h2>
            <p className="mt-3 text-primary-foreground/85">
              Create your free GlobeTrotter account and open your personal travel dashboard.
            </p>
            <Button asChild size="lg" variant="secondary" className="mt-8">
              <Link to="/signup">Create your account</Link>
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 sm:flex-row sm:px-8">
          <Brand />
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} GlobeTrotter. Wander thoughtfully.
          </p>
        </div>
      </footer>
    </div>
  );
}
