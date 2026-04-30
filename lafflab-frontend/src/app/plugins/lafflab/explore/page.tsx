"use client";

import { useCategories } from "@/src/hooks/useCategories";
import CategoryCard from "@/src/components/CategoryCard";

export default function ExploreHumor() {
  const { categories, loading } = useCategories();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Explore Humor</h1>

      {loading && <p>Loading categories…</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <CategoryCard key={cat.id} category={cat} />
        ))}
      </div>
    </div>
  );
}
