"use client";

import { useEffect, useState } from "react";

export default function FavoritesPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/favorites`)
      .then((res) => res.json())
      .then(setItems);
  }, []);

  return (
    <div className="p-4 space-y-4 text-white">
      <h1 className="text-2xl font-semibold">Favorites</h1>

      {items.map((f: any) => (
        <div
          key={f.id}
          className="p-4 rounded-lg bg-white/5 border border-white/10"
        >
          {f.post?.text}
        </div>
      ))}
    </div>
  );
}
