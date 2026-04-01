// moodcheck-app/src/os/osBridge.js
const CORE_URL = process.env.REACT_APP_CORE_URL || "http://localhost:4000";

export async function sendToUniversalCore(packet) {
  try {
    await fetch(`${CORE_URL}/api/mood-state`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(packet),
    });
  } catch (e) {
    console.error("Failed to send mood state to core", e);
  }

  // Dev/demo hook so frontends can still read it directly
  if (typeof window !== "undefined") {
    window.__AURELIAQ_LAST_MOOD_PACKET__ = packet;
  }

  return true;
}

