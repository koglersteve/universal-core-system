import { getJokes } from "@/lib/server/jokes";

export async function GET() {
  const jokes = await getJokes();
  return Response.json(jokes);
}
