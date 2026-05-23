import { env } from "@/config/env";

export async function api(path: string, options?: RequestInit) {
  const res = await fetch(`${env.apiUrl}${path}`, {
    ...options,
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`API request failed: ${res.status} ${res.statusText}`);
  }

  return res.json();
}
