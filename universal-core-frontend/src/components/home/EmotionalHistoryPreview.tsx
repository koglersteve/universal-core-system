"use client";

import { useMoodHistory } from "@/hooks/useMoodHistory";

export function EmotionalHistoryPreview() {
  const { history } = useMoodHistory();

  const recent = history.slice(-5).reverse();

  return (
    <div className="history-preview">
      <h3 className="history-title">Recent Moods</h3>

      {recent.length === 0 && <p>No history yet.</p>}

      <ul className="history-list">
        {recent.map((entry, i) => (
          <li key={i} className="history-item">
            <span className="history-mood">{entry.mood}</span>
            <span className="history-timestamp">
              {new Date(entry.timestamp).toLocaleTimeString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
