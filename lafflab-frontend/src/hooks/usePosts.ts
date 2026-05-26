import { useEffect, useState } from "react";
import { LaffLabApi } from "@/lib/api";

export function usePosts() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const data = await LaffLabApi.getPosts();
        if (!cancelled) {
          setPosts(Array.isArray(data.posts) ? data.posts : []);
        }
      } catch (err) {
        console.error("Failed to load posts:", err);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  return posts;
}

