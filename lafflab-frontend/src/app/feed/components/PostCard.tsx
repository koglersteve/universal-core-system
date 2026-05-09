"use client";

import { useState } from "react";
import { Post } from "@/types/post";
import { useFavoritesStore } from "@/store/useFavoritesStore";
import PostViewer from "./PostViewer";

const reactions = [
  { key: "laugh", emoji: "😂" },
  { key: "smile", emoji: "🙂" },
  { key: "expressionless", emoji: "😐" },
  { key: "shock", emoji: "😱" },
  { key: "mindblown", emoji: "🤯" },
  { key: "angry", emoji: "😡" },
  { key: "crickets", emoji: "🦗" }
];

export default function PostCard({ post }: { post: Post }) {
  const [open, setOpen] = useState(false);
  const { toggleFavorite } = useFavoritesStore();

  const [selectedReaction, setSelectedReaction] = useState<string | null>(null);
  const [animating, setAnimating] = useState<string | null>(null);

  const handleReaction = (key: string) => {
    setSelectedReaction(key);
    setAnimating(key);
    setTimeout(() => setAnimating(null), 300);

    if (key === "laugh" || key === "mindblown") {
      toggleFavorite(post.id);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: "LAFFlab Post",
        text: "Check out this post on LAFFlab!",
        url: window.location.href + "?post=" + post.id
      });
    } catch {
      navigator.clipboard.writeText(window.location.href + "?post=" + post.id);
    }
  };

  return (
    <>
      <div
        className="snap-center py-6 cursor-pointer transition-transform"
        onClick={() => setOpen(true)}
      >
        <div
          className="
            rounded-2xl bg-white/5 border border-white/10 p-5 text-white space-y-4
            shadow-[0_0_20px_rgba(0,0,0,0.3)]
            hover:shadow-[0_0_30px_rgba(0,0,0,0.45)]
            transition-all duration-300
          "
        >
          <div className="text-sm opacity-70 font-medium">
            @{post.creator.screenName}
          </div>

          {post.type === "video" && (
            <video
              src={post.mediaUrl}
              controls
              className="w-full rounded-xl border border-white/10"
            />
          )}

          {post.type === "audio" && (
            <audio
              src={post.mediaUrl}
              controls
              className="w-full rounded-lg border border-white/10"
            />
          )}

          {(post.type === "image" || post.type === "meme") && (
            <img
              src={post.mediaUrl}
              alt="post media"
              className="w-full rounded-xl border border-white/10"
            />
          )}

          {post.type === "text" && (
            <p className="text-lg leading-snug opacity-95">{post.text}</p>
          )}

          <div className="flex items-center justify-between pt-2">
            <div className="flex gap-4">
              {reactions.map((r) => {
                const isSelected = selectedReaction === r.key;
                const isAnimating = animating === r.key;

                return (
                  <button
                    key={r.key}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReaction(r.key);
                    }}
                    className={`
                      text-2xl transition-transform
                      ${isAnimating ? "scale-150" : "hover:scale-125"}
                      ${isSelected ? "opacity-100" : "opacity-60"}
                    `}
                  >
                    {r.emoji}
                  </button>
                );
              })}
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleShare();
              }}
              className="text-2xl opacity-70 hover:opacity-100 transition"
            >
              ↗
            </button>
          </div>
        </div>
      </div>

      {open && <PostViewer post={post} onClose={() => setOpen(false)} />}
    </>
  );
}
