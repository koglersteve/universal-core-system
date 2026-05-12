"use client";

import { useFeed } from "@/hooks/useFeed";
import TopBar from "@/components/TopBar";
import AdBanner from "@/components/AdBanner";
import FeedPost from "./components/FeedPost";

export default function Component() {
  const { items, loadMore, hasMore, loading } = useFeed("main");

  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col">

      {/* Top Header: Centered Banner + Right Hamburger */}
      <div className="w-full border-b border-white/10 bg-black/40 backdrop-blur-md">
        <div className="relative flex items-center justify-center px-4 py-3">

          {/* Center: Large Permanent Banner */}
          <div className="max-w-md w-full flex justify-center">
            <AdBanner type="permanent" />
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
