import { useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export type AuthState = {
  session: Session | null;
  user: User | null;
  loading: boolean;
};

/**
 * Client-side session state for GlobeTrotter.
 * Registers the auth listener first, then hydrates the existing session.
 */
export function useAuth(): AuthState {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setLoading(false);
    });

    void supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    return () => subscription.subscription.unsubscribe();
  }, []);

  return { session, user: session?.user ?? null, loading };
}

/** Display name resolution: profile name -> signup metadata -> email local part. */
export function resolveDisplayName(user: User | null, profileName?: string | null): string {
  const metaName =
    typeof user?.user_metadata?.["full_name"] === "string"
      ? (user.user_metadata["full_name"] as string)
      : "";
  const name = (profileName ?? "").trim() || metaName.trim();
  if (name) return name;
  const email = user?.email ?? "";
  return email.split("@")[0] || "Traveler";
}
