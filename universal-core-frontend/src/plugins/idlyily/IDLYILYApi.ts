import { getBackendUrl } from "@/lib/backend";

export async function generateIDLYILYMessage(payload: { prompt: string }) {
  const backend = getBackendUrl();

  const res = await fetch(`${backend}/api/idlyily/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    cache: "no-store"
  });

  return res.json();
}
