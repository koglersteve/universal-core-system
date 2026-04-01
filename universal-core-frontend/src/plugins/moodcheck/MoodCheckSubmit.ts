// src/plugins/moodcheck/MoodCheckSubmit.ts

export type MoodSubmitPayload = {
  mood: string;
  world?: string;
  trait?: string;
  agent?: string;
  token?: string; // emotional token
};

export async function submitMood(payload: MoodSubmitPayload) {
  try {
    const res = await fetch("/api/moodcheck", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      console.error("Mood submission failed with status:", res.status);
      return { ok: false, error: "Request failed" };
    }

    const data = await res.json();
    return { ok: true, data };
  } catch (err) {
    console.error("Mood submission failed:", err);
    return { ok: false, error: "Network or server error" };
  }
}
