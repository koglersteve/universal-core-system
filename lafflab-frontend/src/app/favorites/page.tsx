"use client";

import { useEffect, useState } from "react";

export default function FavoritesPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const base =
      process.env.NEXT_PUBLIC_BACKEND_URL ??
      process.env.NEXT_PUBLIC_API_URL ??
      "https://universal-core-backend-production.up.railway.app";

    fetch(`${base}/core/favorites`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setItems(data.favorites || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-4 space-y-4 text-white">
      <h1 className="text-2xl font-semibold">Favorites</h1>

      {loading && (
        <div className="text-white/50">Loading favorites...</div>
      )}

      {!loading && items.length === 0 && (
        <div className="text-white/50">No favorites yet.</div>
      )}

      {items.map((f: any) => (
        <div
          key={f.id}
          className="p-4 rounded-lg bg-white/5 border border-white/10"
        >
          {f.text}
        </div>
      ))}
    </div>
  );
}
