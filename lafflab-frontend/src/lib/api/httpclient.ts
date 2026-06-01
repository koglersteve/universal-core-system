// src/lib/api/httpclient.ts

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://universal-core-backend-production.up.railway.app";

// -----------------------------
// AUTH TOKEN MANAGEMENT
// -----------------------------
export function setAuthToken(token: string | null) {
  if (token) localStorage.setItem("authToken", token);
  else localStorage.removeItem("authToken");
}

export function getAuthToken(): string | null {
  return localStorage.getItem("authToken");
}

// -----------------------------
// UNIVERSAL API WRAPPER
// -----------------------------
export async function http<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAuthToken();

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`API Error ${res.status}: ${errorText}`);
  }

  return res.json() as Promise<T>;
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
