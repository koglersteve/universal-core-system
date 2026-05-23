"use client";

import { useEffect, useState } from "react";
import Feed from "@/components/feed/Feed";

export default function RootPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const base =
      process.env.NEXT_PUBLIC_BACKEND_URL ??
      process.env.NEXT_PUBLIC_API_URL ??
      "https://universal-core-backend-production.up.railway.app";

    fetch(`${base}/core/feed`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setItems(data.posts || []))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="text-center text-white/50 py-8">
        Loading feed...
      </div>
    );
  }

  return <Feed items={items} />;
}

