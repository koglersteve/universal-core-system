import { useEffect, useState } from "react";
import { LaffLabApi } from "@/lib/api";

export interface FeedItem {
  id: string;
  content: string;
  createdAt: string;
  author: {
    id: string;
    username: string;
    avatarUrl: string | null;
  };
}

export interface FeedResponse {
  items: FeedItem[];
  nextCursor: string | null;
}

export function useFeed() {
  const [posts, setPosts] = useState<FeedItem[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const load = async () => {
    if (loading || done) return;

    setLoading(true);

    try {
      const data: FeedResponse = await LaffLabApi.fetchFeed({
        cursor,
        limit: 10,
      });

      setPosts((prev) => [...prev, ...data.items]);

      if (data.nextCursor) {
        setCursor(data.nextCursor);
      } else {
        setDone(true);
      }
    } catch (err) {
      console.error("Feed load failed:", err);
    }

    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  return { posts, load, loading, done };
}
