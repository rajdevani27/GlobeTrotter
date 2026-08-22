import Image from 'next/image'
import { cn } from '@/lib/utils'

/**
 * Card media slot (design system §15, §26).
 * Consistent aspect ratio and rounded crop for every destination/trip/activity card.
 *
 * When no photograph is available it renders an intentional pale-blue tile with the
 * category icon — part of the design system rather than a broken-image placeholder.
 * Pass `src` and it renders the real photo with proper object-fit cropping.
 */
export function CardMedia({
  src,
  alt,
  icon,
  label,
  sizes = '(min-width: 1024px) 340px, (min-width: 640px) 45vw, 90vw',
  className,
  children,
}: {
  src?: string | null
  alt: string
  icon?: React.ReactNode
  label?: string
  sizes?: string
  className?: string
  children?: React.ReactNode
}) {
  return (
    <div
      className={cn(
        'relative aspect-[16/10] overflow-hidden bg-soft',
        className,
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
      ) : (
        <div
          className="flex size-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-soft to-secondary"
          role="img"
          aria-label={alt}
        >
          <span
            className="flex size-11 items-center justify-center rounded-full bg-card/70 text-primary [&_svg]:size-5"
            aria-hidden="true"
          >
            {icon}
          </span>
          {label ? (
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              {label}
            </span>
          ) : null}
        </div>
      )}
      {children}
    </div>
  )
}
