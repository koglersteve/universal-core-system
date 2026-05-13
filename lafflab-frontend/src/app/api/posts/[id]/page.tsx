"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PostDetail from "@/components/PostDetail";
import AppShell from "@/components/AppShell";

export default function PostDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);

      const res = await fetch(`/api/posts/${id}`, { cache: "no-store" });
      const data = await res.json();

      setPost(data?.error ? null : data);
      setLoading(false);
    }

    load();
  }, [id]);

  return (
    <AppShell title="Post">
      {loading ? (
        <div className="text-white/60 text-sm">Loading…</div>
      ) : post ? (
        <PostDetail post={post} />
      ) : (
        <div className="text-white/60 text-sm">Post not found.</div>
      )}
    </AppShell>
  );
}
