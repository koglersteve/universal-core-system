"use client";

import { useState } from "react";

export default function CreatorDraftForm({
  onSubmit,
}: {
  onSubmit: (data: { text: string }) => void;
}) {
  const [text, setText] = useState("");

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ text });
        setText("");
      }}
    >
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your draft..."
        className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white"
        rows={4}
      />

      <button
        type="submit"
        className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/20 transition"
      >
        Save Draft
      </button>
    </form>
  );
}
