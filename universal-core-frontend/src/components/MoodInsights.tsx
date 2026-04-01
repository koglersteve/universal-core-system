"use client";

import { useMemo } from "react";
import { useMoodHistory } from "@/hooks/useMoodHistory";

export function MoodInsights() {
  const { history } = useMoodHistory();

  const insights = useMemo(() => {
    if (history.length === 0) return null;

    const counts: Record<string, number> = {};
    history.forEach(h => {
      counts[h.mood] = (counts[h.mood] || 0) + 1;
    });

    const mostFrequentMood = Object.entries(counts)
      .sort((a, b) => b[1] - a[1])[0][0];

    const lastMood = history[history.length - 1].mood;

    return {
      mostFrequentMood,
      lastMood,
      totalEntries: history.length
    };
  }, [history]);

  if (!insights) {
    return <p className="mood-insights-empty">No emotional insights yet.</p>;
  }

  return (
    <div className="mood-insights">
      <h2 className="mood-insights-title">Emotional Insights</h2>

      <div className="mood-insights-row">
        <span className="mood-insights-label">Most frequent mood:</span>
        <span className={`mood-insights-value mood-${insights.mostFrequentMood}`}>
          {insights.mostFrequentMood}
        </span>
      </div>

      <div className="mood-insights-row">
        <span className="mood-insights-label">Last recorded mood:</span>
        <span className={`mood-insights-value mood-${insights.lastMood}`}>
          {insights.lastMood}
        </span>
      </div>

      <div className="mood-insights-row">
        <span className="mood-insights-label">Total entries:</span>
        <span className="mood-insights-value">
          {insights.totalEntries}
        </span>
      </div>
    </div>
  );
}
