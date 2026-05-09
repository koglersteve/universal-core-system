"use client";

import { useState } from "react";
import { useToast } from "@/components/ui/ToastProvider";

export default function UploadForm({
  onSubmit,
}: {
  onSubmit?: (data: { file: File | null }) => Promise<void> | void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      await onSubmit?.({ file });
      toast("Uploaded like a champ.", "success");
      setFile(null);
    } catch {
      toast("Try again, champ.", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-white">
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        className="text-sm text-white/70"
      />

      <button
        disabled={loading}
        className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? "Uploading…" : "Upload"}
      </button>
    </form>
  );
}
