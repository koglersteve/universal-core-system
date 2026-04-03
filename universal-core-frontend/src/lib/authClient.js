const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export async function loginRequest(email, password) {
  const body = { email, password };

  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  return res.json();
}
