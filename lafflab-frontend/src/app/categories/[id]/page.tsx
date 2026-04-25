"use client";

import { useParams } from "next/navigation";
import { useCategoryDetails } from "@/hooks/useCategoryDetails";
import { JokeCard } from "@/components/JokeCard";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { EmptyState } from "@/components/EmptyState";
import { ErrorView } from "@/components/ErrorView";

export default function CategoryDetailPage() {
  const params = useParams();
  const categoryId = typeof params?.id === "string" ? params.id : null;

  const { category, jokes, loading, error } = useCategoryDetails(categoryId);

  return (
    <div style={{ padding: 24 }}>
      <h1>{category ? category.name : "Category"}</h1>

      {loading && <LoadingSpinner />}

      {error && <ErrorView error={error} />}

      {!loading && jokes.length === 0 && (
        <EmptyState message="No jokes found in this category." />
      )}

      {jokes.map((j) => (
        <JokeCard key={j.id} joke={j} />
      ))}
    </div>
  );
}
