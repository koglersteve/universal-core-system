"use client";

import { useState } from "react";
import LoadingButton from "@/components/ui/LoadingButton";
import { useToast } from "@/components/ui/ToastProvider";

export default function EditPostForm({
  initialText = "",
  onSubmit,
}: {
  initialText?: string;
  onSubmit?: (data: { text: string }) => Promise<void> | void;
}) {
  const [text, setText] = useState(initialText);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      await onSubmit?.({ text });
      toast("Boom! Saved.", "success");
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

      <button
        disabled={loading}
        className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Saving…" : "Save Changes"}
      </button>
    </form>
  );
}
