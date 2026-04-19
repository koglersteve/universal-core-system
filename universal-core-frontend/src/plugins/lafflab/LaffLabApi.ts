import { getBackendUrl } from "@/lib/backend";

export async function getRandomJoke() {
  const backend = getBackendUrl();
  const res = await fetch(`${backend}/api/lafflab/random`, {
    cache: "no-store"
  });
  return res.json();
}
