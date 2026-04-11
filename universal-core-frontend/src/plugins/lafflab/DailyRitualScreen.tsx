"use client";

import { useRitualStore } from "@/state/useRitualStore";

export function DailyRitualScreen() {
  // Zustand selectors — hydration safe
  const lastDailyRitual = useRitualStore((s) => s.lastDailyRitual);
  const lastWeeklyRitual = useRitualStore((s) => s.lastWeeklyRitual);
  const setLastDailyRitual = useRitualStore((s) => s.setLastDailyRitual);
  const setLastWeeklyRitual = useRitualStore((s) => s.setLastWeeklyRitual);

  // Optional: derived streaks if your store exposes them
  const dailyStreak = useRitualStore((s) => s.dailyStreak);
  const weeklyStreak = useRitualStore((s) => s.weeklyStreak);

  const handleCompleteDaily = () => {
    setLastDailyRitual(Date.now());
  };

  const handleCompleteWeekly = () => {
    setLastWeeklyRitual(Date.now());
  };

  return (
    <div className="ritual-screen">
      <h2 className="ritual-title">Daily Ritual</h2>

      <div className="ritual-block">
        <p>
          <strong>Last Daily Check‑In:</strong>{" "}
          {lastDailyRitual
            ? new Date(lastDailyRitual).toLocaleDateString()
            : "Not yet"}
        </p>

        {dailyStreak !== undefined && (
          <p>
            <strong>Daily Streak:</strong> {dailyStreak} days
          </p>
        )}

        <button className="ritual-btn" onClick={handleCompleteDaily}>
          Complete Daily Ritual
        </button>
      </div>

      <h2 className="ritual-title" style={{ marginTop: "2rem" }}>
        Weekly Ritual
      </h2>

      <div className="ritual-block">
        <p>
          <strong>Last Weekly Reflection:</strong>{" "}
          {lastWeeklyRitual
            ? new Date(lastWeeklyRitual).toLocaleDateString()
            : "Not yet"}
        </p>

        {weeklyStreak !== undefined && (
          <p>
            <strong>Weekly Streak:</strong> {weeklyStreak} weeks
          </p>
        )}

        <button className="ritual-btn" onClick={handleCompleteWeekly}>
          Complete Weekly Ritual
        </button>
      </div>
    </div>
  );
}
