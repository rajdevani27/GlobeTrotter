import { Plus, CalendarDays } from "lucide-react";
import { ActivityCard } from "./activity-card";
import { type Activity, type DayPlan, formatDate } from "@/lib/itinerary-data";

interface TimelineProps {
  days: DayPlan[];
  onEditActivity: (activity: Activity) => void;
  onDeleteActivity: (day: number, id: string) => void;
  onMoveActivity: (day: number, index: number, direction: -1 | 1) => void;
  onAddActivity: (day: number) => void;
}

export function ItineraryTimeline({
  days,
  onEditActivity,
  onDeleteActivity,
  onMoveActivity,
  onAddActivity,
}: TimelineProps) {
  return (
    <div className="flex flex-col gap-8">
      {days.map((day) => {
        const dayTotal = day.activities.reduce((sum, a) => sum + a.estimatedCost, 0);
        return (
          <section
            key={day.day}
            className="rounded-3xl border border-border bg-card/60 p-5 shadow-sm sm:p-6"
          >
            <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
              <div className="flex items-center gap-3">
                <div className="flex size-12 flex-col items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                  <span className="text-[0.6rem] font-semibold uppercase leading-none opacity-80">
                    Day
                  </span>
                  <span className="font-display text-lg font-bold leading-none">{day.day}</span>
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground text-pretty">
                    {day.title}
                  </h3>
                  <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <CalendarDays className="size-3.5" />
                    {formatDate(day.date)}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Day total
                </span>
                <span className="font-display text-lg font-bold text-foreground">
                  ₹{dayTotal.toLocaleString("en-IN")}
                </span>
              </div>
            </header>

            <div className="relative mt-5">
              <span
                className="absolute bottom-4 left-2.5 top-2 w-px bg-border sm:left-3.5"
                aria-hidden="true"
              />
              <div className="flex flex-col gap-5">
                {day.activities.map((activity, index) => (
                  <ActivityCard
                    key={activity.id}
                    activity={activity}
                    isFirst={index === 0}
                    isLast={index === day.activities.length - 1}
                    onEdit={() => onEditActivity(activity)}
                    onDelete={() => onDeleteActivity(day.day, activity.id)}
                    onMoveUp={() => onMoveActivity(day.day, index, -1)}
                    onMoveDown={() => onMoveActivity(day.day, index, 1)}
                  />
                ))}
                {day.activities.length === 0 ? (
                  <p className="pl-8 text-sm text-muted-foreground sm:pl-10">
                    No activities yet for this day.
                  </p>
                ) : null}
              </div>
            </div>

            <button
              onClick={() => onAddActivity(day.day)}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-border py-3 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/50 hover:bg-accent hover:text-primary"
            >
              <Plus className="size-4" />
              Add activity to Day {day.day}
            </button>
          </section>
        );
      })}
    </div>
  );
}
