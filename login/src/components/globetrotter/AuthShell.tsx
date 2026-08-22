import type { ReactNode } from "react";
import { Brand } from "@/components/globetrotter/Brand";
import heroCoast from "@/assets/hero-coast.jpg";

type AuthShellProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
};

/** Split-screen auth layout shared by signup, login and password recovery. */
export function AuthShell({ title, subtitle, children, footer }: AuthShellProps) {
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[1.05fr_1fr]">
      <aside className="relative hidden overflow-hidden lg:block">
        <img
          src={heroCoast}
          alt="Aerial view of a turquoise coastline with a winding road"
          width={1920}
          height={1280}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-ocean-deep/65" />
        <div className="relative flex h-full flex-col justify-between p-10">
          <Brand onDark />
          <div className="max-w-md">
            <p className="text-display text-3xl leading-tight text-primary-foreground">
              Every great journey begins with a plan.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-primary-foreground/80">
              Keep your routes, stops and travel days in one calm place — and pick up planning from
              any device.
            </p>
          </div>
        </div>
      </aside>

      <main className="flex min-h-screen items-center justify-center bg-map-grid px-5 py-12 sm:px-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden">
            <Brand />
          </div>
          <div className="mt-8 lg:mt-0">
            <h1 className="text-3xl font-semibold sm:text-4xl">{title}</h1>
            <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
          </div>
          <div className="mt-8">{children}</div>
          {footer ? <div className="mt-6 text-sm text-muted-foreground">{footer}</div> : null}
        </div>
      </main>
    </div>
  );
}
