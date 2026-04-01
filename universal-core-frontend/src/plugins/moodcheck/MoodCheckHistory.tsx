"use client";

import { MoodHistoryPanel } from "@/components/MoodHistoryPanel";
import { MoodInsights } from "@/components/MoodInsights";
import { RitualDashboard } from "@/components/RitualDashboard";

export function MoodCheckHistory() {
  return (
    <div className="moodcheck-history">
      <MoodInsights />
      <MoodHistoryPanel />
      <RitualDashboard />
    </div>
  );
}

