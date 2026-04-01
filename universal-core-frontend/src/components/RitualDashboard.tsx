"use client";

import { RitualCard } from "./RitualCard";
import { useMoodHistory } from "@/hooks/useMoodHistory";

export function RitualDashboard() {
  const { history } = useMoodHistory();
  const lastMood = history.length ? history[history.length - 1].mood : "None";

  return (
    <div className="ritual-dashboard">
      <h2 className="ritual-dashboard-title">Emotional Rituals</h2>

      <div className="ritual-dashboard-grid">
        <RitualCard
          title="Daily Check‑In"
          description="A simple moment to acknowledge how you're feeling today."
        />

        <RitualCard
          title="Weekly Reflection"
          description="A gentle look back at your emotional arc this week."
        />

        <RitualCard
          title="Current Emotional State"
          description={`Your last recorded mood was: ${lastMood}`}
        />
      </div>
    </div>
  );
}

