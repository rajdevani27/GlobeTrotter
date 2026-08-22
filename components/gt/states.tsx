import { cn } from '@/lib/utils'
import { Card } from './card'

/** Pale skeleton block matching final component shape (design system §28). */
export function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      aria-hidden="true"
      className={cn('animate-pulse rounded-xl bg-soft', className)}
      {...props}
    />
  )
}

/** Skeleton in the shape of a destination/trip card. */
export function CardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="aspect-[4/3] rounded-none" />
      <div className="grid gap-3 p-4">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-8 w-full rounded-full" />
      </div>
    </Card>
  )
}

/** Friendly empty state (§29). */
export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode
  className?: string
}) {
  return (
    <Card className={cn('flex flex-col items-center gap-3 px-6 py-12 text-center', className)}>
      {icon ? (
        <span
          className="flex size-12 items-center justify-center rounded-full bg-soft text-primary [&_svg]:size-6"
          aria-hidden="true"
        >
          {icon}
        </span>
      ) : null}
      <h3 className="text-lg font-bold text-foreground">{title}</h3>
      {description ? (
        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      ) : null}
      {action ? <div className="mt-2">{action}</div> : null}
    </Card>
  )
}

/** Error state (§30) — same card system, friendly copy. */
export function ErrorState({
  title = 'Something went wrong',
  description = "We couldn't load this content.",
  action,
  className,
}: {
  title?: string
  description?: string
  action?: React.ReactNode
  className?: string
}) {
  return (
    <Card
      role="alert"
      className={cn('flex flex-col items-center gap-3 px-6 py-12 text-center', className)}
    >
      <h3 className="text-lg font-bold text-foreground">{title}</h3>
      <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
      {action ? <div className="mt-2">{action}</div> : null}
    </Card>
  )
}
