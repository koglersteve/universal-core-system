export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));

  return Response.json({
    ok: true,
    plugin: "mememycat",
    received: body,
    result: {
      url: "/generated/mememycat/placeholder.png",
      status: "success"
    }
  });
}
