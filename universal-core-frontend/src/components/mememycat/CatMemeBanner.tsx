"use client";

export function CatMemeBanner({ mood }: { mood?: string }) {
  return (
    <div className="mememycat-mood-banner">
      Cat Mood: {mood || "Unknown"}
    </div>
  );
}
