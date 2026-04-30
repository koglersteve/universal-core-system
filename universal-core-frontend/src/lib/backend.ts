"use client";

// Reads NEXT_PUBLIC_API_BASE_URL from the browser environment.
export function getBackendUrl() {
  return process.env.NEXT_PUBLIC_API_BASE_URL || "";
}

// --- OS API ---
export async function os() {
  const backend = getBackendUrl();
  const res = await fetch(`${backend}/os`, { cache: "no-store" });
  return res.json();
}

// --- MoodCheck API ---
export async function submitMood(mood: string) {
  const backend = getBackendUrl();
  const res = await fetch(`${backend}/plugins/moodcheck/api/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mood }),
  });
  return res.json();
}
