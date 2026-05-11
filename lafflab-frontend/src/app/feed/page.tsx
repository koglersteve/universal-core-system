"use client";

import TopBar from "@/components/TopBar";
import Feed from "@/components/feed/Feed";

export default function FeedPage() {
  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col">
      <TopBar title="Feed" onMenuToggle={() => {}} />

      <div className="relative overflow-hidden flex-1">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none" />
        <Feed />
      </div>
    </div>
  );
}
