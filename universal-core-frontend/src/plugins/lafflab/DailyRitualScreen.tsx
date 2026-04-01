"use client";

import { useRitualContext } from "@/context/RitualContext";
import { TodayRitualCard } from "@/components/home/TodayRitualCard";
import { EmotionalRitualPreview } from "@/components/home/EmotionalRitualPreview";
import { useMood } from "@/hooks/useMood";
import { getMoodCaption } from "@/lib/memeemotions";

export function DailyRitualScreen() {
  const { lastDailyRitual, lastWeeklyRitual } = useRitualContext();
  const mood = useMood();

  const caption = mood?.mood ? getMoodCaption(mood.mood) : null;

  const dailyDate = lastDailyRitual
    ? new Date(lastDailyRitual).toLocaleDateString()
    : "Not yet";

  const weeklyDate = lastWeeklyRitual
    ? new Date(lastWeeklyRitual).toLocaleDateString()
    : "Not yet";

  return (
    <div className="dailyritual-container">
      <h1 className="dailyritual-title">Daily Ritual</h1>

      {caption && (
        <p className="dailyritual-caption">
          {caption}
        </p>
      )}

      <div className="dailyritual-section">
        <h3>Today’s Check‑In</h3>
        <TodayRitualCard />
        <p className="dailyritual-meta">Last completed: {dailyDate}</p>
      </div>

      <div className="dailyritual-section">
        <h3>Weekly Reflection</h3>
        <p className="dailyritual-meta">Last completed: {weeklyDate}</p>
      </div>

      <div className="dailyritual-section">
        <EmotionalRitualPreview />
      </div>

      <button
        className="dailyritual-start-button"
        onClick={() => {
          // This is where you’ll route to the ritual flow
          window.location.href = "/ritual/start";
        }}
      >
        Start Ritual →
      </button>
    </div>
  );
}
