import {
  MapPin,
  Clock,
  Car,
  Footprints,
  TrainFront,
  Plane,
  Pencil,
  Trash2,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import type { Activity, Category, TravelMode } from "@/lib/itinerary-data";
import { cn } from "@/lib/utils";

const CATEGORY_STYLES: Record<Category, string> = {
  Adventure: "bg-chart-5/15 text-chart-5",
  Sightseeing: "bg-primary/12 text-primary",
  Food: "bg-warning/15 text-warning",
  Shopping: "bg-chart-4/15 text-chart-4",
  Relaxation: "bg-chart-3/15 text-chart-3",
  Culture: "bg-chart-4/15 text-chart-4",
  Travel: "bg-muted-foreground/15 text-muted-foreground",
};

const MODE_ICON: Record<TravelMode, typeof Car> = {
  car: Car,
  walk: Footprints,
  metro: TrainFront,
  flight: Plane,
};

function formatTime(t: string): string {
  const [h = 0, m = 0] = t.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${String(m).padStart(2, "0")} ${period}`;
}

interface ActivityCardProps {
  activity: Activity;
  isFirst: boolean;
  isLast: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

export function ActivityCard({
  activity,
  isFirst,
  isLast,
  onEdit,
  onDelete,
  onMoveUp,
  onMoveDown,
}: ActivityCardProps) {
  const ModeIcon = MODE_ICON[activity.travelMode];

  return (
    <div className="relative pl-8 sm:pl-10">
      <span className="absolute left-2.5 top-6 z-10 size-3 -translate-x-1/2 rounded-full border-2 border-card bg-primary shadow sm:left-3.5" />

      {!isFirst ? (
        <div className="mb-2 flex items-center gap-1.5 pl-1 text-xs font-medium text-muted-foreground">
          <ModeIcon className="size-3.5" />
          {activity.travelTime} from previous stop
        </div>
      ) : null}

      <div className="group rounded-2xl border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-md">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-lg bg-secondary px-2 py-0.5 text-xs font-semibold text-secondary-foreground">
                <Clock className="size-3" />
                {formatTime(activity.time)}
              </span>
              <span
                className={cn(
                  "rounded-lg px-2 py-0.5 text-xs font-semibold",
                  CATEGORY_STYLES[activity.category],
                )}
              >
                {activity.category}
              </span>
            </div>
            <h4 className="mt-2 font-display text-base font-bold text-foreground text-pretty">
              {activity.name}
            </h4>
            <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <MapPin className="size-3.5" />
                {activity.location}
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock className="size-3.5" />
                {activity.duration}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-1">
            <div className="flex flex-col overflow-hidden rounded-lg border border-border">
              <button
                onClick={onMoveUp}
                disabled={isFirst}
                aria-label="Move activity earlier"
                className="p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-30"
              >
                <ChevronUp className="size-4" />
              </button>
              <button
                onClick={onMoveDown}
                disabled={isLast}
                aria-label="Move activity later"
                className="border-t border-border p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-30"
              >
                <ChevronDown className="size-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
          <span className="text-sm font-bold text-foreground">
            ₹{activity.estimatedCost.toLocaleString("en-IN")}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={onEdit}
              className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-accent"
            >
              <Pencil className="size-3.5" />
              Edit
            </button>
            <button
              onClick={onDelete}
              className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-destructive transition-colors hover:bg-destructive/10"
            >
              <Trash2 className="size-3.5" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
