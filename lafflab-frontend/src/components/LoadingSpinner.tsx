"use client";

export function LoadingSpinner() {
  return (
    <div
      style={{
        padding: "12px",
        opacity: 0.8,
        animation: "pulse 1s infinite",
        textAlign: "center",
      }}
    >
      <p style={{ margin: 0 }}>Loading…</p>
    </div>
  );
}
