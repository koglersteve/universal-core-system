"use client";

import React from "react";
import { useIdlyilyStore } from "./state/useIdlyilyStore";

export function IdlyilyPrompt() {
  const { prompt } = useIdlyilyStore();

  if (!prompt) {
    return (
      <p className="text-gray-500 italic">
        Generating something emotionally meaningful…
      </p>
    );
  }

  return (
    <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
      <h2 className="font-semibold text-indigo-800 mb-2">Your Prompt</h2>
      <p className="text-indigo-700 whitespace-pre-line">{prompt}</p>
    </div>
  );
}
