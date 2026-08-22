"use client"

import { Wallet, TrendingUp, AlertTriangle, PlaneTakeoff, BedDouble, UtensilsCrossed, Ticket, ShoppingBag } from "lucide-react"
import { cn } from "@/lib/utils"

interface BudgetSummaryProps {
  totals: Record<string, number>
  total: number
  budget: number
}

const CATEGORY_META: { key: string; label: string; icon: typeof PlaneTakeoff; color: string }[] = [
  { key: "Flights", label: "Flights", icon: PlaneTakeoff, color: "bg-chart-1" },
  { key: "Hotels", label: "Hotels", icon: BedDouble, color: "bg-chart-4" },
  { key: "Food", label: "Food", icon: UtensilsCrossed, color: "bg-warning" },
  { key: "Activities", label: "Activities", icon: Ticket, color: "bg-chart-3" },
  { key: "Shopping", label: "Shopping", icon: ShoppingBag, color: "bg-chart-5" },
]

function inr(n: number): string {
  return `₹${Math.round(n).toLocaleString("en-IN")}`
}

export function BudgetSummary({ totals, total, budget }: BudgetSummaryProps) {
  const remaining = budget - total
  const usedPct = budget > 0 ? Math.round((total / budget) * 100) : 0
  const over = total > budget
  const approaching = !over && usedPct >= 80

  return (
    <section className="rounded-3xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-2">
        <span className="flex size-9 items-center justify-center rounded-xl bg-accent text-primary">
          <Wallet className="size-5" />
        </span>
        <div>
          <h3 className="font-display text-lg font-bold text-foreground">Itinerary budget</h3>
          <p className="text-xs text-muted-foreground">Auto-calculated from your plan</p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-secondary p-4">
          <span className="text-xs font-medium text-muted-foreground">Total estimated</span>
          <p className="mt-1 font-display text-xl font-bold text-foreground">{inr(total)}</p>
        </div>
        <div className="rounded-2xl bg-secondary p-4">
          <span className="text-xs font-medium text-muted-foreground">Trip budget</span>
          <p className="mt-1 font-display text-xl font-bold text-foreground">{inr(budget)}</p>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-muted-foreground">Budget used</span>
          <span className={cn("font-bold", over ? "text-warning" : "text-foreground")}>{usedPct}%</span>
        </div>
        <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className={cn("h-full rounded-full transition-all", over ? "bg-warning" : "bg-primary")}
            style={{ width: `${Math.min(usedPct, 100)}%` }}
          />
        </div>
        <div className="mt-2 flex items-center justify-between text-sm">
          <span className="text-muted-foreground">{over ? "Over budget" : "Remaining"}</span>
          <span className={cn("font-bold", over ? "text-warning" : "text-primary")}>
            {inr(Math.abs(remaining))}
          </span>
        </div>
      </div>

      {over ? (
        <div className="mt-4 flex items-start gap-2 rounded-2xl border border-warning/30 bg-warning-muted p-3 text-sm">
          <AlertTriangle className="mt-0.5 size-4 shrink-0 text-warning" />
          <p className="font-medium text-foreground">
            Your itinerary is <span className="text-warning">{inr(Math.abs(remaining))}</span> over budget.
          </p>
        </div>
      ) : approaching ? (
        <div className="mt-4 flex items-start gap-2 rounded-2xl border border-warning/30 bg-warning-muted p-3 text-sm">
          <TrendingUp className="mt-0.5 size-4 shrink-0 text-warning" />
          <p className="font-medium text-foreground">You&apos;re approaching your trip budget.</p>
        </div>
      ) : (
        <div className="mt-4 flex items-start gap-2 rounded-2xl border border-primary/20 bg-accent p-3 text-sm">
          <TrendingUp className="mt-0.5 size-4 shrink-0 text-primary" />
          <p className="font-medium text-foreground">You&apos;re comfortably within budget. Nice planning!</p>
        </div>
      )}

      <div className="mt-5 flex flex-col gap-3 border-t border-border pt-5">
        {CATEGORY_META.map((cat) => {
          const value = totals[cat.key] ?? 0
          const pct = total > 0 ? Math.round((value / total) * 100) : 0
          const Icon = cat.icon
          return (
            <div key={cat.key} className="flex items-center gap-3">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-secondary text-muted-foreground">
                <Icon className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-foreground">{cat.label}</span>
                  <span className="font-semibold text-foreground">{inr(value)}</span>
                </div>
                <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div className={cn("h-full rounded-full", cat.color)} style={{ width: `${pct}%` }} />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
