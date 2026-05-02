"use client";

import { useEffect, useRef, useState } from "react";
import type { Post } from "@/types/jokes";

interface Props {
  post: Post;
  active: boolean;
}

export default function PostMedia({ post, active }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  // --- TEXT LENGTH ENFORCEMENT (150 chars max) ---
  if (post.text && post.text.length > 150) {
    post.text = post.text.slice(0, 150);
  }

  // --- MEDIA TYPE DETECTION ---
  const isImage = post.type === "image" || post.type === "meme";
  const isVideo = post.type === "video";
  const isAudio = post.type === "audio";

  const mediaUrl =
    post.imageUrl ||
    post.videoUrl ||
    post.audioUrl ||
    null;

  if (!mediaUrl) return null;

  // --- MEDIA LENGTH ENFORCEMENT (30 sec max) ---
  const enforceDuration = (el: HTMLMediaElement | null) => {
    if (!el) return;
    if (el.duration > 30) {
      el.pause();
      el.src = "";
      setError(true);
    }
  };

  // --- Autoplay / pause based on active state ---
  useEffect(() => {
    const media = videoRef.current || audioRef.current;
    if (!media) return;

    if (active) {
      media.play().catch(() => {});
    } else {
      media.pause();
    }
  }, [active]);

  // --- Pause when off-screen ---
  useEffect(() => {
    const media = videoRef.current || audioRef.current;
    if (!media) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
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
      {/* Skeleton Loader */}
      {!loaded && !error && (
        <div className="absolute inset-0 animate-pulse bg-white/10 rounded-xl" />
      )}

      {/* Error Fallback */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center text-white/60 text-sm">
          Media unavailable
        </div>
      )}

      {/* IMAGE / MEME */}
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

      {/* VIDEO */}
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

      {/* AUDIO */}
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
