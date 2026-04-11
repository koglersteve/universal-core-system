"use client";

import { useMoodHistoryStore } from "@/state/useMoodHistoryStore";   // ← FIXED

export function EmotionalEventsFeed() {
  const { history } = useMoodHistoryStore();   // ← FIXED

  return (
    <div className="events-feed">
      <h3 className="events-title">Recent Emotional Events</h3>

      <ul className="events-list">
        {history.slice(-5).reverse().map((e, i) => (
          <li key={i} className="event-item">
            <span className={`event-dot emotion-${e.mood}`}></span>
            {e.mood} — {new Date(e.timestamp).toLocaleTimeString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
