"use client";

export function ActionButton({
  label,
  onClick,
}: {
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        background: "var(--accent)",
        color: "#fff",
        padding: "12px 16px",
        borderRadius: "8px",
        border: "none",
        fontSize: "16px",
        marginBottom: "16px",
        transition: "transform 0.1s ease, box-shadow 0.1s ease",
        boxShadow: "var(--shadow-soft)",
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = "scale(0.96)";
        e.currentTarget.style.boxShadow = "none";
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "var(--shadow-soft)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "var(--shadow-soft)";
      }}
    >
      {label}
    </button>
  );
}
