"use client"

import { useState } from "react"
import { BadgeCheck, Laptop, LogOut, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PasswordField, Section, Toggle } from "@/components/profile/controls"
import { activeSessions } from "@/lib/profile-data"

export function TabSecurity() {
  const [current, setCurrent] = useState("")
  const [next, setNext] = useState("")
  const [confirm, setConfirm] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [changed, setChanged] = useState(false)
  const [twoFactor, setTwoFactor] = useState(false)
  const [sessions, setSessions] = useState(activeSessions)

  function changePassword() {
    const e: Record<string, string> = {}
    if (!current) e.current = "Enter your current password."
    if (next.length < 8) e.next = "Password must be at least 8 characters."
    if (next !== confirm) e.confirm = "Passwords do not match."
    setErrors(e)
    if (Object.keys(e).length) return
    setChanged(true)
    setCurrent("")
    setNext("")
    setConfirm("")
    setTimeout(() => setChanged(false), 2500)
  }

  return (
    <div className="flex flex-col gap-6">
      <Section title="Change Password" description="Use a strong password with at least 8 characters.">
        <div className="grid grid-cols-1 gap-5 sm:max-w-md">
          <PasswordField
            label="Current Password"
            value={current}
            onChange={setCurrent}
            error={errors.current}
            autoComplete="current-password"
          />
          <PasswordField
            label="New Password"
            value={next}
            onChange={setNext}
            error={errors.next}
            autoComplete="new-password"
          />
          <PasswordField
            label="Confirm Password"
            value={confirm}
            onChange={setConfirm}
            error={errors.confirm}
            autoComplete="new-password"
          />
        </div>
        <div className="mt-5 flex items-center gap-3">
          <Button onClick={changePassword}>Change Password</Button>
          {changed ? (
            <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
              <BadgeCheck className="size-4" /> Password updated
            </span>
          ) : null}
        </div>
      </Section>

      <Section title="Two-Factor Authentication" description="Add an extra layer of security to your account.">
        <div className="flex items-center justify-between rounded-xl border border-border bg-muted/40 p-4">
          <div>
            <p className="text-sm font-medium text-foreground">Authenticator app</p>
            <p className="text-sm text-muted-foreground">
              {twoFactor ? "Two-factor authentication is ON." : "Two-factor authentication is OFF."}
            </p>
          </div>
          <Toggle checked={twoFactor} onChange={setTwoFactor} label="Toggle two-factor authentication" />
        </div>
      </Section>

      <Section title="Active Sessions" description="Devices currently signed in to your account.">
        <ul className="flex flex-col gap-3">
          {sessions.map((s) => (
            <li
              key={s.id}
              className="flex flex-col gap-3 rounded-xl border border-border p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-start gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground">
                  <Laptop className="size-4" />
                </span>
                <div>
                  <p className="flex items-center gap-2 text-sm font-medium text-foreground">
                    {s.device}
                    {s.current ? (
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">
                        This device
                      </span>
                    ) : null}
                  </p>
                  <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="size-3" /> {s.location} · {s.lastActive}
                  </p>
                </div>
              </div>
              {!s.current ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSessions((prev) => prev.filter((x) => x.id !== s.id))}
                >
                  <LogOut className="size-4" />
                  Log out
                </Button>
              ) : null}
            </li>
          ))}
        </ul>
      </Section>
    </div>
  )
}
