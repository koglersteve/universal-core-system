"use client";

export function EmptyState({ message }: { message: string }) {
  return (
    <div
      style={{
        padding: "24px",
        textAlign: "center",
        opacity: 0.6,
        animation: "fadeIn 0.25s ease-out",
      }}
    >
      <p style={{ margin: 0 }}>{message}</p>
    </div>
  );
}
