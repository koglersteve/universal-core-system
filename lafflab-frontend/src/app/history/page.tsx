"use client";

import { useEffect, useState } from "react";
import { useHistory } from "@/hooks/useHistory";
import { Joke } from "@/lib/models";
import { LaffLabApi } from "@/lib/api/LaffLabApi";
import { JokeCard } from "@/components/JokeCard";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { EmptyState } from "@/components/EmptyState";
import { timeAgo } from "@/lib/time";

export default function HistoryPage() {
  const { history, loadHistory, loading, streak } = useHistory();
  const [jokes, setJokes] = useState<Joke[]>([]);

  useEffect(() => {
    if (history.length === 0) {
      loadHistory();
      return;
    }

    async function load() {
      const list = await Promise.all(
        history.map((h) => LaffLabApi.getJokeById(h.id))
      );
      setJokes(list);
    }

    load();
  }, [history]);

  return (
    <div style={{ padding: 24 }}>
      <h1>History</h1>

      {streak > 1 && (
        <p style={{ opacity: 0.7, marginBottom: 16 }}>
          🔥 Streak: {streak} days
        </p>
      )}

      {loading && <LoadingSpinner />}

      {!loading && history.length === 0 && (
        <EmptyState message="No history yet." />
      )}

      {history.map((h, i) => (
        <div key={h.id} style={{ marginBottom: 8 }}>
          <p style={{ opacity: 0.6, fontSize: 12 }}>
            Viewed {timeAgo(h.viewedAt)}
          </p>
          <JokeCard joke={jokes[i]} />
        </div>
      ))}
    </div>
  );
}

