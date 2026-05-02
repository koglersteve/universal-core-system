"use client";

import { useEffect, useState } from "react";
import { LaffLabApi } from "@/lib/api";
import type { Joke } from "@/types/jokes";

export default function ExplorePage() {
  const [joke, setJoke] = useState<Joke | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadRandom() {
    setLoading(true);
    try {
      const data = await LaffLabApi.getRandomJoke();
      setJoke(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRandom();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Explore Jokes</h1>

      {loading && <p>Loading…</p>}

      {joke && (
        <div className="p-4 border rounded bg-white shadow-sm">
          <p className="text-lg">{joke.text}</p>
        </div>
      )}

      <button
        onClick={loadRandom}
        className="px-4 py-2 bg-black text-white rounded"
      >
        Another One
      </button>
    </div>
  );
}
