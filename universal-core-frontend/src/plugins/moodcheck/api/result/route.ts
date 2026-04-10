export async function GET() {
  return Response.json({
    ok: true,
    plugin: "moodcheck",
    result: {
      mood: "neutral",
      timestamp: new Date().toISOString()
    }
  });
}
