"use client";

import { useState } from "react";

export default function PostActions({ post }) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(post.likes || 0);

  const toggleLike = () => {
    setLiked((prev) => !prev);
    setCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/post/${post.id}`;

    try {
      await navigator.share({
        title: post.title || "LAFFlab Post",
        text: "Check out this post on LAFFlab!",
        url,
      });
    } catch {
      await navigator.clipboard.writeText(url);
    }
  };

  return (
    <div className="flex items-center justify-between pt-3 text-white/80">
      <button
        onClick={toggleLike}
        className={`text-lg transition-transform ${
          liked ? "scale-125 text-red-400" : "hover:scale-110"
        }`}
      >
        ❤️
      </button>

      <span className="text-sm opacity-70">{count} likes</span>

      <button
        onClick={handleShare}
        className="text-lg hover:opacity-100 opacity-70"
      >
        ↗
      </button>
    </div>
  );
}
