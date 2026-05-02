"use client";

import { useState } from "react";
import { LaffLabApi } from "@/lib/api";
import type { Joke } from "@/types/jokes";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Joke[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const data = await LaffLabApi.searchJokes(query);
      setResults(data);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Search</h1>

      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          placeholder="Search jokes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 border rounded px-3 py-2"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-black text-white rounded"
        >
          Go
        </button>
      </form>

      {loading && <p>Searching…</p>}

      <div className="space-y-4">
        {results.map((joke) => (
          <div
            key={joke.id}
            className="p-4 border rounded bg-white shadow-sm"
          >
            <p>{joke.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
