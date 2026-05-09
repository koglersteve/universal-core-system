"use client";

import { useState } from "react";
import { useToast } from "@/components/ui/ToastProvider";

export default function PrivacySettingsForm({ onSubmit }: { onSubmit?: (data: any) => Promise<void> | void }) {
  const [isPrivate, setIsPrivate] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      await onSubmit?.({ isPrivate });
      toast("Privacy updated. Ninja mode activated.", "success");
    } catch {
      toast("Try again, champ.", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-white">
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={isPrivate}
          onChange={(e) => setIsPrivate(e.target.checked)}
        />
        Private account
      </label>

      <button disabled={loading} className="px-4 py-2 rounded bg-white/20 hover:bg-white/30 disabled:opacity-50">
        {loading ? "Saving…" : "Save"}
      </button>
    </form>
  );
}
