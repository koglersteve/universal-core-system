"use client";

import Link from "next/link";

export default function CreatorHome() {
  return (
    <div className="p-6 space-y-6 text-white">
      <h1 className="text-2xl font-bold">Creator Tools</h1>

      <p className="text-white/70 text-sm">
        Welcome to Creator Mode. Access your production tools, workflows, and
        content pipeline from here.
      </p>

      <div className="grid grid-cols-1 gap-4">
        <Link href="/creator/tools/DraftManager" className="tool-card">
          Draft Manager
        </Link>

        <Link href="/creator/tools/ClipTemplates" className="tool-card">
          Clip Templates
        </Link>

        <Link href="/creator/tools/CaptionGenerator" className="tool-card">
          Caption Generator
        </Link>

        <Link href="/creator/tools/AutoCut" className="tool-card">
          AutoCut Editor
        </Link>

        <Link href="/creator/tools/AudioCleanup" className="tool-card">
          Audio Cleanup
        </Link>

        <Link href="/creator/tools/Collaboration" className="tool-card">
          Collaboration Tools
        </Link>

        <Link href="/creator/tools/ProcessingStatus" className="tool-card">
          Processing Status
        </Link>
      </div>
    </div>
  );
}
