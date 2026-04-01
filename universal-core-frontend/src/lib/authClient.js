// src/lib/authClient.ts

export async function loginRequest(email: string, password: string) {
  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000); // 8s timeout

  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({ email, password })
    });

    if (!res.ok) {
      if (res.status === 401) {
        throw new Error("Invalid credentials");
      }
      throw new Error(`Login failed: ${res.status}`);
    }

    const data = await res.json();

    if (process.env.NODE_ENV === "development") {
      console.log("[loginRequest]", data);
    }

    return data;
  } catch (err) {
    if (err.name === "AbortError") {
      throw new Error("Login request timed out");
    }
    throw err;
  } finally {
    clearTimeout(timeout);
  }
}
