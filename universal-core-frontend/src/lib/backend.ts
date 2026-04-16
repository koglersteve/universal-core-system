const API = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function os(path: string = "") {
  const url = `${API}/os${path}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    return { message: "OS offline", modules: [] };
  }

  return res.json();
}
