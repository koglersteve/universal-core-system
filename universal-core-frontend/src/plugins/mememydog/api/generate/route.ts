export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));

  return Response.json({
    ok: true,
    plugin: "mememydog",
    received: body,
    result: {
      url: "/generated/mememydog/placeholder.png",
      status: "success"
    }
  });
}
