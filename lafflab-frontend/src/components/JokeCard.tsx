"use client";

import Link from "next/link";
import { useHistoryStore } from "@/store/historyStore";

export function JokeCard({ joke }: { joke: { id: string; text: string } }) {
  const { history } = useHistoryStore();
  const viewed = history.includes(joke.id);

  return (
    <Link
      href={`/joke/${joke.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div
        style={{
          background: "var(--bg-card)",
          padding: "16px",
          borderRadius: "12px",
          marginBottom: "16px",
          boxShadow: "var(--shadow-soft)",
          opacity: viewed ? 0.7 : 1,
          transition: "transform 0.15s ease, box-shadow 0.15s ease",
          animation: "fadeIn 0.25s ease-out",
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
        <p style={{ margin: 0 }}>{joke.text}</p>

        {viewed && (
          <p
            style={{
              fontSize: "12px",
              opacity: 0.6,
              marginTop: "8px",
            }}
          >
            Viewed
          </p>
        )}
      </div>
    </Link>
  );
}
