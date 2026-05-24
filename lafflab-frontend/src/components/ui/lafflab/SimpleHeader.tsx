"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";

type SimpleHeaderProps = {
  title: string;
};

const SimpleHeader: React.FC<SimpleHeaderProps> = ({ title }) => {
  const router = useRouter();

  return (
    <div
      style={{
        position: "sticky",
        top: 12,
        zIndex: 30,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 600,
          padding: "8px 12px",
          borderRadius: 16,
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          border: "1px solid rgba(255,255,255,0.08)",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <button
          onClick={() => router.back()}
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
          aria-label="Go back"
        >
          <FiArrowLeft size={20} />
        </button>
        <div
          style={{
            flex: 1,
            textAlign: "center",
            color: "#FFFFFF",
            fontWeight: 600,
            fontSize: 14,
            marginRight: 24,
          }}
        >
          {title}
        </div>
      </div>
    </div>
  );
};

export default SimpleHeader;
