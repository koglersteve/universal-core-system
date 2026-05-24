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
  loadMore: (cursor: number) => Promise<{ items: Post[]; nextCursor: string | null } | Post[]>;
};

export default function FeedList({ initialPosts, loadMore }: FeedListProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [cursor, setCursor] = useState<string | null>("2");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  // Skeleton loader for infinite scroll
  const Skeleton = () => (
    <div
      style={{
        marginBottom: 12,
        padding: 12,
        borderRadius: 16,
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.08)",
        height: 90,
        animation: "pulse 1.4s ease-in-out infinite",
      }}
    />
  );

  // Observe sentinel for infinite scroll
  useEffect(() => {
    if (!hasMore || loading) return;

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
  }, [hasMore, loading]);

  // Fetch next page using cursor
  const fetchMore = async () => {
    if (!cursor) {
      setHasMore(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await loadMore(Number(cursor));

      const newItems = Array.isArray(result) ? result : result.items;
      const nextCursor = Array.isArray(result) ? null : result.nextCursor;

      if (!newItems || newItems.length === 0) {
        setHasMore(false);
      } else {
        setPosts(prev => [...prev, ...newItems]);
        setCursor(nextCursor);
      }
    } catch (err) {
      setError("Failed to load more posts.");
    } finally {
      setLoading(false);
    }
  };

  // Optimistic reaction update (LAFFlab 7-emoji taxonomy)
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

  // Render posts with ads every 8 items
  const renderPosts = () => {
    const items: React.ReactNode[] = [];

    posts.forEach((post, index) => {
      if (index > 0 && index % 8 === 0) {
        items.push(
          <div
            key={`ad-${post.id}-${index}`}
            style={{
              margin: "12px 0",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <AdBanner />
          </div>
        );
      }

      items.push(
        <div
          key={post.id}
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

          <ReactionBar onReact={(key) => handleReaction(post.id, key)} />
        </div>
      );
    });

    return items;
  };

  return (
    <div style={{ marginTop: 16 }}>
      {renderPosts()}

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
        <>
          <Skeleton />
          <Skeleton />
        </>
      )}

      {hasMore && (
        <div
          ref={sentinelRef}
          style={{
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        />
      )}

      {!hasMore && posts.length > 0 && (
        <div
          style={{
            color: "rgba(255,255,255,0.6)",
            textAlign: "center",
            marginTop: 20,
            fontSize: 13,
          }}
        >
          You’ve reached the end.
        </div>
      )}

      {!hasMore && posts.length === 0 && (
        <div
          style={{
            color: "rgba(255,255,255,0.7)",
            fontSize: 14,
            textAlign: "center",
            marginTop: 24,
          }}
        >
          No posts yet. Be the first to laugh.
        </div>
      )}
    </div>
  );
}

