export const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function os(path: string) {
  const res = await fetch(`${API_BASE}/os/${path}`, {
    cache: "no-store",
  });
  return res.json();
}
