"use client";

import { useState } from "react";
import { LaffLabApi } from "@/lib/LaffLabApi";
import type { Post } from "@/types/jokes";
import JokeCard from "@/components/JokeCard";
import { JokeCardSkeleton } from "@/components/JokeCardSkeleton";
import { EmptyState, EmptySearchIcon } from "@/components/ui/EmptyState";

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

        const filtered = all.filter((p) =>
          (p.text ?? "").toLowerCase().includes(query.toLowerCase())
        );

        setResults(filtered);
      }
    } catch (err) {
      console.error(err);
      setError("Search failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const showEmpty =
    !loading && results.length === 0 && query.trim() !== "" && !error;

  return (
    <div className="p-6 space-y-6 text-white page-shell">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Search</h1>

        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => setMode("keyword")}
            className={`px-2 py-1 rounded border text-xs transition-soft ${
              mode === "keyword"
                ? "bg-white text-black border-white"
                : "bg-transparent border-white/30 text-white/70"
            }`}
          >
            Keyword
          </button>

          <button
            onClick={() => setMode("semantic")}
            className={`px-2 py-1 rounded border text-xs transition-soft ${
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
          className="flex-1 px-3 py-2 rounded bg-white/10 border border-white/20 text-white placeholder-white/40 transition-soft focus:border-white/40 focus:bg-white/15"
        />

        <button
          onClick={search}
          className="px-4 py-2 rounded bg-white/10 border border-white/20 hover:bg-white/20 transition-soft"
        >
          Go
        </button>
      </div>

      {mode === "semantic" && (
        <p className="text-xs text-white/60">
          AI semantic search finds jokes by meaning, not just keywords.
        </p>
      )}

      {error && (
        <p className="text-center text-red-400 text-sm">{error}</p>
      )}

      {loading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <JokeCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="animate-fadeIn space-y-4">
          {results.length > 0 &&
            results.map((post) => (
              <JokeCard key={post.id} post={post} />
            ))}

          {showEmpty && (
            <EmptyState
              title="No results found"
              subtitle="Try different words or switch to AI semantic search."
              icon={EmptySearchIcon}
            />
          )}
        </div>
      )}
    </div>
  );
}

