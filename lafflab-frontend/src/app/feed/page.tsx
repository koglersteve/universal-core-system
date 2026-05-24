import TopBar from "@/components/ui/lafflab/TopBar";
import MenuDrawer from "@/components/ui/lafflab/MenuDrawer";
import FeedList from "@/components/ui/lafflab/FeedList";
import { LaffLabApi } from "@/lib/LaffLabApi";

export const dynamic = "force-dynamic";

export default async function FeedPage() {
  const initialFeed = await LaffLabApi.fetchFeed(1);

  async function loadMore(page: number) {
    "use server";
    return LaffLabApi.fetchFeed(page);
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "12px 12px 32px",
        background:
          "linear-gradient(135deg, #0A0F1F 0%, #1A1440 35%, #4A1F6A 70%, #FF2F7A 100%)",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <FeedShell initialFeed={initialFeed} loadMore={loadMore} />
    </div>
  );
}

"use client";

import React, { useState } from "react";

type Post = {
  id: string;
  content: string;
  createdAt: string;
  author?: { username?: string };
};

type FeedShellProps = {
  initialFeed: Post[];
  loadMore: (page: number) => Promise<Post[]>;
};

const FeedShell: React.FC<FeedShellProps> = ({ initialFeed, loadMore }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey(k => k + 1);
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
};
