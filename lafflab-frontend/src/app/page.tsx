"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LaffLabApi } from "@/lib/api/LaffLabApi";
import JokeCard from "@/components/JokeCard";
import { ActionButton } from "@/components/ActionButton";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ErrorView } from "@/components/ErrorView";

export default function HomePage() {
  const [joke, setJoke] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  async function load() {
    try {
      const data = await LaffLabApi.getRandomJoke();
      if (!data) {
        setError(true);
      } else {
        setJoke(data);
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorView error="Failed to load joke." />;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">LAFFlab</h1>

      {joke && <JokeCard joke={joke} />}

      <ActionButton label="New Joke" onClick={load} />

      <Link href="/categories" className="text-blue-500 underline">
        Browse Categories
      </Link>
    </div>
  );
}
