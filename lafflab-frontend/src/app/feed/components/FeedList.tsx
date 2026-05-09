"use client";

import { useRef, useEffect, useState } from "react";
import PostCard from "./PostCard";
import AdBanner from "./AdBanner";
import { useFeedStore } from "@/store/feed.store";
import { useSpotlight } from "../utils/spotlight";
import { getSpotlightStyles } from "../utils/spotlight";

export default function FeedList() {
  const { posts, loadInitial } = useFeedStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const [positions, setPositions] = useState<number[]>([]);
  const centerY = useSpotlight();

  useEffect(() => {
    loadInitial();
  }, [loadInitial]);

  useEffect(() => {
    if (!containerRef.current) return;

    const updatePositions = () => {
      const rects = Array.from(
        containerRef.current.querySelectorAll("[data-post]")
      ).map((el) => el.getBoundingClientRect().top + el.clientHeight / 2);

      setPositions(rects);
    };

    updatePositions();
    window.addEventListener("scroll", updatePositions);
    window.addEventListener("resize", updatePositions);

    return () => {
      window.removeEventListener("scroll", updatePositions);
      window.removeEventListener("resize", updatePositions);
    };
  }, [posts]);

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-scroll snap-y snap-mandatory"
    >
      {posts.map((post, index) => {
        const distance = positions[index]
          ? Math.abs(positions[index] - centerY)
          : 9999;

        const { scale, opacity } = getSpotlightStyles(distance);

        return (
          <div
            key={post.id}
            data-post
            style={{
              transform: `scale(${scale})`,
              opacity,
              transition: "transform 0.2s ease, opacity 0.2s ease"
            }}
          >
            <PostCard post={post} />

            {(index + 1) % 8 === 0 && <AdBanner position="inline" />}
          </div>
        );
      })}
    </div>
  );
}
