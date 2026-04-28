import React, { useEffect, useState } from "react";
import { JokeViewer } from "./JokeViewer";
import { FavoritesScreen } from "./FavoritesScreen";
import { HistoryScreen } from "./HistoryScreen";
import { DailyRitualScreen } from "./DailyRitualScreen";
import { CoupleModeScreen } from "./CoupleModeScreen";
import { PremiumUpsell } from "./PremiumUpsell";

export const LaffLabHome: React.FC = () => {
  const [screen, setScreen] = useState<
    "home" | "favorites" | "history" | "ritual" | "couples" | "premium"
  >("home");

  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    fetch("/lafflab/premium")
      .then(r => r.json())
      .then(res => setIsPremium(res.premium));
  }, []);

  if (screen === "favorites") {
    return <FavoritesScreen onClose={() => setScreen("home")} />;
  }

  if (screen === "history") {
    return <HistoryScreen onClose={() => setScreen("home")} />;
  }

  if (screen === "ritual") {
    return <DailyRitualScreen onClose={() => setScreen("home")} />;
  }

  if (screen === "couples") {
    if (!isPremium) return <PremiumUpsell onClose={() => setScreen("home")} />;
    return <CoupleModeScreen onClose={() => setScreen("home")} />;
  }

  if (screen === "premium") {
    return <PremiumUpsell onClose={() => setScreen("home")} />;
  }

  // HOME SCREEN
  return (
    <div style={{ padding: 16 }}>
      <h1 style={{ marginBottom: 12 }}>LAFFlab</h1>

      <JokeViewer />

      <div style={{ marginTop: 24 }}>
        <button onClick={() => setScreen("favorites")} style={{ display: "block", marginBottom: 8 }}>
          ⭐ Favorites
        </button>

        <button onClick={() => setScreen("history")} style={{ display: "block", marginBottom: 8 }}>
          📜 History
        </button>

        <button onClick={() => setScreen("ritual")} style={{ display: "block", marginBottom: 8 }}>
          🔥 Daily Laugh Ritual
        </button>

        <button onClick={() => setScreen("couples")} style={{ display: "block", marginBottom: 8 }}>
          ❤️ Couples Mode
        </button>

        {!isPremium && (
          <button onClick={() => setScreen("premium")} style={{ display: "block", marginTop: 12 }}>
            💎 Go Premium
          </button>
        )}
      </div>
    </div>
  );
};
