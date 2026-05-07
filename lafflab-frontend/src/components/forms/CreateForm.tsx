"use client";

import { useState } from "react";
import ActionButton from "@/components/ActionButton";

export default function CreateForm({ onSubmit }: { onSubmit?: (data: any) => void }) {
  const [text, setText] = useState("");
  const [media, setMedia] = useState<File | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = { text, media };
    onSubmit?.(payload);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-white">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write something funny..."
        className="w-full p-3 rounded bg-white/10 border border-white/20 focus:outline-none"
        rows={4}
      />

      <input
        type="file"
        accept="image/*,video/*"
        onChange={(e) => setMedia(e.target.files?.[0] ?? null)}
        className="block text-sm text-gray-300"
      />

      <ActionButton type="submit">
        Publish
      </ActionButton>
    </form>
  );
}
