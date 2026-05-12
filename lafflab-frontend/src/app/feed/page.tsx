"use client";

import { useFeed } from "@/hooks/useFeed";
import TopBar from "@/components/TopBar";
import AdBanner from "@/components/AdBanner";
import FeedPost from "./components/FeedPost";

export default function Component() {
  const { items, loadMore, hasMore, loading } = useFeed("main");

  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col">

      {/* Top Bar with permanent ad on the same row */}
      <div className="w-full flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black/40 backdrop-blur-md">
        <TopBar
          title=""
          onMenuToggle={() => {}}
        />

        <div className="flex-shrink-0">
          <AdBanner type="permanent" />
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
