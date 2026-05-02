"use client";

import { useState, useEffect } from "react";
import { LaffLabApi } from "@/lib/api";
import type { Post } from "@/types/jokes";

export function usePosts() {
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

  return { posts, loading };
}

