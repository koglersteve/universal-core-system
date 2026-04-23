"use client";

import { useEffect, useState, useRef } from "react";
import FeedItem from "./FeedItem";
import AdBanner from "./AdBanner";

export default function Feed() {
  const [items, setItems] = useState<any[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const loaderRef = useRef<HTMLDivElement | null>(null);

  async function loadMore() {
    if (loading) return;
    setLoading(true);

    const res = await fetch(`/api/dramanextdoor/feed?cursor=${cursor || ""}`);
    const data = await res.json();

    setItems((prev) => [...prev, ...data.items]);
    setCursor(data.nextCursor);
    setLoading(false);
  }

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && cursor !== null) {
          loadMore();
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [cursor]);

  return (
    <div style={{ width: "100%", maxWidth: 600, margin: "0 auto" }}>
      {items.map((item, index) => (
        <div key={item.id}>
          {/* Insert ad every 8 posts */}
          {index !== 0 && index % 8 === 0 && <AdBanner />}

          <FeedItem item={item} />
        </div>
      ))}

      {/* Infinite scroll trigger */}
      <div ref={loaderRef} style={{ height: 40 }} />

      {loading && (
        <div style={{ color: "#aaa", padding: "1rem", textAlign: "center" }}>
          Loading chaos…
        </div>
      )}
    </div>
  );
}
import TopBanner from "./TopBanner";

export default function Feed() {
  return (
    <div style={{ width: "100%", maxWidth: 600, margin: "0 auto" }}>
      <TopBanner />

      {/* existing feed code */}
    </div>
  );
}
