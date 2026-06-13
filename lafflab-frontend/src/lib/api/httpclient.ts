// src/lib/api/httpclient.ts

// -----------------------------
// BASE URL
// -----------------------------
const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL;

if (!API_BASE) {
  throw new Error("NEXT_PUBLIC_BACKEND_URL is not set");
}

// -----------------------------
// AUTH TOKEN MANAGEMENT
// -----------------------------
export function setAuthToken(token: string | null) {
  if (typeof window === "undefined") return;

  if (token) localStorage.setItem("authToken", token);
  else localStorage.removeItem("authToken");
}

export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("authToken");
}

// -----------------------------
// UNIVERSAL API WRAPPER (SAFE)
// -----------------------------
export async function http<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAuthToken();
  let res: Response;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000); // 10s timeout

    res = await fetch(`${API_BASE}${path}`, {
      ...options,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers || {}),
      },
    });

    clearTimeout(timeout);
  } catch (err) {
    console.error("Network error:", err, "URL:", `${API_BASE}${path}`);
    return Promise.reject(new Error("Network error"));
  }

  // Handle non‑OK responses safely
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error("API Error:", res.status, text);
    return Promise.reject(new Error(`API Error ${res.status}`));
  }

  // Handle empty body (204, 304, etc.)
  const raw = await res.text();
  if (!raw) {
    return {} as T;
  }

  // Safe JSON parse
  try {
    return JSON.parse(raw) as T;
  } catch (err) {
    console.error("JSON parse error:", err, "Body:", raw);
    return Promise.reject(new Error("Invalid JSON response"));
  }
}

// -----------------------------
// SHORTCUT HELPERS
// -----------------------------
export function get<T>(path: string) {
  return http<T>(path, { method: "GET" });
}

export function post<T>(path: string, body: any) {
  return http<T>(path, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function patch<T>(path: string, body: any) {
  return http<T>(path, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
}

export function del<T>(path: string) {
  return http<T>(path, { method: "DELETE" });
}
