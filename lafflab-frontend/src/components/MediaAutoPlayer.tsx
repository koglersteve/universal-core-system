"use client";

import { useEffect, useRef, useState } from "react";
import type { Post } from "@/types/jokes";

interface MediaAutoPlayerProps {
  post: Post;
  active: boolean;
}

export function MediaAutoPlayer({ post, active }: MediaAutoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [visible, setVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setVisible(entry.intersectionRatio >= 0.6);
        });
      },
      { threshold: [0, 0.6, 1] }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const shouldPlay = active && visible;

    if (post.type === "video" && videoRef.current) {
      if (shouldPlay) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }

    if (post.type === "audio" && audioRef.current) {
      if (shouldPlay) {
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
    }
  }, [active, visible, post.type]);

  return (
    <div ref={containerRef} className="w-full">
      {post.type === "video" && post.videoUrl && (
        <video
          ref={videoRef}
          src={post.videoUrl}
          poster={post.thumbnailUrl}
          className="w-full rounded-2xl bg-black"
          muted
          playsInline
          controls={false}
        />
      )}

      {post.type === "audio" && (
        <div className="p-4 rounded-2xl bg-white/10 border border-white/20 text-white">
          {post.text && <p className="mb-2">{post.text}</p>}
          <audio ref={audioRef} src={post.audioUrl} controls className="w-full" />
        </div>
      )}

      {(post.type === "image" || post.type === "meme") && post.imageUrl && (
        <div className="overflow-hidden rounded-2xl bg-black">
          <img
            src={post.imageUrl}
            alt={post.text ?? "Post image"}
            className="w-full h-auto object-cover"
          />
        </div>
      )}

      {post.type === "text" && post.text && (
        <div className="p-4 rounded-2xl bg-white shadow-md border border-brand-yellow/40 text-black">
          {post.text}
        </div>
      )}
    </div>
  );
}
