import React, { useEffect, useState } from "react";
import { JokeViewer } from "./JokeViewer";
import { FavoritesScreen } from "./FavoritesScreen";
import { HistoryScreen } from "./HistoryScreen";
import { DailyRitualScreen } from "./DailyRitualScreen";
import { ReactionBar } from "./ReactionBar";

export const LaffLabHome: React.FC = () => {
  const [screen, setScreen] = useState<
    "home" | "favorites" | "history" | "ritual"
  >("home");

  const [feed, setFeed] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Load social feed
  useEffect(() => {
    if (screen !== "home") return;

    setLoading(true);

    fetch("/core/feed")
      .then(r => r.json())
      .then(res => {
        setFeed(res.posts || []);
        setLoading(false);
      });
  }, [screen]);

  // Secondary screens
  if (screen === "favorites") {
    return <FavoritesScreen onClose={() => setScreen("home")} />;
  }

  if (screen === "history") {
    return <HistoryScreen onClose={() => setScreen("home")} />;
  }

  if (screen === "ritual") {
    return <DailyRitualScreen onClose={() => setScreen("home")} />;
  }

  // MAIN SOCIAL HOME SCREEN
  return (
    <div style={{ padding: 16 }}>
      <h1 style={{ marginBottom: 12 }}>LAFFlab</h1>

      {/* FEED */}
      {loading ? (
        <p>Loading feed…</p>
      ) : feed.length === 0 ? (
        <p>No posts yet. Be the first to post!</p>
      ) : (
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

              <ReactionBar post={post} />
            </div>
          ))}
        </div>
      )}

      {/* NAVIGATION */}
      <div style={{ marginTop: 24 }}>
        <button
          onClick={() => setScreen("favorites")}
          style={{ display: "block", marginBottom: 8 }}
        >
          ⭐ Favorites
        </button>

        <button
          onClick={() => setScreen("history")}
          style={{ display: "block", marginBottom: 8 }}
        >
          📜 History
        </button>

        <button
          onClick={() => setScreen("ritual")}
          style={{ display: "block", marginBottom: 8 }}
        >
          🔥 Daily Laugh Ritual
        </button>
      </div>
    </div>
  );
};
