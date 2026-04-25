import { ENDPOINTS } from "@/lib/api/endpoints";

export async function getHistory() {
  const res = await fetch(ENDPOINTS.HISTORY_LIST, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch history from backend");
  }

  return res.json();
}
