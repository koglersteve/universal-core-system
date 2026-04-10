export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));

  return Response.json({
    ok: true,
    plugin: "moodcheck",
    received: body,
    resultId: "placeholder-result-id"
  });
}
