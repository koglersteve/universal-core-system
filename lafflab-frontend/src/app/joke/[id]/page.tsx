"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { LaffLabApi } from "@/lib/api/LaffLabApi";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ErrorView } from "@/components/ErrorView";
import { EmptyState } from "@/components/EmptyState";
import { JokeCard } from "@/components/JokeCard";
import { useHistory } from "@/hooks/useHistory";

export default function JokePage() {
  const params = useParams();
  const jokeId = typeof params?.id === "string" ? params.id : null;

  const { addToHistory } = useHistory();

  const [joke, setJoke] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadJoke() {
    if (!jokeId) return;

    try {
      setLoading(true);
      const data = await LaffLabApi.getJokeById(jokeId);
      setJoke(data);
      addToHistory(jokeId);
    } catch (err: any) {
      setError(err.message || "Failed to load joke");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadJoke();
  }, [jokeId]);

  return (
    <div style={{ padding: 24 }}>
      <h1>Joke</h1>

      {loading && <LoadingSpinner />}

      {error && <ErrorView error={error} />}

      {!loading && !joke && !error && (
        <EmptyState message="Joke not found." />
      )}

      {joke && <JokeCard joke={joke} />}
    </div>
  );
}
