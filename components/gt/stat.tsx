import { cn } from '@/lib/utils'

/**
 * Statistic card (design system §5) — pale-blue rounded container,
 * number visually stronger than the label.
 * Used for Days / Cities / Budget / Estimated / Remaining / Trips / Countries.
 */
export function Stat({
  label,
  value,
  hint,
  tone = 'soft',
  className,
}: {
  label: string
  value: React.ReactNode
  hint?: string
  /** `highlight` = orange, reserved for budget attention / remaining amounts. */
  tone?: 'soft' | 'highlight'
  className?: string
}) {
  return (
    <div
      className={cn(
        'rounded-xl px-4 py-3',
        tone === 'soft' ? 'bg-soft' : 'bg-highlight-soft',
        className,
      )}
    >
      <p
        className={cn(
          'text-xs font-medium',
          tone === 'soft' ? 'text-muted-foreground' : 'text-highlight-foreground',
        )}
      >
        {label}
      </p>
      <p
        className={cn(
          'mt-0.5 text-xl font-bold tabular-nums',
          tone === 'soft' ? 'text-foreground' : 'text-highlight-foreground',
        )}
      >
        {value}
      </p>
      {hint ? (
        <p className="mt-0.5 text-[11px] text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  )
}

/** Evenly distributed row of statistics. */
export function StatGrid({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('grid grid-cols-2 gap-3 sm:grid-cols-4', className)}
      {...props}
    />
  )
}
