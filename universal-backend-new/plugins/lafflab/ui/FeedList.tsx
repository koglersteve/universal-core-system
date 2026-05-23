import React, { useEffect, useState } from "react";
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
};

export const FeedList: React.FC<Props> = ({ refreshKey }) => {
  const [feed, setFeed] = useState<FeedPost[]>([]);
  const [loading, setLoading] = useState(true);

  const loadFeed = () => {
    setLoading(true);
    fetch("/core/feed")
      .then(r => r.json())
      .then(res => {
        setFeed(res.posts || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load feed", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadFeed();
  }, [refreshKey]);

  if (loading) return <p>Loading feed…</p>;

  if (feed.length === 0) return <p>No posts yet. Be the first to post!</p>;

  return (
    <div>
      {feed.map(post => (
        <div
          key={post.id}
          style={{
            border: "1px solid #ddd",
            padding: 12,
            borderRadius: 8,
            marginBottom: 16,
          }}
        >
          <div style={{ fontWeight: "bold", marginBottom: 4 }}>
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
      ))}
    </div>
  );
};
