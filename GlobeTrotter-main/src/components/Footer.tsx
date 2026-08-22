import { Globe2 } from "lucide-react";

const links = ["Explore", "My Trips", "Community", "About", "Privacy"];

export function Footer() {
  return (
    <footer className="mt-8 border-t border-border bg-sand">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground">
              <Globe2 className="size-4" />
            </span>
            <span className="font-display text-base font-bold">GlobeTrotter</span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">Plan it. Explore it. Live it.</p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {links.map((link) => (
            <a
              key={link}
              href="#"
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              {link}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
