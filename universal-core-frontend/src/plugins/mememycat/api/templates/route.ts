export async function GET() {
  return Response.json({
    ok: true,
    plugin: "mememycat",
    templates: [
      {
        id: "mememycat-default",
        name: "Default Cat Template",
        category: "static",
        preview: "/templates/mememycat/default.png"
      }
    ]
  });
}
