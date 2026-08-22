"use client"

import { useState } from "react"
import { Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PillGroup, Section, SelectField } from "@/components/profile/controls"
import { activityOptions, currencies, languages, travelStyles } from "@/lib/profile-data"

export function TabPreferences() {
  const [style, setStyle] = useState<string[]>(["Adventure"])
  const [activities, setActivities] = useState<string[]>(["Sightseeing", "Food Tours"])
  const [destinations, setDestinations] = useState<string[]>(["Tokyo", "Lisbon", "Reykjavik"])
  const [draft, setDraft] = useState("")
  const [language, setLanguage] = useState("English")
  const [currency, setCurrency] = useState("INR")

  function addDestination() {
    const value = draft.trim()
    if (value && !destinations.includes(value)) {
      setDestinations((d) => [...d, value])
    }
    setDraft("")
  }

  return (
    <div className="flex flex-col gap-6">
      <Section title="Travel Style" description="Pick the style that best matches how you like to travel.">
        <PillGroup options={travelStyles} selected={style} onToggle={(v) => setStyle([v])} />
      </Section>

      <Section title="Favorite Destinations" description="Add the places you love or want to explore.">
        <div className="flex flex-wrap gap-2">
          {destinations.map((d) => (
            <span
              key={d}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-accent px-3 py-1.5 text-sm font-medium text-accent-foreground"
            >
              {d}
              <button
                type="button"
                onClick={() => setDestinations((prev) => prev.filter((x) => x !== d))}
                aria-label={`Remove ${d}`}
                className="rounded-full text-accent-foreground/70 transition-colors hover:text-accent-foreground"
              >
                <X className="size-3.5" />
              </button>
            </span>
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.nativeEvent.isComposing && e.keyCode !== 229) {
                e.preventDefault()
                addDestination()
              }
            }}
            placeholder="Add a destination..."
            className="h-10 w-full max-w-xs rounded-lg border border-input bg-background px-3 text-sm text-foreground shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
          />
          <Button variant="outline" onClick={addDestination}>
            <Plus className="size-4" />
            Add
          </Button>
        </div>
      </Section>

      <Section title="Preferred Activities" description="Select the activities you enjoy on your trips.">
        <PillGroup
          multiple
          options={activityOptions}
          selected={activities}
          onToggle={(v) =>
            setActivities((prev) => (prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]))
          }
        />
      </Section>

      <Section title="Regional" description="Set your preferred language and currency.">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <SelectField
            label="Language"
            value={language}
            onChange={setLanguage}
            options={languages.map((l) => ({ value: l, label: l }))}
          />
          <SelectField
            label="Currency"
            value={currency}
            onChange={setCurrency}
            options={currencies.map((c) => ({ value: c.code, label: c.label }))}
          />
        </div>
      </Section>
    </div>
  )
}
