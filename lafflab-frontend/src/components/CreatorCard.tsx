"use client";

export default function CreatorCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="p-[var(--space-4)] rounded-[var(--radius-lg)] bg-white/5 border border-white/10 card-elevated space-y-[var(--space-3)]">
      <div>
        <h2 className="text-[var(--text-xl)] font-semibold">{title}</h2>

        {subtitle && (
          <p className="text-white/60 text-[var(--text-sm)] mt-[var(--space-1)]">
            {subtitle}
          </p>
        )}
      </div>

      {children}
    </div>
  );
}
