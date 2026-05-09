"use client";

import { useState } from "react";
import LoadingButton from "@/components/ui/LoadingButton";
import { useToast } from "@/components/ui/ToastProvider";

export default function CreateForm({ onSubmit }: { onSubmit?: (data: any) => Promise<void> | void }) {
  const [text, setText] = useState("");
  const [media, setMedia] = useState<File | null>(null);
  const toast = useToast();

  async function handleSubmit() {
    try {
      await onSubmit?.({ text, media });
      toast("Post published!", "success");
      setText("");
      setMedia(null);
    } catch (err) {
      toast("Failed to publish post", "error");
    }
  }

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-4 text-white">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write something funny..."
        className="w-full p-3 rounded bg-white/10 border border-white/20"
        rows={4}
      />

      <input
        type="file"
        accept="image/*,video/*"
        onChange={(e) => setMedia(e.target.files?.[0] ?? null)}
        className="block text-sm text-white/70"
      />

      <LoadingButton onClick={handleSubmit} className="bg-pink-600 hover:bg-pink-700">
        Publish
      </LoadingButton>
    </form>
  );
}
