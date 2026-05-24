"use client";

import React from "react";
import { FiRefreshCw, FiMenu } from "react-icons/fi";
import AdBanner from "./AdBanner";

type TopBarProps = {
  onRefresh: () => void;
  onOpenMenu: () => void;
};

const TopBar: React.FC<TopBarProps> = ({ onRefresh, onOpenMenu }) => {
  return (
    <div
      style={{
        position: "sticky",
        top: 12,
        zIndex: 40,
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 600,
          padding: "8px 12px",
          borderRadius: 16,
          background: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          pointerEvents: "auto",
        }}
      >
        <button
          onClick={onRefresh}
          style={{
            background: "transparent",
            border: "none",
            color: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 4,
            cursor: "pointer",
          }}
          aria-label="Refresh feed"
        >
          <FiRefreshCw size={22} />
        </button>

        <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <AdBanner />
        </div>

        <button
          onClick={onOpenMenu}
          style={{
            background: "transparent",
            border: "none",
            color: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 4,
            cursor: "pointer",
          }}
          aria-label="Open menu"
        >
          <FiMenu size={24} />
        </button>
      </div>
    </div>
  );
};

export default TopBar;
