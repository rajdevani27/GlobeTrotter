import { cn } from '@/lib/utils'

/**
 * The GlobeTrotter card (design system §4) — the single most important surface.
 * White, thin border, large radius, soft shadow, generous padding.
 * Every card-like surface in the app composes from this.
 */
export function Card({
  className,
  interactive = false,
  ...props
}: React.ComponentProps<'div'> & { interactive?: boolean }) {
  return (
    <div
      data-slot="card"
      className={cn(
        'rounded-2xl border border-border bg-card text-card-foreground shadow-card',
        interactive &&
          'transition-all duration-200 hover:-translate-y-0.5 hover:border-soft-border hover:shadow-card-hover',
        className,
      )}
      {...props}
    />
  )
}

export function CardHeader({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        'flex flex-wrap items-start justify-between gap-3 p-5 sm:p-6',
        className,
      )}
      {...props}
    />
  )
}

export function CardTitle({ className, ...props }: React.ComponentProps<'h2'>) {
  return (
    <h2
      data-slot="card-title"
      className={cn('text-base font-bold text-foreground', className)}
      {...props}
    />
  )
}

export function CardDescription({
  className,
  ...props
}: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot="card-description"
      className={cn('text-sm leading-relaxed text-muted-foreground', className)}
      {...props}
    />
  )
}

export function CardContent({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-content"
      className={cn('p-5 pt-0 sm:p-6 sm:pt-0', className)}
      {...props}
    />
  )
}

export function CardFooter({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        'flex flex-col gap-3 border-t border-border p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6',
        className,
      )}
      {...props}
    />
  )
}

/** Pale-blue supporting panel used inside cards for metadata sections (§2, §17). */
export function SoftPanel({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="soft-panel"
      className={cn('rounded-xl bg-soft p-4 text-soft-foreground', className)}
      {...props}
    />
  )
}
