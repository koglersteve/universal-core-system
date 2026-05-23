import React, { useState } from "react";
import { CreatePost } from "./CreatePost";
import { FeedList } from "./FeedList";
import { FavoritesScreen } from "./FavoritesScreen";
import { HistoryScreen } from "./HistoryScreen";
import { DailyRitualScreen } from "./DailyRitualScreen";
import { ProfileScreen } from "./ProfileScreen";

export const LaffLabHome: React.FC = () => {
  const [screen, setScreen] = useState<
    "home" | "favorites" | "history" | "ritual" | "profile"
  >("home");

  const [profileUsername, setProfileUsername] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const openProfile = (username: string) => {
    setProfileUsername(username);
    setScreen("profile");
  };

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

  if (screen === "profile" && profileUsername) {
    return (
      <ProfileScreen
        username={profileUsername}
        onClose={() => setScreen("home")}
      />
    );
  }

  // MAIN HOME SCREEN
  return (
    <div style={{ padding: 16 }}>
      <h1 style={{ marginBottom: 12 }}>LAFFlab</h1>

      {/* CREATE POST */}
      <CreatePost onPostCreated={() => setRefreshKey(k => k + 1)} />

      {/* FEED */}
      <FeedList
        refreshKey={refreshKey}
        onOpenProfile={openProfile}
      />

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
