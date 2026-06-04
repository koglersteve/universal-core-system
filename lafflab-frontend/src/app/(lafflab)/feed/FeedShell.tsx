"use client";

import React, { useState } from "react";
import FeedList from "@/components/ui/lafflab/FeedList"; // ← THIS is the correct one

export default function FeedShell({ initialFeed }: { initialFeed: any[] }) {
  const [refreshKey, setRefreshKey] = useState(0);

  const refresh = () => {
    setRefreshKey((k) => k + 1);
  };

  return (
    <>
      <div style={{ padding: 16 }}>
        <button
          onClick={refresh}
          style={{
            padding: "8px 12px",
            borderRadius: 8,
            background: "#eee",
            border: "1px solid #ccc",
            cursor: "pointer",
          }}
        >
          Refresh Feed
        </button>

        <div style={{ marginTop: 16 }}>
          <FeedList key={refreshKey} />
        </div>
      </div>
    </>
  );
}
