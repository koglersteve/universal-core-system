"use client";

export function ErrorView({ error }: { error: string }) {
  return (
    <div
      style={{
        background: "var(--error-bg)",
        padding: "12px",
        borderRadius: "8px",
        marginBottom: "16px",
        color: "var(--error-text)",
        animation: "fadeIn 0.25s ease-out",
      }}
    >
      <p style={{ margin: 0 }}>Error: {error}</p>
    </div>
  );
}
