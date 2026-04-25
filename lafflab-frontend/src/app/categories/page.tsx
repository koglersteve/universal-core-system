"use client";

import { useCategories } from "@/hooks/useCategories";
import { CategoryCard } from "@/components/CategoryCard";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { EmptyState } from "@/components/EmptyState";
import { ErrorView } from "@/components/ErrorView";

export default function CategoriesPage() {
  const { categories, loading, error } = useCategories();

  return (
    <div style={{ padding: 24 }}>
      <h1>Categories</h1>

      {loading && <LoadingSpinner />}

      {error && <ErrorView error={error} />}

      {!loading && categories.length === 0 && (
        <EmptyState message="No categories available." />
      )}

      {categories.map((cat) => (
        <CategoryCard key={cat.id} category={cat} />
      ))}
    </div>
  );
}
