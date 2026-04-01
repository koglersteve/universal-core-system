"use client";

import { useEffect, useState } from "react";
import { EmotionalLinkPanel } from "./EmotionalLinkPanel";
import { CrossAppLauncher } from "./CrossAppLauncher";

type JokeResponse = {
  id: string;
  text: string;
  category?: string;
  mood?: string;
};

type Props = {
  mood?: string;
  world?: string;
  trait?: string;
  agent?: string;
  token?: string; // emotional token
};

export function JokeViewer({ mood, world, trait, agent, token }: Props) {
  const [joke, setJoke] = useState<JokeResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchJoke() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `/api/lafflab/joke?mood=${mood || ""}&world=${world || ""}&trait=${trait || ""}&agent=${agent || ""}&et=${token || ""}`
        );

        if (!res.ok) throw new Error("Failed to fetch joke");

        const data = await res.json();
        setJoke(data.joke);
      } catch (e) {
        setError("Could not load a joke.");
      } finally {
        setLoading(false);
      }
    }

    fetchJoke();
  }, [mood, world, trait, agent, token]);

  if (loading) {
    return (
      <div className="joke-viewer">
        <p>Loading your laugh…</p>
      </div>
    );
  }

  if (error || !joke) {
    return (
      <div className="joke-viewer">
        <p className="joke-error">{error || "No joke available."}</p>
      </div>
    );
  }

  return (
    <div className="joke-viewer">
      <div className="joke-card">
        <p className="joke-text">{joke.text}</p>
      </div>

      <EmotionalLinkPanel />

      <CrossAppLauncher
        sourceApp="lafflab"
        payload={{
          jokeId: joke.id,
          text: joke.text,
          category: joke.category,
          mood,
          world,
          trait,
          agent,
          token
        }}
      />
    </div>
  );
}
