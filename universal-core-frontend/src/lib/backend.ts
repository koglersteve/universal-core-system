const API = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function os(path = "") {
  if (!API) {
    console.error("Missing NEXT_PUBLIC_BACKEND_URL");
    return { message: "OS offline (no API)", modules: [], _api: API ?? null };
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
      return {
        message: `OS offline (HTTP ${res.status})`,
        modules: [],
        _api: API,
      };
    }

    const body = await res.json();
    return { ...body, _api: API };
  } catch (err) {
    console.error("OS fetch error:", err);
    return { message: "OS offline (fetch error)", modules: [], _api: API };
  }
}
