"use client";

import { useEffect, useState } from "react";
import JokeCard from "@/components/JokeCard";
import { LaffLabApi } from "@/lib/LaffLabApi";
import type { HistoryItem } from "@/types/history";
import type { Post } from "@/types/jokes";

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        setLoading(true);

        // --- Fetch history ---
        const historyData = await LaffLabApi.getHistory();
        if (!mounted) return;

        setHistory(historyData);

        // --- Extract IDs ---
        const ids = historyData
          .map((h: HistoryItem) => h.postId || h.jokeId || h.contentId)
          .filter(Boolean);

        if (ids.length === 0) {
          setPosts([]);
          return;
        }

        // --- Fetch posts in parallel ---
        const results = await Promise.allSettled(
          ids.map((id: string) => LaffLabApi.getPost(id))
        );

        if (!mounted) return;

        const validPosts = results
          .filter((r) => r.status === "fulfilled")
          .map((r: any) => r.value);

        setPosts(validPosts);
      } catch (err: any) {
        console.error("History load failed:", err);
        if (mounted) setError("Failed to load history");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  // --- UI States ---
  if (loading) {
    return (
      <div className="p-6 text-white/70">
        Loading your history…
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-400">
        {error}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="p-6 text-white/70">
        You haven’t viewed any posts yet.
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-white">History</h1>

      <div className="space-y-4">
        {posts.map((post) => (
          <JokeCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
