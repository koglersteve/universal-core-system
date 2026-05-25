"use client";

import React, { useEffect, useRef, useState } from "react";
import ReactionBar, { ReactionEmojiKey } from "./ReactionBar";
import AdBanner from "./AdBanner";

type Post = {
  id: string;
  content: string;
  createdAt: string;
  author?: { username?: string };
  reactions?: Partial<Record<ReactionEmojiKey, number>>;
};

type FeedListProps = {
  initialPosts: Post[];
};

// Client-side loadMore using the API route
async function loadMoreClient(): Promise<Post[]> {
  const res = await fetch("/api/feed", { cache: "no-store" });

  if (!res.ok) {
    console.error("Failed to load more posts");
    return [];
  }

  const data = await res.json();
  return data.posts ?? [];
}

export default function FeedList({ initialPosts }: FeedListProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Prevent observer from firing during hydration
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  // Infinite scroll observer (hydration-safe)
  useEffect(() => {
    if (!hydrated) return;
    if (loading) return;

    const observer = new IntersectionObserver(
      entries => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          void fetchMore();
        }
      },
      { rootMargin: "200px" }
    );

    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [hydrated, loading]);

  const fetchMore = async () => {
    setLoading(true);
    setError(null);

    try {
      const newPosts = await loadMoreClient();

      const unique = newPosts.filter(
        p => !posts.some(existing => existing.id === p.id)
      );

      if (unique.length > 0) {
        setPosts(prev => [...prev, ...unique]);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load more posts.");
    } finally {
      setLoading(false);
    }
  };

  const handleReaction = (postId: string, key: ReactionEmojiKey) => {
    setPosts(prev =>
      prev.map(p =>
        p.id === postId
          ? {
              ...p,
              reactions: {
                ...p.reactions,
                [key]: (p.reactions?.[key] ?? 0) + 1,
              },
            }
          : p
      )
    );
  };

  return (
    <div style={{ marginTop: 16 }}>
      {posts.map((post, index) => (
        <React.Fragment key={post.id}>
          {index > 0 && index % 8 === 0 && (
            <div
              style={{
                margin: "12px 0",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <AdBanner />
            </div>
          )}

          <div
            style={{
              marginBottom: 12,
              padding: 12,
              borderRadius: 16,
              background: "rgba(0,0,0,0.35)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "#FFFFFF",
            }}
          >
            {post.author?.username && (
              <div
                style={{
                  fontSize: 12,
                  opacity: 0.8,
                  marginBottom: 4,
                }}
              >
                @{post.author.username}
              </div>
            )}

            <div style={{ fontSize: 14, lineHeight: 1.5 }}>{post.content}</div>

            <ReactionBar onReact={key => handleReaction(post.id, key)} />
          </div>
        </React.Fragment>
      ))}

      {error && (
        <div
          style={{
            color: "#ff9aa5",
            textAlign: "center",
            marginTop: 12,
            fontSize: 13,
          }}
        >
          {error}
        </div>
      )}

      {loading && (
        <div
          style={{
            color: "rgba(255,255,255,0.6)",
            textAlign: "center",
            marginTop: 12,
            fontSize: 13,
          }}
        >
          Loading…
        </div>
      )}

      <div
        ref={sentinelRef}
        style={{
          height: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      />
    </div>
  );
}

