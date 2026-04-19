import { getBackendUrl } from "@/lib/backend";

export async function getDramaScene(mood: string) {
  const backend = getBackendUrl();

  const res = await fetch(`${backend}/api/dramanextdoor/scene?mood=${mood}`, {
    cache: "no-store"
  });

  return res.json();
}
