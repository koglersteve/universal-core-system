import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { LaffLabApi } from "@/lib/LaffLabApi";
import type { Post } from "@/types/post";
import AppShell from "@/components/AppShell";
import PostDetail from "@/components/PostDetail";

export default function PostDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);

      // Prefer a direct API call if available
      const found =
        (await LaffLabApi.getPostById?.(id)) ??
        (await LaffLabApi.getPosts()).find((p) => p.id === id) ??
        null;

      setPost(found);
      setLoading(false);
    }

    load();
  }, [id]);

  return (
    <AppShell title="Post">
      {loading ? (
        <div className="text-white/60 text-[var(--text-sm)]">Loading…</div>
      ) : post ? (
        <PostDetail post={post} />
      ) : (
        <div className="text-white/60 text-[var(--text-sm)]">
          Post not found.
        </div>
      )}
    </AppShell>
  );
}
