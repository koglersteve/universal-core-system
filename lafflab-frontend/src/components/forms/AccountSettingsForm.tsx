"use client";

import { useState } from "react";
import { useToast } from "@/components/ui/ToastProvider";

export default function AccountSettingsForm({ onSubmit }: { onSubmit?: (data: any) => Promise<void> | void }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      await onSubmit?.({ email });
      toast("Boom! Saved.", "success");
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
        placeholder="Email address"
        className="w-full p-2 rounded bg-white/10 border border-white/20"
      />

      <button disabled={loading} className="px-4 py-2 rounded bg-white/20 hover:bg-white/30 disabled:opacity-50">
        {loading ? "Saving…" : "Save"}
      </button>
    </form>
  );
}
