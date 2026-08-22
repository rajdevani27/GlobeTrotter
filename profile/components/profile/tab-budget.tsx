"use client"

import { useState } from "react"
import { PillGroup, Section, SelectField, Toggle } from "@/components/profile/controls"
import { currencies } from "@/lib/profile-data"

export function TabBudget() {
  const [range, setRange] = useState<string[]>(["Medium"])
  const [currency, setCurrency] = useState("INR")
  const [alerts, setAlerts] = useState(true)

  return (
    <div className="flex flex-col gap-6">
      <Section title="Default Budget Range" description="Set the default range applied when planning new trips.">
        <PillGroup options={["Low", "Medium", "High"]} selected={range} onToggle={(v) => setRange([v])} />
      </Section>

      <Section title="Currency Preference" description="Choose the currency used for budgets and totals.">
        <div className="sm:max-w-xs">
          <SelectField
            label="Currency"
            value={currency}
            onChange={setCurrency}
            options={currencies.map((c) => ({ value: c.code, label: c.label }))}
          />
        </div>
      </Section>

      <Section title="Overspending Alerts" description="Get notified when a trip goes over budget.">
        <div className="flex items-center justify-between rounded-xl border border-border bg-muted/40 p-4">
          <div>
            <p className="text-sm font-medium text-foreground">Overspending alerts</p>
            <p className="text-sm text-muted-foreground">{alerts ? "Alerts are ON." : "Alerts are OFF."}</p>
          </div>
          <Toggle checked={alerts} onChange={setAlerts} label="Toggle overspending alerts" />
        </div>
      </Section>
    </div>
  )
}
