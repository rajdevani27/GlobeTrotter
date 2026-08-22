import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/**
 * GlobeTrotter button system (design system §6).
 * Pill-like, comfortable height, subtle hover. Never tiny.
 *
 * Use `buttonVariants({ variant, size })` to give an <a> or <Link> the same look.
 */
export const buttonVariants = cva(
  'inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-150 outline-none disabled:pointer-events-none disabled:opacity-45 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-primary-foreground shadow-[0_1px_2px_oklch(0.26_0.06_258/0.16)] hover:bg-primary-hover active:translate-y-px',
        secondary:
          'border border-border bg-card text-foreground hover:border-soft-border hover:bg-soft active:translate-y-px',
        outline:
          'border border-input bg-transparent text-foreground hover:border-primary/40 hover:bg-soft active:translate-y-px',
        ghost: 'text-muted-foreground hover:bg-soft hover:text-foreground',
        destructive:
          'bg-destructive text-destructive-foreground hover:opacity-90 active:translate-y-px',
        link: 'font-medium text-primary underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-9 px-3.5 text-[13px]',
        md: 'h-11 px-5 text-sm',
        lg: 'h-12 px-6 text-[15px]',
        icon: 'size-10',
        'icon-sm': 'size-9',
      },
      block: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

export type ButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants>

export function Button({
  className,
  variant,
  size,
  block,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      data-slot="button"
      className={cn(buttonVariants({ variant, size, block }), className)}
      {...props}
    />
  )
}
