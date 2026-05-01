"use client";

export async function getFavorites() {
  const res = await fetch("/api/favorites", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load favorites");
  return res.json();
}

export async function addFavorite(id: string) {
  const res = await fetch("/api/favorites/add", {
    method: "POST",
    body: JSON.stringify({ id }),
    headers: { "Content-Type": "application/json" }
  });

  if (!res.ok) throw new Error("Failed to add favorite");
  return res.json();
}

export async function removeFavorite(id: string) {
  const res = await fetch("/api/favorites/remove", {
    method: "POST",
    body: JSON.stringify({ id }),
    headers: { "Content-Type": "application/json" }
  });

  if (!res.ok) throw new Error("Failed to remove favorite");
  return res.json();
}
