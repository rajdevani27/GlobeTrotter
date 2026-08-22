import { useMemo, useState } from "react";
import { Bell, BellOff } from "lucide-react";
import type { DayPlan } from "@/lib/itinerary-data";
import { cn } from "@/lib/utils";

function formatTime(t: string): string {
  const [h = 0, m = 0] = t.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${String(m).padStart(2, "0")} ${period}`;
}

export function TripReminders({ days }: { days: DayPlan[] }) {
  const [enabled, setEnabled] = useState(true);

  const reminders = useMemo(() => {
    const items: { label: string; text: string }[] = [];
    days.slice(0, 3).forEach((day, i) => {
      const highlight =
        day.activities.find((a) => a.category === "Sightseeing" || a.category === "Culture") ??
        day.activities.find((a) => a.category !== "Travel") ??
        day.activities[0];
      if (highlight) {
        items.push({
          label: i === 0 ? "Tomorrow" : `Day ${day.day}`,
          text: `${highlight.name} at ${formatTime(highlight.time)}`,
        });
      }
    });
    return items;
  }, [days]);

  return (
    <section className="rounded-3xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-xl bg-accent text-primary">
            <Bell className="size-5" />
          </span>
          <div>
            <h3 className="font-display text-lg font-bold text-foreground">Trip reminders</h3>
            <p className="text-xs text-muted-foreground">Get notified before each highlight</p>
          </div>
        </div>
        <button
          onClick={() => setEnabled((v) => !v)}
          role="switch"
          aria-checked={enabled}
          aria-label="Toggle trip reminders"
          className={cn(
            "relative h-6 w-11 shrink-0 rounded-full transition-colors",
            enabled ? "bg-primary" : "bg-muted",
          )}
        >
          <span
            className={cn(
              "absolute top-0.5 size-5 rounded-full bg-card shadow transition-transform",
              enabled ? "translate-x-5" : "translate-x-0.5",
            )}
          />
        </button>
      </div>

      {enabled ? (
        <ul className="mt-4 flex flex-col gap-2.5">
          {reminders.map((r, i) => (
            <li key={i} className="flex items-center gap-3 rounded-2xl bg-secondary/60 p-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-card text-primary shadow-sm">
                <Bell className="size-4" />
              </span>
              <div className="min-w-0">
                <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                  {r.label}
                </span>
                <p className="truncate text-sm font-medium text-foreground">{r.text}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-4 flex items-center gap-2 rounded-2xl bg-secondary/60 p-4 text-sm text-muted-foreground">
          <BellOff className="size-4" />
          Reminders are turned off.
        </div>
      )}
    </section>
  );
}
