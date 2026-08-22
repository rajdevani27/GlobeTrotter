import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { AuthShell } from "@/components/globetrotter/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/use-auth";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create your GlobeTrotter account" },
      {
        name: "description",
        content:
          "Sign up for GlobeTrotter to plan trips, build itineraries and keep every journey organised.",
      },
      { property: "og:title", content: "Create your GlobeTrotter account" },
      {
        property: "og:description",
        content: "Sign up for GlobeTrotter and open your personal travel dashboard.",
      },
    ],
  }),
  component: SignupPage,
});

const signupSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(2, { message: "Please enter your full name." })
      .max(100, { message: "Name must be less than 100 characters." }),
    email: z
      .string()
      .trim()
      .min(1, { message: "Email is required." })
      .email({ message: "Enter a valid email address." })
      .max(255, { message: "Email must be less than 255 characters." }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." })
      .max(72, { message: "Password must be less than 72 characters." }),
    confirmPassword: z.string().min(1, { message: "Please confirm your password." }),
  })
  .refine((values) => values.password === values.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

type FieldErrors = Partial<Record<"fullName" | "email" | "password" | "confirmPassword", string>>;

function SignupPage() {
  const navigate = useNavigate();
  const { session, loading } = useAuth();
  const [values, setValues] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [needsConfirmation, setNeedsConfirmation] = useState(false);

  useEffect(() => {
    if (!loading && session) void navigate({ to: "/dashboard", replace: true });
  }, [loading, session, navigate]);

  const setField = (key: keyof typeof values) => (value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
    setFormError(null);
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const parsed = signupSchema.safeParse(values);
    if (!parsed.success) {
      const nextErrors: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FieldErrors;
        if (key && !nextErrors[key]) nextErrors[key] = issue.message;
      }
      setErrors(nextErrors);
      return;
    }

    setSubmitting(true);
    const { data, error } = await supabase.auth.signUp({
      email: parsed.data.email,
      password: parsed.data.password,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
        data: { full_name: parsed.data.fullName },
      },
    });
    setSubmitting(false);

    if (error) {
      setFormError(
        error.message.toLowerCase().includes("already")
          ? "An account with this email already exists. Try logging in instead."
          : "We couldn't create your account. Please check your details and try again.",
      );
      return;
    }

    if (!data.session) {
      setNeedsConfirmation(true);
      return;
    }

    void navigate({ to: "/dashboard", replace: true });
  }

  if (needsConfirmation) {
    return (
      <AuthShell
        title="Check your email"
        subtitle="We sent a confirmation link to finish setting up your GlobeTrotter account."
      >
        <p className="text-sm leading-relaxed text-muted-foreground">
          Open the link in your inbox and you'll land straight in your dashboard.
        </p>
        <Button asChild variant="outline" className="mt-6">
          <Link to="/login">Back to login</Link>
        </Button>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title="Create your account"
      subtitle="Start planning your next adventure in under a minute."
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-primary hover:underline">
            Login
          </Link>
        </>
      }
    >
      <form noValidate onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full name</Label>
          <Input
            id="fullName"
            name="fullName"
            autoComplete="name"
            placeholder="Amelia Hart"
            value={values.fullName}
            onChange={(e) => setField("fullName")(e.target.value)}
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
          />
          {errors.fullName ? (
            <p id="fullName-error" role="alert" className="text-sm text-destructive">
              {errors.fullName}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={values.email}
            onChange={(e) => setField("email")(e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email ? (
            <p id="email-error" role="alert" className="text-sm text-destructive">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder="At least 8 characters"
            value={values.password}
            onChange={(e) => setField("password")(e.target.value)}
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? "password-error" : undefined}
          />
          {errors.password ? (
            <p id="password-error" role="alert" className="text-sm text-destructive">
              {errors.password}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            placeholder="Re-enter your password"
            value={values.confirmPassword}
            onChange={(e) => setField("confirmPassword")(e.target.value)}
            aria-invalid={Boolean(errors.confirmPassword)}
            aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined}
          />
          {errors.confirmPassword ? (
            <p id="confirmPassword-error" role="alert" className="text-sm text-destructive">
              {errors.confirmPassword}
            </p>
          ) : null}
        </div>

        {formError ? (
          <p
            role="alert"
            className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
          >
            {formError}
          </p>
        ) : null}

        <Button type="submit" size="lg" className="w-full" disabled={submitting}>
          {submitting ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              Creating account…
            </>
          ) : (
            "Create account"
          )}
        </Button>
      </form>
    </AuthShell>
  );
}
