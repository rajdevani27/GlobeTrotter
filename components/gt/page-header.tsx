import { ChevronLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Page shell + header (design system §12, §13).
 * Every page uses these two so margins, max width and heading rhythm match.
 */
export function PageShell({
  className,
  ...props
}: React.ComponentProps<'main'>) {
  return (
    <main
      className={cn(
        'mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8',
        className,
      )}
      {...props}
    />
  )
}

export function PageHeader({
  title,
  description,
  backLabel,
  backHref,
  action,
  className,
}: {
  title: string
  description?: string
  backLabel?: string
  backHref?: string
  action?: React.ReactNode
  className?: string
}) {
  return (
    <header
      className={cn(
        'mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between',
        className,
      )}
    >
      <div className="grid gap-2">
        {backLabel ? (
          <a
            href={backHref ?? '#'}
            className="inline-flex w-fit items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
            {backLabel}
          </a>
        ) : null}
        <h1 className="text-3xl font-extrabold text-balance text-foreground sm:text-4xl">
          {title}
        </h1>
        {description ? (
          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="flex shrink-0 gap-2">{action}</div> : null}
    </header>
  )
}

/** Section heading used between cards within a page (§12). */
export function SectionHeader({
  title,
  description,
  action,
  id,
  className,
}: {
  title: string
  description?: string
  action?: React.ReactNode
  id?: string
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between',
        className,
      )}
    >
      <div className="grid gap-1">
        <h2 id={id} className="text-xl font-bold text-foreground">
          {title}
        </h2>
        {description ? (
          <p className="text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  )
}
