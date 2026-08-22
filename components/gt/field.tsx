import { ChevronDown, Search } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Input system (design system §9) + search bar (§10).
 * One shared control surface so no form invents its own look.
 */
export const controlClasses =
  'h-11 w-full rounded-xl border border-input bg-card px-3.5 text-sm text-foreground transition-colors placeholder:text-muted-foreground/70 hover:border-soft-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/25 disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-destructive aria-[invalid=true]:ring-destructive/20'

export function Label({
  className,
  children,
  icon,
  ...props
}: React.ComponentProps<'label'> & { icon?: React.ReactNode }) {
  return (
    <label
      className={cn(
        'flex items-center gap-1.5 text-sm font-semibold text-foreground',
        className,
      )}
      {...props}
    >
      {icon ? (
        <span className="text-primary [&_svg]:size-4" aria-hidden="true">
          {icon}
        </span>
      ) : null}
      {children}
    </label>
  )
}

export function Input({ className, ...props }: React.ComponentProps<'input'>) {
  return <input className={cn(controlClasses, className)} {...props} />
}

export function Select({
  className,
  children,
  ...props
}: React.ComponentProps<'select'>) {
  return (
    <div className="relative">
      <select
        className={cn(controlClasses, 'appearance-none pr-10', className)}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden="true"
      />
    </div>
  )
}

/** Label + control + hint/error, the standard vertical form unit. */
export function Field({
  id,
  label,
  icon,
  hint,
  error,
  children,
  className,
}: {
  id: string
  label: string
  icon?: React.ReactNode
  hint?: string
  error?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('grid gap-2', className)}>
      <Label htmlFor={id} icon={icon}>
        {label}
      </Label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-xs font-medium text-destructive">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-xs text-muted-foreground">
          {hint}
        </p>
      ) : null}
    </div>
  )
}

/** Rounded search bar with leading icon — Explore, My Trips, Community, Dashboard. */
export function SearchInput({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<'input'> & { containerClassName?: string }) {
  return (
    <div className={cn('relative', containerClassName)}>
      <Search
        className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden="true"
      />
      <input
        type="search"
        className={cn(
          controlClasses,
          'rounded-full pl-11 [&::-webkit-search-cancel-button]:appearance-none',
          className,
        )}
        {...props}
      />
    </div>
  )
}
