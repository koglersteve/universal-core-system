import { useEffect, useState } from "react";
import { getFeed } from "@/lib/api/feed";

export function usePosts() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const data = await getFeed(null);
        if (!cancelled) {
          setPosts(Array.isArray(data.items) ? data.items : []);
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

