"use client";

import { useEffect, useState } from "react";
import { LaffLabApi } from "@/lib/api";
import type { Post } from "@/types/jokes";

export function useJokesByCategory(categoryId: string | null) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!categoryId) return;

    async function load() {
      setLoading(true);

      const all = await LaffLabApi.getPosts();

      const filtered = all.filter(
        (p) => p.categoryId === categoryId // ← adjust if your schema uses a different field
      );

      setPosts(filtered);
      setLoading(false);
    }

    load();
  }, [categoryId]);

  return { posts, loading };
}
