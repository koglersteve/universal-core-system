import { db } from "@vercel/postgres";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const result = await db.query(
      "INSERT INTO memes (data) VALUES ($1) RETURNING id",
      [body]
    );

    return Response.json({ id: result.rows[0].id });
  } catch (err) {
    console.error("Error saving meme:", err);
    return new Response("Error", { status: 500 });
  }
}
