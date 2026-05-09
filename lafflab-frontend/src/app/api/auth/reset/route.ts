export async function POST(req: Request) {
  const body = await req.json();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/reset`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    }
  );

  return new Response(await res.text(), { status: res.status });
}
