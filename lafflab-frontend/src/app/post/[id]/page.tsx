"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { LaffLabApi } from "@/lib/LaffLabApi";
import type { Post } from "@/types/post";
import AppShell from "@/components/AppShell";
import PostDetail from "@/components/PostDetail";

export default function PostDetailPage() {
  const { id } = useParams<{ id: string }>();

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);

      // Prefer direct endpoint if available
      const direct = LaffLabApi.getPostById
        ? await LaffLabApi.getPostById(id)
        : null;

      // Fallback to scanning all posts
      const fallback =
        direct ??
        (await LaffLabApi.getPosts()).find((p) => p.id === id) ??
        null;

      if (mounted) {
        setPost(fallback);
        setLoading(false);
      }
    }

    load();

    return () => {
      mounted = false;
    };
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
