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

  const handleReaction = (key: string) => {
    if (key === "laugh" || key === "mindblown") {
      toggleFavorite(post.id);
    }
    // TODO: send reaction to backend
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
        className="snap-center py-6 cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <div className="rounded-xl bg-white/5 border border-white/10 p-4 text-white space-y-3">

          {/* Creator */}
          <div className="text-sm opacity-70">
            @{post.creator.screenName}
          </div>

          {/* Media */}
          {post.type === "video" && (
            <video
              src={post.mediaUrl}
              controls
              className="w-full rounded-lg"
            />
          )}

          {post.type === "audio" && (
            <audio
              src={post.mediaUrl}
              controls
              className="w-full"
            />
          )}

          {(post.type === "image" || post.type === "meme") && (
            <img
              src={post.mediaUrl}
              alt="post media"
              className="w-full rounded-lg"
            />
          )}

          {post.type === "text" && (
            <p className="text-lg leading-snug">{post.text}</p>
          )}

          {/* Reaction Bar */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex gap-3">
              {reactions.map((r) => (
                <button
                  key={r.key}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleReaction(r.key);
                  }}
                  className="text-xl hover:scale-125 transition-transform"
                >
                  {r.emoji}
                </button>
              ))}
            </div>

            {/* Share */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleShare();
              }}
              className="text-xl opacity-80 hover:opacity-100"
            >
              ↗
            </button>
          </div>
        </div>
      </div>

      {/* Fullscreen Viewer */}
      {open && <PostViewer post={post} onClose={() => setOpen(false)} />}
    </>
  );
}
