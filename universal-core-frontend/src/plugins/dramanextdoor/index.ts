// src/plugins/dramanextdoor/index.ts

export { DramaNextDoorHome } from "./DramaNextDoorHome";
export { DramaNextDoorScene } from "./DramaNextDoorScene";
export { DramaNextDoorHistory } from "./DramaNextDoorHistory";

// Optional future exports (safe to leave commented)
// export { DramaNextDoorInspector } from "./DramaNextDoorInspector";
// export { DramaNextDoorTemplates } from "./DramaNextDoorTemplates";
// export { DramaNextDoorWorldView } from "./DramaNextDoorWorldView";

// Plugin metadata (useful for registry, analytics, routing)
export const DramaNextDoorPlugin = {
  id: "dramanextdoor",
  name: "DramaNextDoor",
  icon: "🎭",
  path: "/dramanextdoor"
};
