"use client";

import { useState } from "react";
import { LaffLabApi } from "@/lib/api";
import type { Joke } from "@/types/jokes";
import JokeCard from "@/components/JokeCard";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Joke[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const all = await LaffLabApi.getJokes();
      const filtered = all.filter((j) =>
        j.text.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          placeholder="Search jokes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 border rounded px-3 py-2 text-black"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-full bg-brand-pink text-white font-semibold shadow-md
                     hover:bg-brand-purple hover:-translate-y-0.5 active:scale-95
                     transition-transform transition-colors"
        >
          Go
        </button>
      </form>

      {loading && <p>Searching…</p>}

      <div className="space-y-4">
        {results.map((joke) => (
          <JokeCard key={joke.id} joke={joke} />
        ))}
      </div>
    </div>
  );
}
