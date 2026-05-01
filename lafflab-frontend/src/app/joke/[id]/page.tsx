"use client";

import { useParams } from "next/navigation";
import { LaffLabApi } from "@/lib/api/LaffLabApi";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ErrorView } from "@/components/ErrorView";
import { EmptyState } from "@/components/EmptyState";
import JokeCard from "@/components/JokeCard";
import { useHistory } from "@/hooks/useHistory";

export default function JokePage() {
  const { id } = useParams();
  const { joke, loading, error } = LaffLabApi.useJoke(id as string);
  const { record } = useHistory();

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorView message="Failed to load joke." />;
  if (!joke) return <EmptyState message="Joke not found." />;

  record(joke.id);

  return (
    <div className="p-6">
      <JokeCard joke={joke} viewed />
    </div>
  );
}
