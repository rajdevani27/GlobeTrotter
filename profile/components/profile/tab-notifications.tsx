"use client"

import { useState } from "react"
import { Section, Toggle } from "@/components/profile/controls"
import { notificationSettings } from "@/lib/profile-data"

export function TabNotifications() {
  const [settings, setSettings] = useState(notificationSettings)

  function toggle(id: string) {
    setSettings((prev) => prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s)))
  }

  return (
    <Section title="Notifications" description="Choose how and when GlobeTrotter keeps you updated.">
      <ul className="divide-y divide-border">
        {settings.map((s) => (
          <li key={s.id} className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
            <div>
              <p className="text-sm font-medium text-foreground">{s.label}</p>
              <p className="mt-0.5 text-sm text-muted-foreground text-pretty">{s.description}</p>
            </div>
            <Toggle checked={s.enabled} onChange={() => toggle(s.id)} label={`Toggle ${s.label}`} />
          </li>
        ))}
      </ul>
    </Section>
  )
}
