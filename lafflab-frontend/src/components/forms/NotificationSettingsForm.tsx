"use client";

import { useState } from "react";
import { useToast } from "@/components/ui/ToastProvider";

export default function NotificationSettingsForm({
  initial = { trending: true },
  onSubmit,
}: {
  initial?: { trending: boolean };
  onSubmit?: (data: any) => Promise<void> | void;
}) {
  const [trending, setTrending] = useState(initial.trending);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      await onSubmit?.({ trending });
      toast("Notifications tuned. You're dialed in.", "success");
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
          checked={trending}
          onChange={(e) => setTrending(e.target.checked)}
        />
        Notify me when posts trend
      </label>

      <button disabled={loading} className="px-4 py-2 rounded bg-white/20 hover:bg-white/30 disabled:opacity-50">
        {loading ? "Saving…" : "Save"}
      </button>
    </form>
  );
}
