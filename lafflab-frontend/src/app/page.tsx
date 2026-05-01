"use client";

import Link from "next/link";
import { LaffLabApi } from "@/lib/api/LaffLabApi";
import JokeCard from "@/components/JokeCard";
import { ActionButton } from "@/components/ActionButton";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ErrorView } from "@/components/ErrorView";

export default function HomePage() {
  const { joke, loading, error, refresh } = LaffLabApi.useRandomJoke();

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorView message="Failed to load joke." />;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">LAFFlab</h1>

      {joke && <JokeCard joke={joke} />}

      <ActionButton label="New Joke" onClick={refresh} />

      <Link href="/categories" className="text-blue-500 underline">
        Browse Categories
      </Link>
    </div>
  );
}
