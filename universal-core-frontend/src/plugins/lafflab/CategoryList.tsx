"use client";

import React from "react";
import Link from "next/link";

export type LafflabCategory = {
  id: string;
  label: string;
  emoji?: string;
};

const DEFAULT_CATEGORIES: LafflabCategory[] = [
  { id: "dad-jokes", label: "Dad Jokes", emoji: "👨‍🦳" },
  { id: "dark-humor", label: "Dark Humor", emoji: "🌑" },
  { id: "pet-humor", label: "Pet Humor", emoji: "🐶" },
  { id: "relationship", label: "Relationship Humor", emoji: "💘" },
  { id: "chaos", label: "Chaotic Energy", emoji: "🌀" },
  { id: "wholesome", label: "Wholesome", emoji: "🌼" }
];

export function CategoryList({
  categories = DEFAULT_CATEGORIES
}: {
  categories?: LafflabCategory[];
}) {
  return (
    <div className="lafflab-category-list">
      <h2 className="lafflab-section-title">Pick a Humor Category</h2>

      <div className="lafflab-category-grid">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/lafflab/category/${cat.id}`}
            className="lafflab-category-card"
          >
            <span className="lafflab-category-emoji">{cat.emoji}</span>
            <span className="lafflab-category-label">{cat.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
