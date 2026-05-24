"use client";

import React, { useEffect, useRef, useState } from "react";
import ReactionBar from "./ReactionBar";
import AdBanner from "./AdBanner";

type Post = {
  id: string;
  content: string;
  createdAt: string;
  author?: { username?: string };
};

type FeedListProps = {
  initialPosts: Post[];
  loadMore: (page: number) => Promise<Post[]>;
};

const FeedList: React.FC<FeedListProps> = ({ initialPosts, loadMore }) => {
  const [posts, setPosts] = useState<Post[]>(() =>
    [...initialPosts].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  );
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasMore || loadingMore) return;

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
  }, [hasMore, loadingMore]);

  const fetchMore = async () => {
    setLoadingMore(true);
    try {
      const next = await loadMore(page);
      if (!next || next.length === 0) {
        setHasMore(false);
      } else {
        setPosts(prev => [
          ...prev,
          ...next.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          ),
        ]);
        setPage(p => p + 1);
      }
    } finally {
      setLoadingMore(false);
    }
  };

  const renderWithAds = () => {
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
          <ReactionBar />
        </div>
      );
    });
    return items;
  };

  return (
    <div style={{ marginTop: 16 }}>
      {renderWithAds()}
      {hasMore && (
        <div
          ref={sentinelRef}
          style={{ height: 40, display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          {loadingMore && (
            <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 12 }}>
              Loading more…
            </span>
          )}
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
};

export default FeedList;
