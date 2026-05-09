export interface UserProfile {
  id: string;
  relevance?: number;
  momentum?: number;
  emotion?: number;
  social?: number;
  governance?: number;
  diversity?: number;
  session?: number;
}

export async function loadProfile(): Promise<UserProfile> {
  return {
    id: "demo-user",
    relevance: 1,
    momentum: 1,
    emotion: 1,
    social: 1,
    governance: 1,
    diversity: 1,
    session: 1,
  };
}

// Alias to satisfy API route imports
export const getProfile = loadProfile;
