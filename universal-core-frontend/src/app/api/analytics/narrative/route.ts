import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres"; // or your DB client

export async function GET() {
  try {
    const { rows } = await sql`
      SELECT *
      FROM emotional_events
      WHERE type = 'narrative.metrics'
      ORDER BY ts DESC
      LIMIT 5000;
    `;

    return NextResponse.json({
      scenes: rows
    });
  } catch (err) {
    console.error("Narrative API error:", err);
    return NextResponse.json(
      { error: "Failed to load narrative analytics" },
      { status: 500 }
    );
  }
}
