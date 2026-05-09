"use client";

import { useState } from "react";
import { useToast } from "@/components/ui/ToastProvider";

export default function LoginForm({ onSubmit }: { onSubmit?: (data: any) => Promise<void> | void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      await onSubmit?.({ email, password });
      toast("Welcome back, legend.", "success");
    } catch {
      toast("Try again, champ.", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-white">
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full p-2 rounded bg-white/10 border border-white/20"
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="w-full p-2 rounded bg-white/10 border border-white/20"
      />

      <button disabled={loading} className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 disabled:opacity-50">
        {loading ? "Logging in…" : "Log In"}
      </button>
    </form>
  );
}
