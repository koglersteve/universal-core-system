"use client";

export default function AutoCut() {
  return (
    <div className="p-6 text-white space-y-4">
      <h2 className="text-xl font-bold">AutoCut Editor</h2>
      <p className="text-sm text-white/70">
        Automatically cut long recordings into short, 15–30 second highlight clips.
      </p>

      <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-2">
        <p className="text-sm text-white/60">
          Upload a long‑form video from your creator workspace. AutoCut will detect beats, pauses,
          and punchlines to propose clip candidates.
        </p>
      </div>
    </div>
  );
}
