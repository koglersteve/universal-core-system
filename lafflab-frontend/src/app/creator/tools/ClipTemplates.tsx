"use client";

export default function ClipTemplates() {
  return (
    <div className="p-6 text-white space-y-4">
      <h2 className="text-xl font-bold">Clip Templates</h2>
      <p className="text-sm text-white/70">
        Use preset layouts and pacing patterns to generate short, punchy clips from your content.
      </p>

      <div className="grid grid-cols-1 gap-3">
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <p className="text-sm font-semibold">Punchline First</p>
          <p className="text-xs text-white/60">
            Start with the punchline, then reveal the setup for maximum hook.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <p className="text-sm font-semibold">Setup → Beat → Punch</p>
          <p className="text-xs text-white/60">
            Classic three‑beat structure optimized for 15–30 second clips.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <p className="text-sm font-semibold">Reaction Split</p>
          <p className="text-xs text-white/60">
            Side‑by‑side layout with reaction on one side and source on the other.
          </p>
        </div>
      </div>
    </div>
  );
}
