"use client";

import { useEffect, useState } from "react";
import Feed from "@/components/feed/Feed";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    const q = query.trim();
    if (!q) {
      setItems([]);
      return;
    }

    setLoading(true);

    const base =
      process.env.NEXT_PUBLIC_BACKEND_URL ??
      process.env.NEXT_PUBLIC_API_URL ??
      "https://universal-core-backend-production.up.railway.app";

    const params = new URLSearchParams();
    params.set("q", q);

    fetch(`${base}/core/search?${params.toString()}`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setItems(data.results || []))
      .finally(() => setLoading(false));
  };

  return (
    <div className="p-4 space-y-4 text-white">
      <h1 className="text-2xl font-semibold">Search</h1>

      <div className="flex gap-2">
        <input
          className="flex-1 px-3 py-2 rounded-md bg-white/5 border border-white/10 text-white outline-none"
          placeholder="Search jokes or tags..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />
        <button
          className="px-4 py-2 rounded-md bg-white/10 border border-white/20 hover:bg-white/20"
          onClick={handleSearch}
        >
          Go
        </button>
      </div>

      {loading && (
        <div className="text-white/50">Searching...</div>
      )}

      {!loading && items.length === 0 && query && (
        <div className="text-white/50">No results.</div>
      )}

      <Feed items={items} />
    </div>
  );
}


