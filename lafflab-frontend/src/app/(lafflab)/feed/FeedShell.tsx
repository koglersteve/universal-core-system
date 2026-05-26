"use client";

import React, { useState } from "react";
import TopBar from "@/components/ui/lafflab/TopBar";
import MenuDrawer from "@/components/ui/lafflab/MenuDrawer";
import FeedList from "@/components/ui/lafflab/FeedList";

type FeedShellProps = {
  initialFeed: any[];
};

export default function FeedShell({ initialFeed }: FeedShellProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <>
      <MenuDrawer isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <div style={{ width: "100%", maxWidth: 600 }}>
        <TopBar
          onRefresh={() => setRefreshKey(k => k + 1)}
          onOpenMenu={() => setMenuOpen(true)}
        />

        <div style={{ marginTop: 16 }}>
          <FeedList key={refreshKey} initialPosts={initialFeed} />
        </div>
      </div>
    </>
  );
}
