"use client";

import { createStabilityTracker } from "@/lib/analytics/stability";

export default function GlobalError({
  error,
  reset
}: {
  error: Error;
  reset: () => void;
}) {
  const stability = createStabilityTracker("dramanextdoor");

  // Log crash
  stability.crash("unhandled", error.message);

  return (
    <html>
      <body className="os-shell" style={{ padding: "40px" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <h1 style={{ fontSize: 28, marginBottom: 12 }}>Something went wrong</h1>

          <p style={{ opacity: 0.7, marginBottom: 24 }}>
            {error.message}
          </p>

          <button
            onClick={reset}
            style={{
              padding: "10px 16px",
              background: "#000",
              color: "#fff",
              borderRadius: "6px",
              border: "1px solid #333",
              cursor: "pointer"
            }}
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
