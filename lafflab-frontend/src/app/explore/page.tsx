"use client";

import { useEffect, useState } from "react";
import { LaffLabApi } from "@/lib/api";
import type { Joke } from "@/types/jokes";
import JokeCard from "@/components/JokeCard";

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
      {loading && <p>Loading…</p>}
      {joke && <JokeCard joke={joke} />}

      <button
        onClick={loadRandom}
        className="px-4 py-2 rounded-full bg-brand-pink text-white font-semibold shadow-md
                   hover:bg-brand-purple hover:-translate-y-0.5 active:scale-95
                   transition-transform transition-colors"
      >
        Another One
      </button>
    </div>
  );
}
