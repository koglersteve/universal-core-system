export const dynamic = "force-dynamic";
"use client";

import { useEffect, useState } from "react";
import { getRandomJoke } from "@/plugins/lafflab/LaffLabApi";

export default function LaffLabPage() {
  const [joke, setJoke] = useState<string>("Loading...");

  useEffect(() => {
    getRandomJoke().then((data) => {
      setJoke(data.joke || "No joke available");
    });
  }, []);

  return (
    <div className="lafflab-container">
      <h1>LAFFlab</h1>
      <p>{joke}</p>
    </div>
  );
}
