"use client";

import { useFeed } from "@/hooks/useFeed";
import TopBar from "@/components/TopBar";
import AdBanner from "@/components/AdBanner";
import FeedPost from "./components/FeedPost";

export default function FeedPage() {
  const { items, loadMore, hasMore, loading } = useFeed("main");

  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col">
      {/* Top Bar with hamburger menu */}
      <TopBar
        title="Home"
        onMenuToggle={() => {
          // If your TopBar already handles menu internally, leave empty
        }}
      />

      {/* Permanent thin ad banner */}
      <div className="w-full border-b border-white/10">
        <AdBanner type="permanent" />
      </div>

      {/* Feed */}
      <div className="flex-1 overflow-y-auto">
        {items.map((post, index) => (
          <div key={post.id || index}>
            {/* Insert ad every 8 posts */}
            {index !== 0 && index % 8 === 0 && (
              <AdBanner type="inline" />
            )}

            <FeedPost post={post} />
          </div>
        ))}

        {/* Infinite scroll loader */}
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
