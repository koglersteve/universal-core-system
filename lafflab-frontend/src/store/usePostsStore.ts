"use client";

export async function fetchPosts() {
  const res = await fetch("/api/posts");
  return res.json();
}

export async function fetchPost(id: string) {
  const res = await fetch(`/api/posts/${id}`);
  return res.json();
}
