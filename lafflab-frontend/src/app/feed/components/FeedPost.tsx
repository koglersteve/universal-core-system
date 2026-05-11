"use client";

import Image from "next/image";
import { useState } from "react";

const reactions = [
  { key: "laugh", emoji: "😂" },
  { key: "smile", emoji: "🙂" },
  { key: "expressionless", emoji: "😐" },
  { key: "shock", emoji: "😱" },
  { key: "mindblown", emoji: "🤯" },
  { key: "angry", emoji: "😡" },
  { key: "crickets", emoji: "🦗" },
];

export default function FeedPost({ post }) {
  const [selectedReaction, setSelectedReaction] = useState(null);

  return (
    <div className="p-4 border-b border-white/10 space-y-4">
      {/* TEXT */}
      {post.text && (
        <p className="text-lg leading-snug">{post.text}</p>
      )}

      {/* VIDEO */}
      {post.videoUrl && (
        <video
          src={post.videoUrl}
          controls
          className="w-full rounded-lg max-h-[60vh] object-cover"
        />
      )}

      {/* AUDIO */}
      {post.audioUrl && (
        <audio controls className="w-full">
          <source src={post.audioUrl} />
        </audio>
      )}

      {/* SINGLE IMAGE */}
      {post.imageUrl && !post.images && (
        <Image
          src={post.imageUrl}
          alt="Post image"
          width={800}
          height={800}
          className="rounded-lg w-full object-cover"
        />
      )}

      {/* MULTI‑IMAGE STORY */}
      {post.images && post.images.length > 0 && (
        <div className="flex overflow-x-auto gap-4 snap-x snap-mandatory">
          {post.images.map((img, i) => (
            <div key={i} className="snap-center min-w-[80%] relative">
              <Image
                src={img.url}
                alt={`Story image ${i + 1}`}
                width={800}
                height={800}
                className="rounded-lg w-full object-cover"
              />
              {img.caption && (
                <p className="text-sm text-neutral-300 mt-2">{img.caption}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Reaction Bar */}
      <div className="flex justify-between pt-2 border-t border-white/10">
        {reactions.map((r) => (
          <button
            key={r.key}
            onClick={() => setSelectedReaction(r.key)}
            className={`text-2xl transition ${
              selectedReaction === r.key ? "opacity-100" : "opacity-50"
            }`}
          >
            {r.emoji}
          </button>
        ))}
      </div>
    </div>
  );
}
