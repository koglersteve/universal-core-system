import { NextResponse } from "next/server";

export async function GET() {
  try {
    const jokes = [
      "I told my computer I needed a break… it said 'No problem, I’ll go to sleep.'",
      "Why don’t programmers like nature? Too many bugs.",
      "Debugging: Being the detective in a crime movie where you are also the murderer.",
      "Why did the function break up with the variable? It had constant issues.",
      "I asked my AI assistant for a joke… it generated my entire codebase."
    ];

    const random = jokes[Math.floor(Math.random() * jokes.length)];

    return NextResponse.json({ joke: random });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to load joke" },
      { status: 500 }
    );
  }
}
