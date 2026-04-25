import { HISTORY_LIST } from "@/lib/api/endpoints";

export async function getHistory() {
  const res = await fetch(HISTORY_LIST, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch history from backend");
  }

  return res.json();
}
