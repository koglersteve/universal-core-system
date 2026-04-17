// FRONTEND — SERVER-SIDE BACKEND URL HELPER
// This file is used ONLY by server components (like /os)

export function getBackendUrl() {
  const API = process.env.BACKEND_URL;

  if (!API) {
    console.error("Missing BACKEND_URL environment variable");
    return null;
  }

  return API;
}

export async function os(path = "") {
  const API = getBackendUrl();

  if (!API) {
    return {
      message: "OS offline (no API)",
      modules: [],
      _api: null
    };
  }

  const url = `${API}/os${path}`;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store"
    });

    if (!res.ok) {
      console.error("OS fetch failed:", res.status, res.statusText);
      return {
        message: `OS offline (HTTP ${res.status})`,
        modules: [],
        _api: API
      };
    }

    const body = await res.json();
    return { ...body, _api: API };
  } catch (err) {
    console.error("OS fetch error:", err);
    return {
      message: "OS offline (fetch error)",
      modules: [],
      _api: API
    };
  }
}
