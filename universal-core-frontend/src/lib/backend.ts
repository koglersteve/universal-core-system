const API = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function os(path = "") {
  if (!API) {
    console.error("Missing NEXT_PUBLIC_BACKEND_URL");
    return { message: "OS offline", modules: [] };
  }

  const url = `${API}/os${path}`;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("OS fetch failed:", res.status, res.statusText);
      return { message: "OS offline", modules: [] };
    }

    return res.json();
  } catch (err) {
    console.error("OS fetch error:", err);
    return { message: "OS offline", modules: [] };
  }
}
