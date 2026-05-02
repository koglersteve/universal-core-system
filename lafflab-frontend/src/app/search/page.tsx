"use client";

import { useState } from "react";
import { LaffLabApi } from "@/lib/LaffLabApi";
import type { Post } from "@/types/jokes";
import JokeCard from "@/components/JokeCard";

type Mode = "keyword" | "semantic";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<Mode>("semantic");
  const [error, setError] = useState<string | null>(null);

  async function search() {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      if (mode === "semantic") {
        const semanticResults = await LaffLabApi.searchSemantic(query);
        setResults(semanticResults);
      } else {
        const all = await LaffLabApi.getPosts();

        // SAFE keyword search — handles undefined text
        const filtered = all.filter((p) =>
          (p.text ?? "").toLowerCase().includes(query.toLowerCase())
        );

        setResults(filtered);
      }
    } catch (err: any) {
      console.error(err);
      setError("Search failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 space-y-6 text-white">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Search</h1>

        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => setMode("keyword")}
            className={`px-2 py-1 rounded border text-xs ${
              mode === "keyword"
                ? "bg-white text-black border-white"
                : "bg-transparent border-white/30 text-white/70"
            }`}
          >
            Keyword
          </button>

          <button
            onClick={() => setMode("semantic")}
            className={`px-2 py-1 rounded border text-xs ${
              mode === "semantic"
                ? "bg-white text-black border-white"
                : "bg-transparent border-white/30 text-white/70"
            }`}
          >
            AI Semantic
          </button>
        </div>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={
            mode === "semantic"
              ? "Search by idea, vibe, or meaning…"
              : "Search by exact words…"
          }
          className="flex-1 px-3 py-2 rounded bg-white/10 border border-white/20 text-white placeholder-white/40"
        />

        <button
          onClick={search}
          className="px-4 py-2 rounded bg-white/10 border border-white/20 hover:bg-white/20 transition"
        >
          Go
        </button>
      </div>

      {mode === "semantic" && (
        <p className="text-xs text-white/60">
          AI semantic search finds jokes by meaning, not just keywords.
        </p>
      )}

      {loading && (
        <p className="text-center opacity-70">Searching…</p>
      )}

      {error && (
        <p className="text-center text-red-400 text-sm">{error}</p>
      )}

      {!loading && results.length > 0 && (
        <div className="space-y-4">
          {results.map((post) => (
            <JokeCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {!loading && results.length === 0 && query.trim() !== "" && !error && (
        <p className="text-center opacity-60">No results found.</p>
      )}
    </div>
  );
}
