import { PiggyBank } from "lucide-react";
import { budgetSummary, formatINR } from "@/data/mock";

export function BudgetSummary() {
  const percent = Math.round((budgetSummary.estimated / budgetSummary.total) * 100);

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
      <div className="flex items-center gap-2">
        <span className="grid size-9 place-items-center rounded-xl bg-accent text-accent-foreground">
          <PiggyBank className="size-5" />
        </span>
        <h3 className="text-lg font-bold">Trip budget</h3>
      </div>

      <dl className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <div>
          <dt className="text-xs text-muted-foreground">Total Budget</dt>
          <dd className="mt-1 text-xl font-bold">{formatINR(budgetSummary.total)}</dd>
        </div>
        <div>
          <dt className="text-xs text-muted-foreground">Estimated</dt>
          <dd className="mt-1 text-xl font-bold">{formatINR(budgetSummary.estimated)}</dd>
        </div>
        <div>
          <dt className="text-xs text-muted-foreground">Remaining</dt>
          <dd className="mt-1 text-xl font-bold text-brand">
            {formatINR(budgetSummary.remaining)}
          </dd>
        </div>
      </dl>

      <div className="mt-5 h-2.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="mt-3 text-sm text-muted-foreground">
        You&apos;re within your planned budget 🎉
      </p>
    </div>
  );
}
