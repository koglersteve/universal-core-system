"use client";

export default function EmptyState({
  title,
  message,
  icon,
}: {
  title: string;
  message?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center text-white/60">
      {icon && <div className="mb-4 opacity-70">{icon}</div>}

      <h2 className="text-xl font-semibold text-white">{title}</h2>

      {message && <p className="mt-2 text-sm">{message}</p>}
    </div>
  );
}
