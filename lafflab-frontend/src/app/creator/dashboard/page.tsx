export default function CreatorDashboard() {
  return (
    <div className="p-[var(--space-6)] space-y-[var(--space-6)]">
      <h1 className="text-[var(--text-2xl)] font-semibold">Creator Dashboard</h1>

      <div className="grid grid-cols-2 gap-[var(--space-4)]">
        <div className="p-[var(--space-4)] bg-white/5 rounded-lg border border-white/10">
          <h2 className="text-[var(--text-lg)] font-semibold">Views</h2>
          <p className="text-white/60 text-[var(--text-sm)]">0 this week</p>
        </div>

        <div className="p-[var(--space-4)] bg-white/5 rounded-lg border border-white/10">
          <h2 className="text-[var(--text-lg)] font-semibold">Engagement</h2>
          <p className="text-white/60 text-[var(--text-sm)]">0 interactions</p>
        </div>
      </div>

      <p className="text-white/50 text-[var(--text-sm)]">
        More analytics coming soon.
      </p>
    </div>
  );
}
