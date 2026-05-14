"use client";

import { X } from "lucide-react";

export default function PostFullscreenViewer({ post, open, onClose, reactions, onReact }) {
  if (!open || !post) return null;

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center p-4">
      
      {/* CLOSE BUTTON */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/80 hover:text-white"
      >
        <X size={32} />
      </button>

      {/* POST CONTENT */}
      <div className="max-w-full max-h-full flex items-center justify-center">
        {post.imageUrl ? (
          <img
            src={post.imageUrl}
            className="max-w-full max-h-full object-contain"
          />
        ) : (
          <div className="text-white text-lg text-center whitespace-pre-wrap px-4">
            {post.content}
          </div>
        )}
      </div>

      {/* REACTION BAR */}
      <div className="flex justify-center gap-6 text-3xl mt-6">
        {["😂", "🙂", "😐", "😱", "🤯", "😡", "🦗"].map((emoji) => {
          const active = reactions[post.id] === emoji;
          return (
            <button
              key={emoji}
              onClick={() => onReact(post.id, emoji)}
              className={active ? "scale-125" : "opacity-70"}
            >
              {emoji}
            </button>
          );
        })}
      </div>
    </div>
  );
}
