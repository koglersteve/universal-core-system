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
    <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3 text-white">
      <div>
        <h2 className="text-xl font-semibold">{title}</h2>

        {subtitle && (
          <p className="text-sm text-white/60 mt-1">{subtitle}</p>
        )}
      </div>

      {children}
    </div>
  );
}
