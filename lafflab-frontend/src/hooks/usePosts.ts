import { useEffect, useState } from "react";
import { LaffLabApi } from "@/lib/LaffLabApi";

export function usePosts() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    LaffLabApi.getPosts()
      .then(setPosts)
      .finally(() => setLoading(false));
  }, []);

  return { posts, loading };
}

export function usePost(id: string) {
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    LaffLabApi.getPost(id)
      .then(setPost)
      .finally(() => setLoading(false));
  }, [id]);

  return { post, loading };
}

