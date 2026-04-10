export async function GET() {
  return Response.json({
    ok: true,
    plugin: "mememydog",
    creations: []
  });
}
