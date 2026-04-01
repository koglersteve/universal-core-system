// src/app/mememycat/page.tsx
"use client";

import { MemeMyCatHome } from "@/plugins/mememycat";
import { useEffect } from "react";

export default function Page() {
  return (
    <>
      <SessionDurationTracker />
      <MemeMyCatHome />
    </>
  );
}

function SessionDurationTracker() {
  useEffect(() => {
    const start = performance.now();
    return () => {
      const end = performance.now();
      stability.download(end - start, true);
    };
  }, []);

  return null;
}


