export interface Scene {
  id: string;
  title: string;
  beats: SceneBeat[];
  emotional: {
    moodDelta?: number;
    tensionDelta?: number;
    identityShift?: string | null;
    worldDelta?: Record<string, any> | null;
  };
  transitions: SceneTransition[];
}

export interface SceneBeat {
  id: string;
  text: string;
  agent?: string; // optional emotional agent voice
  moodEffect?: number;
  tensionEffect?: number;
}

export interface SceneTransition {
  id: string;
  condition: (ctx: SceneContext) => boolean;
  targetScene: string;
  crossApp?: {
    appId: string;
    payload?: any;
  };
}

export interface SceneContext {
  mood: number;
  tension: number;
  identityState: string;
  worldName: string;
}
