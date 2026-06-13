"use client";

import React from "react";

export const dynamic = "force-dynamic";

export default function FeedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #0A0F1F 0%, #1A1440 35%, #4A1F6A 70%, #FF2F7A 100%)",
        padding: "12px 12px 32px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 600,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children}
      </div>
    </div>
  );
}
