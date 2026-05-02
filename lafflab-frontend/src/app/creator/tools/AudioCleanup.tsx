"use client";

export default function AudioCleanup() {
  return (
    <div className="p-6 text-white space-y-4">
      <h2 className="text-xl font-bold">Audio Cleanup</h2>
      <p className="text-sm text-white/70">
        Remove background noise, normalize levels, and enhance clarity for your clips and audio
        posts.
      </p>

      <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-2">
        <p className="text-sm text-white/60">
          Audio cleanup jobs will appear here once you process audio from your drafts or uploads.
        </p>
      </div>
    </div>
  );
}
