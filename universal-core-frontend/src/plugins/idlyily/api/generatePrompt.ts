// src/app/api/idlyily/generate-prompt/route.ts

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const { mood, world, trait, agent } = body;

  const base = `Write a short, emotionally rich reflection.`;

  const moodLine = mood ? `The mood is ${mood}.` : "";
  const worldLine = world ? `The world context is ${world}.` : "";
  const traitLine = trait ? `The dominant trait is ${trait}.` : "";
  const agentLine = agent ? `The agent involved is ${agent}.` : "";

  const prompt = `${base} ${moodLine} ${worldLine} ${traitLine} ${agentLine}`.trim();

  return NextResponse.json({ prompt });
}
