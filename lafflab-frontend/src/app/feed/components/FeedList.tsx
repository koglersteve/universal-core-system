"use client";

import { useEffect, useRef } from "react";
import FeedPost from "./FeedPost";
import AdBanner from "./AdBanner";

export default function Component({ posts }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const cards = container.querySelectorAll(".post-card");
      const center = window.innerHeight / 2;

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;

        const distance = Math.abs(center - cardCenter);
        const maxDistance = window.innerHeight * 0.6;

        const t = Math.min(distance / maxDistance, 1);

        const scale = 1 - t * 0.15;
        const opacity = 1 - t * 0.35;

        card.style.transform = `scale(${scale})`;
        card.style.opacity = `${opacity}`;
      });
    };

    handleScroll();
    container.addEventListener("scroll", handleScroll, { passive: true });

    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="
        flex-1 overflow-y-scroll
        snap-y snap-mandatory
        px-5 pt-4 pb-16
        space-y-10
      "
    >
      <AdBanner type="permanent" />

      {posts.map((post, index) => (
        <div key={post.id || index} className="post-card transition-all duration-300">
          <FeedPost post={post} />

          {index > 0 && index % 8 === 0 && (
            <AdBanner type="inline" />
          )}
        </div>
      ))}
    </div>
  );
}
