"use client";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getDramaScene } from "@/plugins/dramanextdoor/DramaNextDoorApi";

export default function DramaNextDoorPage() {
  const params = useSearchParams();
  const mood = params.get("mood") || "neutral";

  const [scene, setScene] = useState<any>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    getDramaScene(mood)
      .then((data) => {
        if (data?.status === "ok") {
          setScene(data.scene);
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true));
  }, [mood]);

  if (error) {
    return (
      <div className="drama-error">
        <h1>Something went wrong generating your drama.</h1>
      </div>
    );
  }

  if (!scene) {
    return <div>Loading drama…</div>;
  }

  return (
    <div className="drama-container">
      <h1>{scene.title}</h1>
      <p>{scene.description}</p>

      <div className="drama-lines">
        {Array.isArray(scene.lines) &&
          scene.lines.map((line: string, i: number) => (
            <p key={i}>{line}</p>
          ))}
      </div>
    </div>
  );
}

