"use client";

import Link from "next/link";

export default function CategoryCard({
  category,
}: {
  category: { id: string; name: string };
}) {
  return (
    <Link
      href={`/categories/${category.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div
        style={{
          background: "var(--bg-card)",
          padding: "16px",
          borderRadius: "12px",
          marginBottom: "12px",
          boxShadow: "var(--shadow-soft)",
          animation: "slideIn 0.3s ease-out",
          transition: "transform 0.15s ease, box-shadow 0.15s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.02)";
          e.currentTarget.style.boxShadow = "var(--shadow-soft-strong)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "var(--shadow-soft)";
        }}
      >
        <h3 style={{ margin: 0 }}>{category.name}</h3>
      </div>
    </Link>
  );
}
