export async function GET() {
  return Response.json({
    ok: true,
    plugin: "mememycat",
    creations: []
  });
}
