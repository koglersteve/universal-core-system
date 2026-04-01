"use client";

import { useRitualContext } from "@/context/RitualContext";

export function EmotionalRitualPreview() {
  const { lastDailyRitual, lastWeeklyRitual } = useRitualContext();

  return (
    <div className="ritual-preview">
      <h3 className="ritual-title">Rituals</h3>

      <p className="ritual-item">
        <strong>Daily Check‑In:</strong>{" "}
        {lastDailyRitual
          ? new Date(lastDailyRitual).toLocaleDateString()
          : "Not yet"}
      </p>

      <p className="ritual-item">
        <strong>Weekly Reflection:</strong>{" "}
        {lastWeeklyRitual
          ? new Date(lastWeeklyRitual).toLocaleDateString()
          : "Not yet"}
      </p>
    </div>
  );
}
