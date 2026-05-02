"use client";

export default function DraftManager() {
  return (
    <div className="p-6 text-white space-y-4">
      <h2 className="text-xl font-bold">Draft Manager</h2>
      <p className="text-sm text-white/70">
        Manage your drafts, revisions, and unpublished posts across text, image, video, and audio.
      </p>

      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
        <p className="text-sm text-white/60">
          You don&apos;t have any drafts yet. Start creating from the main composer to see them here.
        </p>
      </div>
    </div>
  );
}
