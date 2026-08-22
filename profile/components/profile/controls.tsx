"use client"

import type React from "react"
import { useId, useState } from "react"
import { Check, ChevronDown, Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"

/* ---------- Section wrapper ---------- */

export function Section({
  title,
  description,
  children,
  className,
}: {
  title: string
  description?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section
      className={cn(
        "rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-7",
        className,
      )}
    >
      <div className="mb-5">
        <h2 className="text-lg font-semibold tracking-tight text-foreground text-balance">{title}</h2>
        {description ? (
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground text-pretty">{description}</p>
        ) : null}
      </div>
      {children}
    </section>
  )
}

/* ---------- Text field ---------- */

export function Field({
  label,
  value,
  onChange,
  disabled,
  type = "text",
  placeholder,
  error,
  autoComplete,
}: {
  label: string
  value: string
  onChange?: (v: string) => void
  disabled?: boolean
  type?: string
  placeholder?: string
  error?: string
  autoComplete?: string
}) {
  const id = useId()
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={(e) => onChange?.(e.target.value)}
        aria-invalid={!!error}
        className={cn(
          "h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground shadow-sm outline-none transition-colors",
          "placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30",
          "disabled:cursor-not-allowed disabled:bg-muted/60 disabled:text-muted-foreground",
          error && "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20",
        )}
      />
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  )
}

/* ---------- Password field with visibility toggle ---------- */

export function PasswordField({
  label,
  value,
  onChange,
  error,
  autoComplete,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  error?: string
  autoComplete?: string
}) {
  const id = useId()
  const [show, setShow] = useState(false)
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={show ? "text" : "password"}
          value={value}
          autoComplete={autoComplete}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={!!error}
          className={cn(
            "h-10 w-full rounded-lg border border-input bg-background pl-3 pr-10 text-sm text-foreground shadow-sm outline-none transition-colors",
            "placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30",
            error && "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20",
          )}
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          aria-label={show ? "Hide password" : "Show password"}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-muted-foreground transition-colors hover:text-foreground"
        >
          {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  )
}

/* ---------- Select field ---------- */

export function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
}) {
  const id = useId()
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "h-10 w-full appearance-none rounded-lg border border-input bg-background pl-3 pr-9 text-sm text-foreground shadow-sm outline-none transition-colors",
            "focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30",
          )}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      </div>
    </div>
  )
}

/* ---------- Toggle switch ---------- */

export function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean
  onChange: (v: boolean) => void
  label?: string
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
        checked ? "bg-primary" : "bg-muted-foreground/30",
      )}
    >
      <span
        className={cn(
          "inline-block size-5 transform rounded-full bg-white shadow-sm transition-transform",
          checked ? "translate-x-[22px]" : "translate-x-0.5",
        )}
      />
    </button>
  )
}

/* ---------- Selectable pill group ---------- */

export function PillGroup({
  options,
  selected,
  onToggle,
  multiple = false,
}: {
  options: string[]
  selected: string[]
  onToggle: (value: string) => void
  multiple?: boolean
}) {
  return (
    <div className="flex flex-wrap gap-2" role={multiple ? "group" : "radiogroup"}>
      {options.map((opt) => {
        const isActive = selected.includes(opt)
        return (
          <button
            key={opt}
            type="button"
            role={multiple ? "checkbox" : "radio"}
            aria-checked={isActive}
            onClick={() => onToggle(opt)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
              isActive
                ? "border-primary bg-accent text-accent-foreground"
                : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground",
            )}
          >
            {isActive ? <Check className="size-3.5" /> : null}
            {opt}
          </button>
        )
      })}
    </div>
  )
}
