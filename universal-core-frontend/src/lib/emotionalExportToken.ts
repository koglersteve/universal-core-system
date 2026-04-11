// src/lib/emotionalExportToken.ts

// EmotionalExport is now a plain structural type.
// You no longer import it from the deleted Context system.
export type EmotionalExport = {
  mood?: string | null;
  world?: string | null;
  trait?: string | null;
  agent?: string | null;
  [key: string]: any;
};

const SECRET =
  process.env.NEXT_PUBLIC_EMOTIONAL_TOKEN_SECRET || "dev-secret";

// --- Utility: subtle crypto key ---
async function getKey() {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
}

// --- Utility: HMAC signature ---
async function sign(data: string) {
  const key = await getKey();
  const sig = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(data)
  );
  return btoa(String.fromCharCode(...new Uint8Array(sig)));
}

export async function encodeEmotionalState(
  state: EmotionalExport
): Promise<string> {
  const envelope = {
    v: 1, // version
    ts: Date.now(),
    payload: state
  };

  const json = JSON.stringify(envelope);
  const base = btoa(json);
  const signature = await sign(base);

  return `${base}.${signature}`;
}

// --- Minimal safe decoder (required by multiple pages) ---
export function decodeEmotionalState(token: string) {
  try {
    const [base] = token.split(".");
    const json = JSON.parse(Buffer.from(base, "base64").toString());
    return json.payload ?? json;
  } catch {
    return { mood: null, world: null, trait: null, agent: null };
  }
}
