"use client";

import { useEffect, useState } from "react";

export default function ExplorePage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const base =
      process.env.NEXT_PUBLIC_BACKEND_URL ??
      process.env.NEXT_PUBLIC_API_URL ??
      "https://universal-core-backend-production.up.railway.app";

    fetch(`${base}/core/explore`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setItems(data.posts || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-4 space-y-4 text-white">
      <h1 className="text-2xl font-semibold">Explore</h1>

      {loading && (
        <div className="text-white/50">Loading explore...</div>
      )}

      {!loading && items.length === 0 && (
        <div className="text-white/50">No explore posts yet.</div>
      )}

      {items.map((p: any) => (
        <div
          key={p.id}
          className="p-4 rounded-lg bg-white/5 border border-white/10"
        >
          {p.text}
        </div>
      ))}
    </div>
  );
}
