"use client";

import { useEffect, useState } from "react";
import { LaffLabApi } from "@/lib/api";
import type { HistoryItem } from "@/types/history";
import type { Post } from "@/types/jokes";
import JokeCard from "@/components/JokeCard";

export default function HistoryPage() {
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [posts, setPosts] = useState<Record<string, Post>>({});
  const [loading, setLoading] = useState(true);

  // Extract ANY possible ID field from a history item
  function extractId(item: HistoryItem): string | null {
    const possibleKeys = [
      "postId",
      "jokeId",
      "id",
      "post_id",
      "joke_id",
      "contentId",
      "content_id",
    ];

    for (const key of possibleKeys) {
      if (key in item) {
        const value = (item as any)[key];
        if (typeof value === "string" && value.trim().length > 0) {
          return value;
        }
      }
    }

    return null;
  }

  useEffect(() => {
    async function load() {
      setLoading(true);

      const history = await LaffLabApi.getHistory();
      setItems(history);

      const ids = history
        .map((item) => extractId(item))
        .filter(Boolean) as string[];

      const uniqueIds = [...new Set(ids)];

      const fetched: Record<string, Post> = {};

      for (const id of uniqueIds) {
        try {
          fetched[id] = await LaffLabApi.getPost(id);
        } catch {
          // ignore missing posts
        }
      }

      setPosts(fetched);
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
      {items.map((item) => {
        const id = extractId(item);
        if (!id) return null;

        const post = posts[id];
        if (!post) return null;

        return (
          <JokeCard
            key={item.id}
            post={post}
            active={false}
          />
        );
      })}
    </div>
  );
}

