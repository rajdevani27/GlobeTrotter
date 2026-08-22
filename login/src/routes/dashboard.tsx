import { createFileRoute, Link, redirect, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { CalendarRange, Compass, LogOut, Luggage, MapPinned } from "lucide-react";
import { Brand } from "@/components/globetrotter/Brand";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { resolveDisplayName, useAuth } from "@/lib/use-auth";

export const Route = createFileRoute("/dashboard")({
  // Client-only so the session guard runs against the browser session.
  ssr: false,
  beforeLoad: async () => {
    const { data } = await supabase.auth.getSession();
    if (!data.session) {
      throw redirect({ to: "/login", replace: true });
    }
  },
  head: () => ({
    meta: [
      { title: "Your dashboard — GlobeTrotter" },
      {
        name: "description",
        content: "Your GlobeTrotter dashboard: create trips, build itineraries and view saved trips.",
      },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Your dashboard — GlobeTrotter" },
      { property: "og:description", content: "Your personal GlobeTrotter travel dashboard." },
    ],
  }),
  component: DashboardPage,
});

/**
 * Placeholder destinations owned by another developer.
 * Replace `to` with the real routes once Create Trip / Itinerary / View Trips ship.
 */
const featureCards = [
  {
    key: "create-trip",
    icon: Compass,
    title: "Create Trip",
    description: "Start planning your next adventure.",
  },
  {
    key: "itinerary-builder",
    icon: CalendarRange,
    title: "Itinerary Builder",
    description: "Build and organize your travel itinerary.",
  },
  {
    key: "view-trips",
    icon: MapPinned,
    title: "View Trips",
    description: "View and manage your saved trips.",
  },
];

function DashboardPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user, session, loading } = useAuth();

  const { data: profile } = useQuery({
    queryKey: ["profile", user?.id],
    enabled: Boolean(user?.id),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", user!.id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  // Session revoked elsewhere (another tab, expiry) — return to login.
  const signingOut = useRef(false);
  useEffect(() => {
    if (!loading && !session && !signingOut.current) {
      void navigate({ to: "/login", replace: true });
    }
  }, [loading, session, navigate]);

  const displayName = resolveDisplayName(user, profile?.full_name);

  async function handleLogout() {
    signingOut.current = true;
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    void navigate({ to: "/", replace: true });
  }

  return (
    <div className="min-h-screen bg-map-grid">
      <header className="border-b border-border bg-card/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <Brand />
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="size-4" aria-hidden="true" />
            Logout
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
              Your travel workspace
            </p>
            <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">
              Welcome back, {displayName}!
            </h1>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Pick up where you left off, or start something new. Everything you plan stays private
              to your account.
            </p>
          </div>
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground">
            <Luggage className="size-4" aria-hidden="true" />
            {user?.email}
          </span>
        </div>

        <section aria-labelledby="quick-actions" className="mt-12">
          <h2 id="quick-actions" className="text-xl font-semibold">
            Plan your journey
          </h2>
          <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featureCards.map(({ key, icon: Icon, title, description }) => (
              <li key={key}>
                {/* Placeholder: another developer will point this at the real feature route. */}
                <Link
                  to="."
                  aria-label={`${title} — coming soon`}
                  className="surface-card-interactive flex h-full flex-col p-7 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <span className="grid size-11 place-items-center rounded-xl bg-gradient-ocean text-primary-foreground">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                  <span className="mt-6 text-xs font-semibold uppercase tracking-widest text-accent">
                    Coming soon
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
