"use client";

export async function fetchPosts() {
  const res = await fetch("/api/jokes");
  return res.json();
}

export async function fetchPost(id: string) {
  const res = await fetch(`/api/jokes/${id}`);
  return res.json();
}
