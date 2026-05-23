import React, { useEffect, useState, useRef, useCallback } from "react";
import { ReactionBar } from "./ReactionBar";

type FeedPost = {
  id: string;
  authorId: string;
  author: {
    id: string;
    username: string;
    displayName: string;
    avatarUrl?: string | null;
  };
  text: string;
  type: "text" | "image" | "video" | "audio";
  mediaUrl?: string | null;
  mediaDurationSeconds?: number | null;
  createdAt: string;
  reactions: {
    laugh: number;
    smile: number;
    expressionless: number;
    shock: number;
    mindblown: number;
    angry: number;
    crickets: number;
  };
  viewerReaction: any;
};

type Props = {
  refreshKey?: number;
  onOpenProfile?: (username: string) => void;
};

export const FeedList: React.FC<Props> = ({ refreshKey, onOpenProfile }) => {
  const [feed, setFeed] = useState<FeedPost[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);

  const loaderRef = useRef<HTMLDivElement | null>(null);

  const loadPage = useCallback(
    async (pageToLoad: number) => {
      try {
        setLoading(true);

        const res = await fetch(`/core/feed?page=${pageToLoad}`);
        const data = await res.json();

        const posts = data.posts || [];

        if (posts.length === 0) {
          setHasMore(false);
        } else {
          setFeed(prev => [...prev, ...posts]);
        }
      } catch (err) {
        console.error("Failed to load feed page", err);
      }

      setLoading(false);
    },
    []
  );

  // Reset feed when refreshKey changes
  useEffect(() => {
    setFeed([]);
    setPage(1);
    setHasMore(true);
    loadPage(1);
  }, [refreshKey, loadPage]);

  // Infinite scroll observer
  useEffect(() => {
    if (!loaderRef.current) return;

    const observer = new IntersectionObserver(
      entries => {
        const first = entries[0];
        if (first.isIntersecting && hasMore && !loading) {
          const nextPage = page + 1;
          setPage(nextPage);
          loadPage(nextPage);
        }
      },
      { threshold: 1 }
    );

    observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [page, hasMore, loading, loadPage]);

  if (feed.length === 0 && loading) return <p>Loading feed…</p>;
  if (feed.length === 0 && !loading) return <p>No posts yet. Be the first to post!</p>;

  return (
    <div>
      {feed.map((post, index) => (
        <React.Fragment key={post.id}>
          {/* AD PLACEMENT EVERY 8 POSTS */}
          {index > 0 && index % 8 === 0 && (
            <div
              style={{
                padding: 12,
                marginBottom: 16,
                border: "1px dashed #aaa",
                borderRadius: 8,
                textAlign: "center",
                color: "#666",
                fontSize: 14,
              }}
            >
              Sponsored · Inline Ad
            </div>
          )}

          {/* POST */}
          <div
            style={{
              border: "1px solid #ddd",
              padding: 12,
              borderRadius: 8,
              marginBottom: 16,
            }}
          >
            <div
              style={{
                fontWeight: "bold",
                marginBottom: 4,
                cursor: "pointer",
              }}
              onClick={() => onOpenProfile?.(post.author.username)}
            >
              {post.author.displayName} @{post.author.username}
            </div>

            <div style={{ marginBottom: 8 }}>{post.text}</div>

            {post.mediaUrl && (
              <div style={{ marginBottom: 8 }}>
                {post.type === "image" && (
                  <img
                    src={post.mediaUrl}
                    style={{ width: "100%", borderRadius: 8 }}
                  />
                )}

                {post.type === "video" && (
                  <video
                    src={post.mediaUrl}
                    controls
                    style={{ width: "100%", borderRadius: 8 }}
                  />
                )}

                {post.type === "audio" && (
                  <audio src={post.mediaUrl} controls />
                )}
              </div>
            )}

            <ReactionBar post={post as any} />
          </div>
        </React.Fragment>
      ))}

      {/* Infinite scroll trigger */}
      <div ref={loaderRef} style={{ height: 40 }} />

      {loading && <p>Loading more…</p>}
    </div>
  );
};
