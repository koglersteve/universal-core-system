"use client";

import { useEffect, useRef } from "react";
import type { Post } from "@/types/jokes";

export default function MediaAutoPlayer({ post }: { post: Post }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!videoRef.current || post.type !== "video") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoRef.current?.play().catch(() => {});
          } else {
            videoRef.current?.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [post.type]);

  return (
    <div ref={containerRef} className="w-full">
      {post.type === "video" && post.mediaUrl && (
        <video
          ref={videoRef}
          src={post.mediaUrl}
          className="w-full rounded-lg"
          muted
          playsInline
        />
      )}
    </div>
  );
}
