export async function GET() {
  return Response.json({
    ok: true,
    plugin: "mememydog",
    templates: [
      {
        id: "mememydog-default",
        name: "Default Dog Template",
        category: "static",
        preview: "/templates/mememydog/default.png"
      }
    ]
  });
}
