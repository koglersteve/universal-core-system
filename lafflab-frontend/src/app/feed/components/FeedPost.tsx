"use client";

const REACTIONS = [
  { key: "laugh", emoji: "😂" },
  { key: "smile", emoji: "🙂" },
  { key: "expressionless", emoji: "😐" },
  { key: "shock", emoji: "😱" },
  { key: "mindblown", emoji: "🤯" },
  { key: "angry", emoji: "😡" },
  { key: "crickets", emoji: "🦗" }
];

export default function Component({ post }) {
  return (
    <div className="w-full px-4 py-6 border-b border-white/10">
      {post.title && (
        <div className="text-lg font-semibold mb-2">
          {post.title}
        </div>
      )}

      {post.content && (
        <div className="text-neutral-300 mb-3 whitespace-pre-line">
          {post.content}
        </div>
      )}

      {post.image && (
        <div className="w-full mb-3">
          <img
            src={post.image}
            alt=""
            className="w-full rounded-lg object-cover"
          />
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-3">
        {REACTIONS.map((r) => (
          <button
            key={r.key}
            type="button"
            className="flex items-center gap-1 px-3 py-1 rounded-full border border-white/10 text-neutral-300 hover:bg-white/5 transition"
          >
            <span>{r.emoji}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
