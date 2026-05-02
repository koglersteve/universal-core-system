"use client";

import { useState } from "react";
import { LaffLabApi } from "@/lib/api";
import type { Post } from "@/types/jokes";
import JokeCard from "@/components/JokeCard";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  async function search() {
    if (!query.trim()) return;

    setLoading(true);
    const all = await LaffLabApi.getPosts();

    const filtered = all.filter((p) =>
      (p.text ?? "").toLowerCase().includes(query.toLowerCase())
    );

    setResults(filtered);
    setLoading(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 p-2 rounded bg-white/10 border border-white/20"
          placeholder="Search posts…"
        />
        <button
          onClick={search}
          className="px-4 py-2 bg-brand-yellow text-black rounded"
        >
          Search
        </button>
      </div>

      {loading && <p className="opacity-70">Searching…</p>}

      <div className="space-y-4">
        {results.map((post) => (
          <JokeCard key={post.id} post={post} active={false} />
        ))}
      </div>
    </div>
  );
}
