"use client";

import { useMoodHistory } from "@/hooks/useMoodHistory";

export function MoodHistoryPanel() {
  const { history } = useMoodHistory();

  return (
    <div className="mood-history-panel">
      <h2 className="mood-history-title">Emotional Timeline</h2>

      {history.length === 0 && (
        <p className="mood-history-empty">
          No mood entries yet. Your emotional timeline will appear here.
        </p>
      )}

      <ul className="mood-history-list">
        {history.map((entry, i) => (
          <li key={i} className="mood-history-item">
            <span className={`mood-history-mood mood-${entry.mood}`}>
              {entry.mood}
            </span>

            <span className="mood-history-time">
              {new Date(entry.timestamp).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
