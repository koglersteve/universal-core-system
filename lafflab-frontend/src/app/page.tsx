"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LaffLabApi } from "@/lib/api/LaffLabApi";
import { JokeCard } from "@/components/JokeCard";
import { ActionButton } from "@/components/ActionButton";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ErrorView } from "@/components/ErrorView";
import { useHistory } from "@/hooks/useHistory";
import { useFavorites } from "@/hooks/useFavorites";

export default function HomePage() {
  const [joke, setJoke] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { history, streak } = useHistory();
  const { favorites } = useFavorites();

  async function loadRandomJoke() {
    try {
      setLoading(true);
      setError(null);
      const data = await LaffLabApi.getRandomJoke();
      setJoke(data);
    } catch (err: any) {
      setError(err.message || "Failed to load joke");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRandomJoke();
  }, []);

  const lastViewed = history[0];

  return (
    <div style={{ padding: 24 }}>
      <h1>LAFFLab</h1>

      {streak > 1 && (
        <p style={{ opacity: 0.7 }}>🔥 Streak: {streak} days</p>
      )}

      <p style={{ opacity: 0.7 }}>
        Viewed: {history.length} • Favorited: {favorites.length}
      </p>

      {lastViewed && (
        <div style={{ marginBottom: 24 }}>
          <p style={{ opacity: 0.7, marginBottom: 8 }}>Last viewed:</p>
          <JokeCard joke={{ id: lastViewed.id, text: "Loading…" }} />
        </div>
      )}

      <ActionButton label="Get Random Joke" onClick={loadRandomJoke} />

      {loading && <LoadingSpinner />}
      {error && <ErrorView error={error} />}
      {joke && <JokeCard joke={joke} />}

      <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 12 }}>
        <Link href="/categories">Browse Categories →</Link>
        <Link href="/favorites">Favorites →</Link>
        <Link href="/history">History →</Link>
        <Link href="/ritual">Daily Ritual →</Link>
      </div>
    </div>
  );
}
