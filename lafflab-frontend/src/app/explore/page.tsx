"use client";

import { useEffect, useState } from "react";
import { LaffLabApi } from "@/lib/api";
import type { Post } from "@/types/jokes";
import JokeCard from "@/components/JokeCard";

export default function ExplorePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await LaffLabApi.getPosts();
      setPosts(data);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <JokeCard key={post.id} post={post} active={false} />
      ))}
    </div>
  );
}
