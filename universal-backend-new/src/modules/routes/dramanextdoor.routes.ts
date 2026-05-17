import { Hono } from "hono";
import prisma from "../../shared/api/prisma";

const router = new Hono();

router.get("/feed", async (c) => {
  const clips = await prisma.dramaClip.findMany({
    orderBy: { createdAt: "desc" },
  });

  return c.json(
    clips.map((clip) => ({
      id: clip.id,
      type: clip.type,
      title: clip.title,
      videoUrl: clip.videoUrl,
      createdAt: clip.createdAt,
      reactions: {
        laugh: clip.laugh,
        smile: clip.smile,
        shock: clip.shock,
        sad: clip.sad,
        angry: clip.angry,
        mindblown: clip.mindblown,
        chaos: clip.chaos,
      },
    }))
  );
});

export const dramaNextDoorRoute = router;
export default router;
