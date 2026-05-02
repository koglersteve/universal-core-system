"use client";

export default function CaptionGenerator() {
  return (
    <div className="p-6 text-white space-y-4">
      <h2 className="text-xl font-bold">Caption Generator</h2>
      <p className="text-sm text-white/70">
        Generate short, high‑impact captions and on‑screen text for your clips.
      </p>

      <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-2">
        <p className="text-sm text-white/60">
          Caption generation will plug into your draft or clip workflow. Select a draft or upload a
          clip to start generating captions.
        </p>
      </div>
    </div>
  );
}
