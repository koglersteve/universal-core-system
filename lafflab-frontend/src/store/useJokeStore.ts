"use client";

import type { Joke, Category } from "@/lib/api/types";

export async function fetchJokes(): Promise<Joke[]> {
  const res = await fetch("/api/jokes", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load jokes");
  return res.json();
}

export async function fetchJokeById(id: string): Promise<Joke> {
  const res = await fetch(`/api/jokes/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load joke");
  return res.json();
}

export async function fetchRandomJoke(): Promise<Joke> {
  const res = await fetch("/api/jokes/random", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load random joke");
  return res.json();
}

export async function fetchJokesByCategory(id: string): Promise<Joke[]> {
  const res = await fetch(`/api/jokes/by-category/${id}`, {
    cache: "no-store"
  });
  if (!res.ok) throw new Error("Failed to load jokes by category");
  return res.json();
}

export async function fetchCategories(): Promise<Category[]> {
  const res = await fetch("/api/categories", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load categories");
  return res.json();
}
