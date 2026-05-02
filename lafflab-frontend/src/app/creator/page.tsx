"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export default function CreatorHome() {
  const { loading, isCreator } = useAuth();

  if (loading) {
    return (
      <div className="p-6 text-white/70">
        Loading creator tools…
      </div>
    );
  }

  if (!isCreator) {
    return (
      <div className="p-6 text-white/70">
        Creator Mode is locked. Redirecting…
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 text-white">
      <h1 className="text-2xl font-bold">Creator Tools</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link href="/creator/tools/drafts" className="tool-card">Draft Manager</Link>
        <Link href="/creator/tools/templates" className="tool-card">Clip Templates</Link>
        <Link href="/creator/tools/captions" className="tool-card">Caption Generator</Link>
        <Link href="/creator/tools/autocut" className="tool-card">AutoCut</Link>
        <Link href="/creator/tools/audio" className="tool-card">Audio Cleanup</Link>
        <Link href="/creator/tools/collab" className="tool-card">Collaboration</Link>
        <Link href="/creator/tools/status" className="tool-card">Processing Status</Link>
      </div>
    </div>
  );
}
