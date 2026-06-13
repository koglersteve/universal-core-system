// src/lib/api/httpclient.ts
const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL;

if (!API_BASE) {
  throw new Error("NEXT_PUBLIC_BACKEND_URL is not set");
}

// ... rest of code ...

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
  
  // ... rest unchanged ...
}