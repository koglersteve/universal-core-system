"use client";

type Tone = "neutral" | "playful" | "urgent" | "celebratory";

export default function NotificationToast({
  title,
  body,
  tone = "neutral",
  onClick,
}: {
  title: string;
  body: string;
  tone?: Tone;
  onClick?: () => void;
}) {
  const toneClass =
    tone === "playful"
      ? "border-purple-300/60"
      : tone === "urgent"
      ? "border-red-400/70"
      : tone === "celebratory"
      ? "border-emerald-300/70"
      : "border-white/20";

  return (
    <div
      onClick={onClick}
      className={`fixed bottom-6 right-6 max-w-xs p-[var(--space-3)] rounded-[var(--radius-lg)] bg-white/10 ${toneClass} backdrop-blur card-elevated animate-slideDown cursor-pointer`}
    >
      <p className="text-[var(--text-sm)] font-semibold">{title}</p>
      <p className="text-[var(--text-xs)] text-white/70 mt-[var(--space-1)]">
        {body}
      </p>
    </div>
  );
}
