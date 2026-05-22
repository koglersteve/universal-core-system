"use client";

import { useEffect, useState } from "react";

export default function ExplorePage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/explore`)
      .then((res) => res.json())
      .then(setItems);
  }, []);

  return (
    <div className="p-4 space-y-4 text-white">
      <h1 className="text-2xl font-semibold">Explore</h1>

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
