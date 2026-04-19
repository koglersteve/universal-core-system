import { getBackendUrl } from "@/lib/backend";

export async function generateHoaMeme(payload: {
  template: string;
  text: string;
}) {
  const backend = getBackendUrl();

  const res = await fetch(`${backend}/api/hoameme/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    cache: "no-store"
  });

  return res.json();
}
