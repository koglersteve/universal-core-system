// src/lib/api/httpclient.ts
"use client";

// -----------------------------
// BASE URL (with diagnostics)
// -----------------------------
const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL;

// Log what the frontend actually received at build time
console.log("🚀 API_BASE (from env):", API_BASE);

// If missing, DO NOT crash the entire app — fail requests instead
if (!API_BASE) {
  console.warn(
    "⚠️ NEXT_PUBLIC_BACKEND_URL is NOT set. All API calls will fail."
  );
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
  if (!API_BASE) {
    return Promise.reject(
      new Error("Backend URL missing: NEXT_PUBLIC_BACKEND_URL is not set")
    );
  }

  const token = getAuthToken();
  let res: Response;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const url = `${API_BASE}${path}`;
    console.log("🌐 Fetching:", url);

    res = await fetch(url, {
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
    console.error("❌ Network error:", err);
    return Promise.reject(new Error("Network error"));
  }

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error("❌ API Error:", res.status, text);
    return Promise.reject(new Error(`API Error ${res.status}`));
  }

  const raw = await res.text();
  if (!raw) return {} as T;

  try {
    return JSON.parse(raw) as T;
  } catch (err) {
    console.error("❌ JSON parse error:", err, "Body:", raw);
    return Promise.reject(new Error("Invalid JSON response"));
  }
}

// -----------------------------
// SHORTCUT HELPERS
// -----------------------------
export const get = <T>(path: string) => http<T>(path, { method: "GET" });
export const post = <T>(path: string, body: any) =>
  http<T>(path, { method: "POST", body: JSON.stringify(body) });
export const patch = <T>(path: string, body: any) =>
  http<T>(path, { method: "PATCH", body: JSON.stringify(body) });
export const del = <T>(path: string) => http<T>(path, { method: "DELETE" });
