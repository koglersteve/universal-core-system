"use client";

import { useState } from "react";
import { useToast } from "@/components/ui/ToastProvider";

export default function CreatorDraftForm({ onSubmit }: { onSubmit?: (data: any) => Promise<void> | void }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      await onSubmit?.({ text });
      toast("Draft saved. Comedy genius unlocked.", "success");
    } catch {
      toast("Try again, champ.", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-white">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-3 rounded bg-white/10 border border-white/20"
        rows={4}
      />

      <button disabled={loading} className="px-4 py-2 rounded bg-purple-600 hover:bg-purple-700 disabled:opacity-50">
        {loading ? "Saving…" : "Save Draft"}
      </button>
    </form>
  );
}
