// src/components/PostMedia.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import type { Post } from "@/types/jokes";

type PostMediaProps = {
  post: Post;
  active: boolean;
};

export default function PostMedia({ post, active }: PostMediaProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const safeText =
    post.text && post.text.length > 150
      ? post.text.slice(0, 150)
      : post.text;

  const isImage = post.type === "image" || post.type === "meme";
  const isVideo = post.type === "video";
  const isAudio = post.type === "audio";

  const mediaUrl = post.imageUrl || post.videoUrl || post.audioUrl || null;

  if (!mediaUrl) return safeText ? <p>{safeText}</p> : null;

  const enforceDuration = (el: HTMLMediaElement | null) => {
    if (!el) return;
    if (el.duration > 30) {
      el.pause();
      el.src = "";
      setError(true);
    }
  };

  useEffect(() => {
    const media = videoRef.current || audioRef.current;
    if (!media) return;

    if (active) {
      media.play().catch(() => {});
    } else {
      media.pause();
    }
  }, [active]);

  useEffect(() => {
    const media = videoRef.current || audioRef.current;
    if (!media) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries?.[0];
        if (!entry) return;

        if (!entry.isIntersecting) {
          media.pause();
        } else if (active) {
          media.play().catch(() => {});
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(media);

    return () => observer.disconnect();
  }, [active]);

  return (
    <div className="relative w-full overflow-hidden rounded-xl bg-black/20">
      {!loaded && !error && (
        <div className="absolute inset-0 animate-pulse bg-white/10 rounded-xl" />
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center text-white/60 text-sm">
          Media unavailable
        </div>
      )}

      {isImage && !error && (
        <img
          src={post.imageUrl!}
          alt=""
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`w-full h-auto object-cover transition-opacity duration-300 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      {isVideo && !error && (
        <video
          ref={videoRef}
          src={post.videoUrl!}
          poster={post.thumbnailUrl}
          playsInline
          muted
          loop
          onLoadedData={(e) => {
            enforceDuration(e.currentTarget);
            setLoaded(true);
          }}
          onError={() => setError(true)}
          className={`w-full h-auto object-cover transition-opacity duration-300 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      {isAudio && !error && (
        <audio
          ref={audioRef}
          src={post.audioUrl!}
          controls
          onLoadedData={(e) => {
            enforceDuration(e.currentTarget);
            setLoaded(true);
          }}
          onError={() => setError(true)}
          className="w-full mt-2"
        />
      )}
    </div>
  );
}
