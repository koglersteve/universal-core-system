"use client";

import { useEffect, useState } from "react";
import { LaffLabApi } from "@/lib/LaffLabApi";
import type { Post } from "@/types/jokes";
import JokeCard from "@/components/JokeCard";

export default function ExplorePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const data = await LaffLabApi.getPosts();
        if (mounted) {
          setPosts(data);
          setLoading(false);
        }
      } catch (err) {
        console.error("Failed to load explore posts:", err);
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <p className="text-white/70 p-6">Loading…</p>;

  return (
    <div className="space-y-6 p-6">
      {posts.map((post) => (
        <JokeCard key={post.id} post={post} />
      ))}
    </div>
  );
}
