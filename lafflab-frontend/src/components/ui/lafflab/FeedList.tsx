"use client";

import React, { useEffect, useRef, useCallback } from "react";
import ReactionBar from "./ReactionBar";
import { useFeedStore } from "@/store/useFeedStore";

export default function FeedList() {
  const { posts, load, loading } = useFeedStore();
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && !loading) {
        load();
      }
    },
    [loading, load]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: "200px",
      threshold: 0.1,
    });

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [handleIntersect]);

  return (
    <div>
      {Array.isArray(posts) &&
        posts
          .filter((p) => p && p.id) // ensure valid posts
          .map((post) => (
            <div
              key={post.id}
              style={{
                padding: 16,
                marginBottom: 16,
                background: "#fff",
                borderRadius: 12,
              }}
            >
              <pre>{safeStringify(post)}</pre>
              <ReactionBar postId={post.id} />
            </div>
          ))}

      <div ref={loaderRef} style={{ height: 40 }} />
      {loading && <p style={{ opacity: 0.6 }}>Loading…</p>}
    </div>
  );
}

/* -------------------------------------------------------
   SAFE JSON STRINGIFY (prevents crashes)
-------------------------------------------------------- */
function safeStringify(obj: any) {
  try {
    return JSON.stringify(obj, null, 2);
  } catch {
    return "Unable to display post (non‑serializable data)";
  }
}
