import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  const { userId = "anon" } = req.query;

  const views = await prisma.dramaView.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: { clip: true }
  });

  res.status(200).json({ items: views.map(v => v.clip) });
}
