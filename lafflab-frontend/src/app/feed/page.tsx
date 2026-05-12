"use client";

import { useFeed } from "@/hooks/useFeed";
import TopBar from "@/components/TopBar";
import AdBanner from "@/components/AdBanner";
import FeedPost from "./components/FeedPost";

export default function Component() {
  const { items, loadMore, hasMore, loading } = useFeed("main");

  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col">

      {/* 🔥 Upgraded Top Header */}
      <div className="
        w-full 
        border-b border-white/10 
        bg-gradient-to-b from-black/80 to-black/40 
        backdrop-blur-xl 
        shadow-[0_4px_20px_rgba(0,0,0,0.6)]
      ">
        <div className="relative flex items-center justify-center px-4 py-4">

          {/* Center: Premium Large Banner */}
          <div className="max-w-lg w-full flex justify-center">
            <div className="
              w-full 
              rounded-xl 
              overflow-hidden 
              shadow-[0_0_25px_rgba(255,255,255,0.08)]
              hover:shadow-[0_0_35px_rgba(255,255,255,0.12)]
              transition-shadow duration-300
            ">
              <AdBanner type="permanent" />
            </div>
          </div>

          {/* Right: Hamburger Menu */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <TopBar title="" onMenuToggle={() => {}} />
          </div>
        </div>
      </div>

      {/* Feed */}
      <div className="flex-1 overflow-y-auto">
        {items.map((post, index) => (
          <div key={post.id || index}>
            {index !== 0 && index % 8 === 0 && (
              <AdBanner type="inline" />
            )}

            <FeedPost post={post} />
          </div>
        ))}

        {hasMore && (
          <div className="py-6 flex justify-center">
            <button
              onClick={loadMore}
              disabled={loading}
              className="text-neutral-400"
            >
              {loading ? "Loading..." : "Load more"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
