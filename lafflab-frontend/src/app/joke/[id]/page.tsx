"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { LaffLabApi } from "@/lib/api/LaffLabApi";
import JokeCard from "@/components/JokeCard";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ErrorView } from "@/components/ErrorView";
import { EmptyState } from "@/components/EmptyState";
import { useHistory } from "@/hooks/useHistory";

export default function JokePage() {
  const { id } = useParams();
  const { record } = useHistory();

  const [joke, setJoke] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const data = await LaffLabApi.getJokeById(id as string);
        if (!data) {
          setError(true);
        } else {
          setJoke(data);
          record(data.id);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id, record]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorView message="Failed to load joke." />;
  if (!joke) return <EmptyState message="Joke not found." />;

  return (
    <div className="p-6">
      <JokeCard joke={joke} viewed />
    </div>
  );
}
