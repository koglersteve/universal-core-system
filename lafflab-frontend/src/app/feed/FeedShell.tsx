"use client";

import React, { useState } from "react";
import TopBar from "@/components/ui/lafflab/TopBar";
import MenuDrawer from "@/components/ui/lafflab/MenuDrawer";
import FeedList from "@/components/ui/lafflab/FeedList";
import { LaffLabApi } from "@/lib/LaffLabApi";

type Post = {
  id: string;
  content: string;
  createdAt: string;
  author?: { username?: string };
};

export default function FeedShell({ initialFeed }: { initialFeed: Post[] }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => setRefreshKey(k => k + 1);

  /**
   * IMPORTANT:
   * Your backend fetchFeed() takes NO arguments.
   * So we call it exactly like this:
   *   LaffLabApi.fetchFeed()
   */
  const loadMore = async () => {
    return await LaffLabApi.fetchFeed();
  };

  return (
    <>
      <MenuDrawer isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <div style={{ width: "100%", maxWidth: 600 }}>
        <TopBar onRefresh={handleRefresh} onOpenMenu={() => setMenuOpen(true)} />

        <div style={{ marginTop: 16 }}>
          <FeedList
            key={refreshKey}
            initialPosts={initialFeed}
            loadMore={loadMore}
          />
        </div>
      </div>
    </>
  );
}
