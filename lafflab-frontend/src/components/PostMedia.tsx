"use client";

import React, { useState } from "react";
import type { Post } from "@/types/jokes";

export default function PostMedia({ post, active }: { post: Post; active: boolean }) {
  const [error, setError] = useState(false);

  const isImage = post.type === "image";
  const isVideo = post.type === "video";
  const isAudio = post.type === "audio";

  const mediaUrl = post.mediaUrl || null;

  if (!mediaUrl) {
    return post.text ? <p className="text-white">{post.text}</p> : null;
  }

  if (isImage) {
    return (
      <img
        src={mediaUrl}
        alt="Post media"
        className="w-full rounded-lg"
        onError={() => setError(true)}
      />
    );
  }

  if (isVideo) {
    return (
      <video
        src={mediaUrl}
        controls={active}
        className="w-full rounded-lg"
        onError={() => setError(true)}
      />
    );
  }

  if (isAudio) {
    return (
      <audio
        src={mediaUrl}
        controls={active}
        className="w-full"
        onError={() => setError(true)}
      />
    );
  }

  return null;
}
