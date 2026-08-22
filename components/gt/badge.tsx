import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/**
 * Soft rounded badges (design system §7).
 * Soft background + dark readable text. Never heavily saturated.
 */
export const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap [&_svg]:size-3.5',
  {
    variants: {
      tone: {
        neutral: 'bg-secondary text-muted-foreground',
        blue: 'bg-soft text-primary',
        /** Orange — planning %, budget attention, special highlights. Sparingly. */
        highlight: 'bg-highlight-soft text-highlight-foreground',
        success: 'bg-success-soft text-success-foreground',
        danger: 'bg-destructive-soft text-destructive',
        /** On top of imagery */
        overlay:
          'border border-border/50 bg-card/90 text-foreground backdrop-blur-sm',
      },
      size: {
        sm: 'px-2 py-0.5 text-[11px]',
        md: 'px-2.5 py-1 text-xs',
      },
    },
    defaultVariants: { tone: 'neutral', size: 'md' },
  },
)

export function Badge({
  className,
  tone,
  size,
  ...props
}: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants>) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ tone, size }), className)}
      {...props}
    />
  )
}
