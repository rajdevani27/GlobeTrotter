import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

interface Props {
  icon: LucideIcon;
  title: string;
  description: string;
  to: "/create" | "/explore" | "/calendar" | "/budget";
}

export function QuickActionCard({ icon: Icon, title, description, to }: Props) {
  return (
    <Link
      to={to}
      className="group flex w-full cursor-pointer items-start gap-4 rounded-3xl border border-border bg-card p-5 text-left shadow-soft transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lift"
    >
      <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-accent text-accent-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
        <Icon className="size-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-1 font-semibold">
          {title}
          <ArrowRight className="size-4 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
        </span>
        <span className="mt-1 block text-sm text-muted-foreground">{description}</span>
      </span>
    </Link>
  );
}
