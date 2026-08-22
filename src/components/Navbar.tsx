import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Bell, Globe2, Menu, Plus, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { currentUser } from "@/data/mock";
import { cn } from "@/lib/utils";

const links = [
  { label: "Dashboard", to: "/" },
  { label: "My Trips", to: "/trips" },
  { label: "Explore", to: "/explore" },
  { label: "Calendar", to: "/calendar" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("Dashboard");

  const select = (link: string) => {
    setActive(link);
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:px-6 lg:grid-cols-[auto_1fr_auto]">
        <a href="/" className="flex min-w-0 items-center gap-2">
          <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
            <Globe2 className="size-5" />
          </span>
          <span className="truncate font-display text-lg font-bold tracking-tight">
            GlobeTrotter
          </span>
        </a>

        <nav className="hidden items-center justify-center gap-1 lg:flex">
          {links.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              onClick={() => select(link.label)}
              className={cn(
                "cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-colors",
                active === link.label
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => toast("No new notifications")}
            aria-label="Notifications"
            className="relative hidden size-9 cursor-pointer place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:grid"
          >
            <Bell className="size-5" />
            <span className="absolute right-2 top-2 size-2 rounded-full bg-brand" />
          </button>

          <Link to="/profile" aria-label="Open profile" className="hidden items-center gap-2 rounded-xl px-1 py-1 transition-colors hover:bg-muted md:flex">
            <span className="grid size-9 place-items-center rounded-full bg-secondary text-xs font-bold text-secondary-foreground">
              {currentUser.initials}
            </span>
            <span className="text-sm font-medium">{currentUser.name}</span>
          </Link>

          <Button asChild
            variant="hero"
            className="hidden rounded-full sm:inline-flex"
          >
            <Link to="/create"><Plus /> Plan New Trip</Link>
          </Button>

          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="grid size-9 cursor-pointer place-items-center rounded-full border border-border lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background px-4 pb-4 pt-2 lg:hidden">
          <nav className="flex flex-col">
            {links.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => select(link.label)}
                className={cn(
                  "cursor-pointer rounded-xl px-3 py-3 text-left text-sm font-medium transition-colors",
                  active === link.label ? "bg-accent text-accent-foreground" : "hover:bg-muted",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Link to="/profile" onClick={() => setOpen(false)} className="mt-3 flex items-center gap-2 border-t border-border pt-3">
            <span className="grid size-9 place-items-center rounded-full bg-secondary text-xs font-bold">
              {currentUser.initials}
            </span>
            <span className="text-sm font-medium">{currentUser.name}</span>
          </Link>
          <Button asChild
            variant="hero"
            className="mt-3 w-full rounded-full"
          >
            <Link to="/create" onClick={() => setOpen(false)}><Plus /> Plan New Trip</Link>
          </Button>
        </div>
      )}
    </header>
  );
}
