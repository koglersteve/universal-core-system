import { prisma } from "@/lib/prisma";

export default async function MemeViewPage({
  params
}: {
  params: { id: string };
}) {
  const meme = await prisma.meme.findUnique({
    where: { id: params.id }
  });

  if (!meme) {
    return <div style={{ padding: 24 }}>Meme not found.</div>;
  }

  const layers = meme.layers as any[];

  return (
    <div style={{ padding: 24 }}>
      <h1>{meme.title || "Shared Meme"}</h1>
      <p style={{ opacity: 0.7, marginBottom: 16 }}>
        App: {meme.app} {meme.mood ? `· Mood: ${meme.mood}` : null}
      </p>

      <div
        style={{
          width: 400,
          height: 400,
          background: "#000",
          borderRadius: 12,
          position: "relative",
          overflow: "hidden"
        }}
      >
        {layers.map((layer) => (
          <div
            key={layer.id}
            style={{
              position: "absolute",
              left: layer.x,
              top: layer.y,
              width: layer.width,
              height: layer.height,
              transform: `rotate(${layer.rotation}deg)`,
              transformOrigin: "center center"
            }}
          >
            {layer.type === "image" && (
              <img
                src={layer.content}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            )}
            {layer.type === "text" && (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontWeight: 700
                }}
              >
                {layer.content}
              </div>
            )}
            {layer.type === "sticker" && (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 32
                }}
              >
                {layer.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
