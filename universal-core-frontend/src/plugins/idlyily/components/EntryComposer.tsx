"use client";

import React, { useState } from "react";

interface EntryComposerProps {
  onSubmit: (text: string) => void;
}

export default function EntryComposer({ onSubmit }: EntryComposerProps) {
  const [text, setText] = useState("");

  return (
    <div className="space-y-3">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your reflection here..."
        className="w-full p-3 border rounded-lg h-32 resize-none"
      />

      <button
        onClick={() => {
          if (text.trim().length > 0) {
            onSubmit(text);
            setText("");
          }
        }}
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
      >
        Save Entry
      </button>
    </div>
  );
}
