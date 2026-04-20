"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function DramaNextDoorRedirect() {
  const params = useSearchParams();

  useEffect(() => {
    const token = params.get("token");

    if (token) {
      window.location.href = `/api/dramanextdoor/redirect?token=${token}`;
    }
  }, [params]);

  return null;
}
