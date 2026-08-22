"use client"

import { useState } from "react"
import { Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"
import { PillGroup, Section, SelectField } from "@/components/profile/controls"
import { languages } from "@/lib/profile-data"

export function TabCustomization() {
  const [theme, setTheme] = useState<"Light" | "Dark">("Light")
  const [layout, setLayout] = useState<string[]>(["Comfortable"])
  const [language, setLanguage] = useState("English")

  const themes: { id: "Light" | "Dark"; icon: typeof Sun }[] = [
    { id: "Light", icon: Sun },
    { id: "Dark", icon: Moon },
  ]

  return (
    <div className="flex flex-col gap-6">
      <Section title="Theme" description="Choose your preferred appearance (preview only).">
        <div className="flex flex-wrap gap-3">
          {themes.map(({ id, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setTheme(id)}
              className={cn(
                "flex w-36 items-center gap-3 rounded-xl border p-4 text-left transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
                theme === id ? "border-primary bg-accent" : "border-border bg-background hover:border-primary/40",
              )}
            >
              <span
                className={cn(
                  "grid size-9 place-items-center rounded-lg",
                  theme === id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                )}
              >
                <Icon className="size-4" />
              </span>
              <span className="text-sm font-medium text-foreground">{id}</span>
            </button>
          ))}
        </div>
      </Section>

      <Section title="Dashboard Layout" description="Control the density of your dashboard.">
        <PillGroup options={["Comfortable", "Compact"]} selected={layout} onToggle={(v) => setLayout([v])} />
      </Section>

      <Section title="Language" description="Set the display language for the interface.">
        <div className="sm:max-w-xs">
          <SelectField
            label="Language"
            value={language}
            onChange={setLanguage}
            options={languages.map((l) => ({ value: l, label: l }))}
          />
        </div>
      </Section>
    </div>
  )
}
