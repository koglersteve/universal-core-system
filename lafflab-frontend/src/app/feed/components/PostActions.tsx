"use client";

export default function PostActions({ post }) {
  const reactions = [
    { key: "laugh", emoji: "😂" },
    { key: "smile", emoji: "🙂" },
    { key: "expressionless", emoji: "😐" },
    { key: "shock", emoji: "😱" },
    { key: "mindblown", emoji: "🤯" },
    { key: "angry", emoji: "😡" },
    { key: "crickets", emoji: "🦗" },
  ];

  return (
    <div className="flex items-center gap-3 pt-3 text-white/80">
      {reactions.map((r) => (
        <button
          key={r.key}
          className="text-xl hover:scale-110 transition-transform"
          onClick={() => console.log(`react:${r.key}`, post.id)}
        >
          {r.emoji}
        </button>
      ))}
    </div>
  );
}
