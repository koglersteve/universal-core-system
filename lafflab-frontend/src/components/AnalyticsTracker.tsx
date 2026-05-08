"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { Analytics } from "@/lib/analytics";

export default function AnalyticsTracker() {
  const path = usePathname();

  useEffect(() => {
    if (path) Analytics.pageview(path);
  }, [path]);

  return null;
}
