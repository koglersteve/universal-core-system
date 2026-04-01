// src/lib/memepresets.ts
import { MemeLayer } from "@/context/MemeEditorContext";
import { getMoodCaption, getMoodStickers } from "./memeemotions";

export type MemePresetKey =
  | "hoameme"
  | "mememydog"
  | "mememycat"
  | "dramanextdoor"
  | "lafflab"
  | "generic";

export function getPresetLayers(
  preset: MemePresetKey,
  mood?: string | null
): MemeLayer[] {
  const baseId = () => crypto.randomUUID();

  const caption = getMoodCaption(mood);
  const stickers = getMoodStickers(mood);

  const stickerLayers: MemeLayer[] = stickers.map((s, i) => ({
    id: baseId(),
    type: "text",
    content: s,
    x: 20 + i * 40,
    y: 20,
    width: 40,
    height: 40,
    rotation: 0
  }));

  if (preset === "hoameme") {
    return [
      {
        id: baseId(),
        type: "image",
        content: "/images/hoa-default.jpg",
        x: 0,
        y: 0,
        width: 400,
        height: 400,
        rotation: 0
      },
      {
        id: baseId(),
        type: "text",
        content: caption || "When the HOA sends another email...",
        x: 40,
        y: 320,
        width: 320,
        height: 60,
        rotation: 0
      },
      ...stickerLayers
    ];
  }

  if (preset === "mememydog") {
    return [
      {
        id: baseId(),
        type: "image",
        content: "/images/dog-default.jpg",
        x: 0,
        y: 0,
        width: 400,
        height: 400,
        rotation: 0
      },
      {
        id: baseId(),
        type: "text",
        content: caption || "He knows what you did.",
        x: 40,
        y: 320,
        width: 320,
        height: 60,
        rotation: 0
      },
      ...stickerLayers
    ];
  }

  if (preset === "mememycat") {
    return [
      {
        id: baseId(),
        type: "image",
        content: "/images/cat-default.jpg",
        x: 0,
        y: 0,
        width: 400,
        height: 400,
        rotation: 0
      },
      {
        id: baseId(),
        type: "text",
        content: caption || "She’s judging you.",
        x: 40,
        y: 320,
        width: 320,
        height: 60,
        rotation: 0
      },
      ...stickerLayers
    ];
  }

  if (preset === "dramanextdoor") {
    return [
      {
        id: baseId(),
        type: "image",
        content: "/images/drama-default.jpg",
        x: 0,
        y: 0,
        width: 400,
        height: 400,
        rotation: 0
      },
      {
        id: baseId(),
        type: "text",
        content: caption || "The neighborhood tea is HOT.",
        x: 30,
        y: 300,
        width: 340,
        height: 80,
        rotation: 0
      },
      ...stickerLayers
    ];
  }

  if (preset === "lafflab") {
    return [
      {
        id: baseId(),
        type: "image",
        content: "/images/lafflab-default.jpg",
        x: 0,
        y: 0,
        width: 400,
        height: 400,
        rotation: 0
      },
      {
        id: baseId(),
        type: "text",
        content: caption || "Insert chaotic energy here.",
        x: 20,
        y: 320,
        width: 360,
        height: 60,
        rotation: 0
      },
      ...stickerLayers
    ];
  }

  // Generic fallback
  return [
    {
      id: baseId(),
      type: "text",
      content: caption || "Emotional OS: generating meme energy...",
      x: 20,
      y: 20,
      width: 360,
      height: 80,
      rotation: 0
    },
    ...stickerLayers
  ];
}
