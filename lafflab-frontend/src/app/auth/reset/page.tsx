"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useToast } from "@/components/ui/ToastProvider";

export default function ResetPasswordPage() {
  const params = useSearchParams();
  const token = params.get("token");

  const toast = useToast();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/auth/reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });

    if (!res.ok) {
      toast("Try again, champ.", "error");
    } else {
      toast("Password updated. You’re unstoppable.", "success");
    }

    setLoading(false);
  }

  return (
    <div className="max-w-md mx-auto p-6 text-white space-y-6">
      <h1 className="text-2xl font-bold">Reset Your Password</h1>

      <form onSubmit={handleReset} className="space-y-4">
        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 rounded bg-white/10 border border-white/20"
        />

        <button
          disabled={loading}
          className="px-4 py-2 rounded bg-pink-600 hover:bg-pink-700 disabled:opacity-50"
        >
          {loading ? "Updating…" : "Update Password"}
        </button>
      </form>
    </div>
  );
}
