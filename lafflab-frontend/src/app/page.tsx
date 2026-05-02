"use client";

import { useEffect, useState } from "react";
import { LaffLabApi } from "@/lib/api";
import type { Joke } from "@/types/jokes";
import Link from "next/link";

export default function HomePage() {
  const [joke, setJoke] = useState<Joke | null>(null);

  useEffect(() => {
    async function load() {
      const data = await LaffLabApi.getRandomJoke();
      setJoke(data);
    }
    load();
  }, []);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">LAFFLab</h1>

      {joke && (
        <div className="p-4 border rounded bg-white shadow-sm">
          <p className="text-lg">{joke.text}</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <Link href="/explore" className="p-4 bg-black text-white rounded text-center">
          Explore
        </Link>
        <Link href="/categories" className="p-4 bg-black text-white rounded text-center">
          Categories
        </Link>
        <Link href="/ritual" className="p-4 bg-black text-white rounded text-center">
          Ritual
        </Link>
        <Link href="/favorites" className="p-4 bg-black text-white rounded text-center">
          Favorites
        </Link>
      </div>
    </div>
  );
}
