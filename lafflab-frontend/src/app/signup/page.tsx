"use client";

import { FormEvent, useState } from "react";
import AppShell from "@/components/AppShell";
import { useSupabase } from "@/hooks/useSupabase";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const supabase = useSupabase();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/creator");
  }

  return (
    <AppShell title="Sign up">
      <div className="space-y-4 max-w-sm">
        <p className="text-white/70 text-sm">
          Create an account to unlock Creator Studio and cross-app reactions.
        </p>

        <form onSubmit={onSubmit} className="space-y-3">
          <input
            type="email"
            required
            placeholder="Email"
            className="w-full px-3 py-2 rounded bg-white/5 border border-white/15 text-white text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            required
            placeholder="Password"
            className="w-full px-3 py-2 rounded bg-white/5 border border-white/15 text-white text-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <p className="text-xs text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded bg-white text-black text-sm font-medium disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </form>

        <p className="text-white/60 text-xs">
          Already have an account?{" "}
          <a href="/login" className="text-white underline">
            Log in
          </a>
        </p>
      </div>
    </AppShell>
  );
}
