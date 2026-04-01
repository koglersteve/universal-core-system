import { NextResponse } from "next/server";

export async function GET() {
  const stream = new ReadableStream({
    start(controller) {
      // Example: send a heartbeat every second
      const interval = setInterval(() => {
        const event = {
          ts: Date.now(),
          type: "heartbeat",
          message: "Stability stream alive"
        };

        controller.enqueue(`data: ${JSON.stringify(event)}\n\n`);
      }, 1000);

      // Cleanup
      return () => clearInterval(interval);
    }
  });

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive"
    }
  });
}
