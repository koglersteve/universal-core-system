"use client";

import { useEffect, useState } from "react";
import { LaffLabApi } from "@/lib/api";
import type { Post } from "@/types/jokes";

export function useJokesByCategory(categoryId: string | null) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);

      const all = await LaffLabApi.getPosts();

      // No category filtering — Post has no category field
      setPosts(all);

      setLoading(false);
    }

    load();
  }, [categoryId]);

  return { posts, loading };
}
