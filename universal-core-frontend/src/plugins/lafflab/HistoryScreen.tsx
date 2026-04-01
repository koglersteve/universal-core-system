"use client";

import { useEffect, useState } from "react";
import { CrossAppLauncher } from "@/components/crossapp/CrossAppLauncher";

type HistoryItem = {
  id: string;
  text: string;
  category?: string;
  mood?: string;
  timestamp: string;
};

export function HistoryScreen() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHistory() {
      try {
        const res = await fetch("/api/lafflab/history");
        const data = await res.json();
        setHistory(data.history || []);
      } catch {
        setHistory([]);
      } finally {
        setLoading(false);
      }
    }

    loadHistory();
  }, []);

  if (loading) {
    return (
      <div className="history-container">
        <p className="history-loading">Loading your humor history…</p>
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="history-container">
        <h2 className="history-title">Your Humor History</h2>
        <p className="history-empty">
          Nothing here yet.  
          As you explore LAFFlab, your past laughs will show up here.
        </p>
      </div>
    );
  }

  return (
    <div className="history-container">
      <h2 className="history-title">Your Humor History</h2>

      <div className="history-list">
        {history.map((item) => (
          <div key={item.id} className="history-card">
            <p className="history-text">{item.text}</p>

            <div className="history-meta">
              {item.category && (
                <p className="history-category">
                  Category: {item.category}
                </p>
              )}
              <p className="history-timestamp">
                {new Date(item.timestamp).toLocaleString()}
              </p>
            </div>

            <div className="history-actions">
              <CrossAppLauncher
                sourceApp="lafflab"
                payload={{
                  mood: item.mood,
                  text: item.text,
                  category: item.category,
                  timestamp: item.timestamp
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
