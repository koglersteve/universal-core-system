"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { LaffLabApi } from "@/lib/LaffLabApi";
import type { Post } from "@/types/jokes";
import JokeCard from "@/components/JokeCard";
import LoadingState from "@/components/ui/LoadingState";
import ErrorState from "@/components/ui/ErrorState";

export default function PostPage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const data = await LaffLabApi.getPost(id);
        if (mounted) {
          setPost(data);
          setLoading(false);
        }
      } catch (err) {
        console.error("Failed to load post:", err);
        if (mounted) {
          setError("Failed to load this post.");
          setLoading(false);
        }
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading) return <LoadingState message="Loading post…" />;
  if (error) return <ErrorState message={error} />;
  if (!post) return <ErrorState message="Post not found." />;

  return (
    <div className="p-6 space-y-6">
      <JokeCard post={post} />
    </div>
  );
}
