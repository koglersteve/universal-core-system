"use client";

import { useState } from "react";
import { useToast } from "@/components/ui/ToastProvider";

export default function CommentForm({
  onSubmit,
}: {
  onSubmit?: (data: { comment: string }) => Promise<void> | void;
}) {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      await onSubmit?.({ comment });
      toast("Comment posted like a legend.", "success");
      setComment("");
    } catch {
      toast("Try again, champ.", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 text-white">
      <input
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write a comment…"
        className="w-full p-2 rounded bg-white/10 border border-white/20"
      />

      <button
        disabled={loading}
        className="px-4 py-2 rounded bg-white/20 hover:bg-white/30 disabled:opacity-50"
      >
        {loading ? "Posting…" : "Comment"}
      </button>
    </form>
  );
}
