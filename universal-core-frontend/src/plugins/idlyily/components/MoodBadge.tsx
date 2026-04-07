"use client";

import React from "react";

export default function MoodBadge({ mood }: { mood?: string }) {
  if (!mood) return null;

  const colors: Record<string, string> = {
    angry: "bg-red-100 text-red-700",
    frustrated: "bg-orange-100 text-orange-700",
    stressed: "bg-yellow-100 text-yellow-700",
    overwhelmed: "bg-purple-100 text-purple-700",
    anxious: "bg-blue-100 text-blue-700",
    bored: "bg-gray-100 text-gray-700",
    happy: "bg-green-100 text-green-700",
    excited: "bg-pink-100 text-pink-700",
    proud: "bg-emerald-100 text-emerald-700",
    neutral: "bg-slate-100 text-slate-700",
  };

  const style = colors[mood] || "bg-slate-100 text-slate-700";

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${style}`}>
      {mood}
    </span>
  );
}
