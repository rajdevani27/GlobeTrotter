"use client"

import { useState } from "react"
import {
  Bell,
  Compass,
  Globe,
  Map,
  Shield,
  SlidersHorizontal,
  User,
  Wallet,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { tabs, type TabId } from "@/lib/profile-data"
import { TabProfile } from "@/components/profile/tab-profile"
import { TabPreferences } from "@/components/profile/tab-preferences"
import { TabSecurity } from "@/components/profile/tab-security"
import { TabTrips } from "@/components/profile/tab-trips"
import { TabBudget } from "@/components/profile/tab-budget"
import { TabNotifications } from "@/components/profile/tab-notifications"
import { TabCustomization } from "@/components/profile/tab-customization"

const icons = {
  user: User,
  compass: Compass,
  shield: Shield,
  map: Map,
  wallet: Wallet,
  bell: Bell,
  sliders: SlidersHorizontal,
} as const

export function ProfilePage() {
  const [active, setActive] = useState<TabId>("profile")

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-2.5 px-4 py-4 sm:px-6">
          <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground">
            <Globe className="size-5" />
          </span>
          <div>
            <p className="text-sm font-semibold leading-tight text-foreground">GlobeTrotter</p>
            <p className="text-xs leading-tight text-muted-foreground">Account &amp; Settings</p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-foreground text-balance sm:text-3xl">
            Profile
          </h1>
          <p className="mt-1 text-sm text-muted-foreground text-pretty">
            Manage your account details, travel preferences, and app settings.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px_1fr]">
          {/* Sidebar / tab navigation */}
          <nav aria-label="Profile sections" className="lg:sticky lg:top-6 lg:self-start">
            <ul className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
              {tabs.map((tab) => {
                const Icon = icons[tab.icon]
                const isActive = active === tab.id
                return (
                  <li key={tab.id} className="shrink-0">
                    <button
                      type="button"
                      onClick={() => setActive(tab.id)}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "flex w-full items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-sm font-medium whitespace-nowrap transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
                        isActive
                          ? "border-primary/20 bg-primary/10 text-primary shadow-sm"
                          : "border-transparent text-muted-foreground hover:bg-muted hover:text-foreground",
                      )}
                    >
                      <Icon className="size-4 shrink-0" />
                      {tab.label}
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Active section */}
          <div>
            {active === "profile" && <TabProfile />}
            {active === "preferences" && <TabPreferences />}
            {active === "security" && <TabSecurity />}
            {active === "trips" && <TabTrips />}
            {active === "budget" && <TabBudget />}
            {active === "notifications" && <TabNotifications />}
            {active === "customization" && <TabCustomization />}
          </div>
        </div>
      </main>
    </div>
  )
}
