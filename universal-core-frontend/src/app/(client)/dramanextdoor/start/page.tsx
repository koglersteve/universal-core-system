"use client";

import { useSearchParams } from "next/navigation";

export default function DramaNextDoorStart() {
  const params = useSearchParams();
  const token = params.get("token");

  return (
    <div>
      <h1>DramaNextDoor</h1>
      <p>Token: {token}</p>
    </div>
  );
}
