"use client";

export default function ProcessingStatus() {
  return (
    <div className="p-6 text-white space-y-4">
      <h2 className="text-xl font-bold">Processing Status</h2>
      <p className="text-sm text-white/70">
        Track video rendering, audio cleanup, caption generation, and scheduled posts.
      </p>

      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
        <p className="text-sm text-white/60">
          No active processing jobs. New uploads and edits will appear here with real‑time status.
        </p>
      </div>
    </div>
  );
}
