"use client";

import React from "react";
import { plugins } from "@/lib/plugins";

export default function OSPage() {
  function launch(path: string) {
    // Universal navigation: works for App Router + Pages Router
    window.location.href = path;
  }

  return (
    <div
      style={{
        padding: "32px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
        gap: "24px",
        justifyItems: "center",
      }}
    >
      {plugins.map((plugin) => (
        <div
          key={plugin.id}
          onClick={() => launch(plugin.path)}
          style={{
            width: "120px",
            height: "120px",
            background: "#111",
            borderRadius: "24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            transition: "transform 0.15s ease, box-shadow 0.15s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "scale(1.05)";
            (e.currentTarget as HTMLElement).style.boxShadow =
              "0 6px 16px rgba(0,0,0,0.4)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "scale(1.0)";
            (e.currentTarget as HTMLElement).style.boxShadow =
              "0 4px 12px rgba(0,0,0,0.3)";
          }}
        >
          <div style={{ fontSize: "40px" }}>{plugin.icon}</div>
          <div
            style={{
              marginTop: "8px",
              fontSize: "14px",
              color: "#fff",
              textAlign: "center",
            }}
          >
            {plugin.name}
          </div>
        </div>
      ))}
    </div>
  );
}

