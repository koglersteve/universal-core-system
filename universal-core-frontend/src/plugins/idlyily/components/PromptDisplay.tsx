"use client";

import React from "react";

export default function PromptDisplay({ prompt }: { prompt?: string }) {
  if (!prompt) return null;

  return (
    <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
      <h2 className="font-semibold text-indigo-800 mb-2">Your Prompt</h2>
      <p className="text-indigo-700">{prompt}</p>
    </div>
  );
}
