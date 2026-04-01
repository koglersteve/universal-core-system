"use client";

export function HOAMemeBanner({ mood }: { mood?: string }) {
  return (
    <div className="hoameme-mood-banner">
      HOA Mood: {mood || "Unknown"}
    </div>
  );
}
