'use client'

import { Bell, Globe2, Menu, Plus, X } from 'lucide-react'
import { useState } from 'react'
import { Button, buttonVariants } from '@/components/gt/button'

const nav = [
  { label: 'Dashboard', href: '#' },
  { label: 'My Trips', href: '#', active: true },
  { label: 'Explore', href: '#' },
  { label: 'Calendar', href: '#' },
  { label: 'Community', href: '#' },
  { label: 'Profile', href: '#' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <a href="#" className="flex shrink-0 items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Globe2 className="size-5" aria-hidden="true" />
          </span>
          <span className="text-lg font-extrabold tracking-tight text-foreground">
            GlobeTrotter
          </span>
        </a>

        <nav aria-label="Main" className="ml-4 hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <a
              key={item.label}
              href={item.href}
              aria-current={item.active ? 'page' : undefined}
              className={`rounded-full px-3.5 py-2 text-sm transition-colors ${
                item.active
                  ? 'bg-soft font-semibold text-primary'
                  : 'font-medium text-muted-foreground hover:bg-secondary hover:text-foreground'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <a
            href="#"
            className={`${buttonVariants({ size: 'sm' })} hidden sm:inline-flex`}
          >
            <Plus className="size-4" aria-hidden="true" />
            Plan New Trip
          </a>

          <button
            type="button"
            className="relative flex size-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <Bell className="size-5" aria-hidden="true" />
            <span className="absolute right-2.5 top-2.5 size-2 rounded-full bg-highlight ring-2 ring-background" />
            <span className="sr-only">Notifications</span>
          </button>

          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-full bg-soft text-xs font-bold text-primary transition-colors hover:bg-soft-border"
          >
            AR
            <span className="sr-only">Open account menu</span>
          </button>

          <Button
            variant="ghost"
            size="icon-sm"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden"
          >
            {open ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <Menu className="size-5" aria-hidden="true" />
            )}
            <span className="sr-only">
              {open ? 'Close menu' : 'Open menu'}
            </span>
          </Button>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-border bg-card px-4 pb-4 pt-2 lg:hidden"
        >
          <ul className="grid gap-1">
            {nav.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  aria-current={item.active ? 'page' : undefined}
                  className={`flex h-11 items-center rounded-xl px-3.5 text-sm transition-colors ${
                    item.active
                      ? 'bg-soft font-semibold text-primary'
                      : 'font-medium text-muted-foreground hover:bg-secondary hover:text-foreground'
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#"
            className={`${buttonVariants({ block: true })} mt-3 sm:hidden`}
          >
            <Plus className="size-4" aria-hidden="true" />
            Plan New Trip
          </a>
        </nav>
      ) : null}
    </header>
  )
}
