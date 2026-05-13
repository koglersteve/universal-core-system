export async function POST(req: Request) {
  try {
    const body = await req.json();

    const backendUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!backendUrl) {
      return new Response("Missing NEXT_PUBLIC_API_URL", { status: 500 });
    }

    const res = await fetch(`${backendUrl}/auth/reset`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const text = await res.text();

    return new Response(text, {
      status: res.status,
      headers: { "Content-Type": res.headers.get("Content-Type") ?? "text/plain" },
    });
  } catch (err) {
    return new Response("Password reset failed", { status: 500 });
  }
}
