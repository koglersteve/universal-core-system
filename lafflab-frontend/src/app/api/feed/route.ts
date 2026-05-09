export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { Post } from "@/types/post";

export async function GET() {
  const mockFeed: Post[] = [
    {
      id: "1",
      type: "video",
      mediaUrl: "https://example.com/video1.mp4",
      createdAt: new Date().toISOString(),
      creator: {
        id: "u1",
        screenName: "FunnyGuy"
      }
    },
    {
      id: "2",
      type: "audio",
      mediaUrl: "https://example.com/audio1.mp3",
      createdAt: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
      creator: {
        id: "u2",
        screenName: "LaughMaster"
      }
    },
    {
      id: "3",
      type: "image",
      mediaUrl: "https://example.com/image1.jpg",
      createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
      creator: {
        id: "u3",
        screenName: "MemeLord"
      }
    },
    {
      id: "4",
      type: "meme",
      mediaUrl: "https://example.com/meme1.jpg",
      createdAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
      creator: {
        id: "u4",
        screenName: "JokeDealer"
      }
    },
    {
      id: "5",
      type: "text",
      text: "This is a 150 character max joke post. Short, punchy, and funny.",
      createdAt: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
      creator: {
        id: "u5",
        screenName: "WriterDude"
      }
    }
  ];

  return NextResponse.json(mockFeed);
}
