import { Scene } from "./sceneTypes";

export const scenes: Record<string, Scene> = {
  intro: {
    id: "intro",
    title: "A Strange Noise Next Door",
    beats: [
      { id: "b1", text: "You hear a loud thump through the wall.", tensionEffect: +0.1 },
      { id: "b2", text: "Your neighbor mutters something unintelligible.", agent: "observer" },
    ],
    emotional: {
      tensionDelta: +0.2,
    },
    transitions: [
      {
        id: "t1",
        condition: (ctx) => ctx.tension > 0.6,
        targetScene: "escalation",
      },
      {
        id: "t2",
        condition: (ctx) => ctx.mood < 25,
        targetScene: "comicRelief",
      },
    ],
  },

  escalation: {
    id: "escalation",
    title: "The Argument Intensifies",
    beats: [
      { id: "b1", text: "Voices rise. Something slams.", tensionEffect: +0.3 },
      { id: "b2", text: "An emotional agent whispers: 'This is about to get messy.'", agent: "chaos" },
    ],
    emotional: {
      tensionDelta: +0.4,
      identityShift: "chaotic",
    },
    transitions: [
      {
        id: "t1",
        condition: (ctx) => ctx.identityState === "chaotic",
        targetScene: "identityBreak",
      },
    ],
  },

  identityBreak: {
    id: "identityBreak",
    title: "Identity Fracture",
    beats: [
      { id: "b1", text: "You feel something inside you crack.", moodEffect: -10 },
      { id: "b2", text: "Your emotional identity destabilizes.", agent: "innerVoice" },
    ],
    emotional: {
      moodDelta: -15,
      identityShift: "unstable",
    },
    transitions: [
      {
        id: "t1",
        condition: (ctx) => true,
        targetScene: "intro",
        crossApp: { appId: "moodcheck", payload: { reason: "identity_break" } },
      },
    ],
  },
};
