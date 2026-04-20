"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

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
