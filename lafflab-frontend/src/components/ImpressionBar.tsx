"use client";

export type ReactionEmojiKey =
  | "laugh"
  | "smile"
  | "expressionless"
  | "shock"
  | "mindblown"
  | "angry"
  | "crickets";

const EMOJIS: { key: ReactionEmojiKey; icon: string }[] = [
  { key: "laugh", icon: "😂" },
  { key: "smile", icon: "🙂" },
  { key: "expressionless", icon: "😐" },
  { key: "shock", icon: "😱" },
  { key: "mindblown", icon: "🤯" },
  { key: "angry", icon: "😡" },
  { key: "crickets", icon: "🦗" },
];

export default function ImpressionBar({
  onSelect,
}: {
  onSelect: (key: ReactionEmojiKey) => void;
}) {
  return (
    <div className="flex gap-2">
      {EMOJIS.map((e) => (
        <button
          key={e.key}
          onClick={() => onSelect(e.key)}
          className="text-2xl hover:scale-110 transition-transform"
        >
          {e.icon}
        </button>
      ))}
    </div>
  );
}
