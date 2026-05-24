import React from "react";

const AdBanner: React.FC = () => {
  return (
    <div
      style={{
        padding: "4px 10px",
        borderRadius: 999,
        background: "rgba(0,0,0,0.35)",
        border: "1px solid rgba(255,255,255,0.18)",
        color: "#FFFFFF",
        fontSize: 12,
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        maxWidth: 220,
        textAlign: "center",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
    >
      <span style={{ opacity: 0.8 }}>🔥 LAFFlab Premium</span>
      <span style={{ opacity: 0.6 }}>·</span>
      <span style={{ opacity: 0.8 }}>Unlock deeper laughs</span>
    </div>
  );
};

export default AdBanner;
