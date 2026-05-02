"use client";

import { useEffect, useState } from "react";
import { LaffLabApi } from "@/lib/api";
import type { HistoryItem } from "@/types/history";
import JokeCard from "@/components/JokeCard";

export default function HistoryPage() {
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await LaffLabApi.getHistory();
      setItems(data);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <p className="text-center opacity-70 pt-10">
        Loading history…
      </p>
    );
  }

  if (items.length === 0) {
    return (
      <p className="text-center opacity-70 pt-10">
        No history yet. Posts you view will appear here.
      </p>
    );
  }

  return (
    <div className="space-y-6 pb-10">
      {items.map((item) => (
        <JokeCard
          key={item.id}
          post={item.post}
          active={false}
        />
      ))}
    </div>
  );
}

