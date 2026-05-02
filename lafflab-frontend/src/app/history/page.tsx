"use client";

import { useEffect, useState } from "react";
import { LaffLabApi } from "@/lib/LaffLabApi";
import type { Post } from "@/types/jokes";
import JokeCard from "@/components/JokeCard";
import LoadingState from "@/components/ui/LoadingState";
import EmptyState from "@/components/ui/EmptyState";
import ErrorState from "@/components/ui/ErrorState";

export default function HistoryPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const data = await LaffLabApi.getHistory();
        if (mounted) {
          setPosts(data);
          setLoading(false);
        }
      } catch (err) {
        console.error("Failed to load history:", err);
        if (mounted) {
          setError("Failed to load your history.");
          setLoading(false);
        }
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <LoadingState message="Loading history…" />;
  if (error) return <ErrorState message={error} />;

  if (posts.length === 0) {
    return (
      <EmptyState
        title="No history yet"
        description="Posts you view will appear here."
      />
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
