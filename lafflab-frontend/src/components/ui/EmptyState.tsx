export default function EmptyState({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="p-6 text-white/70 space-y-2">
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      {description && <p className="text-white/60">{description}</p>}
    </div>
  );
}
