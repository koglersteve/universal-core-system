"use client";

export function DogMemeBanner({ mood }: { mood?: string }) {
  return (
    <div className="mememydog-mood-banner">
      Dog Mood: {mood || "Unknown"}
    </div>
  );
}
