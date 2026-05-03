"use client";

import { Skeleton } from "@/components/ui/Skeleton";

export function JokeCardSkeleton() {
  return (
    <div className="space-y-3 p-4 rounded-lg bg-white/5 border border-white/10 animate-fadeIn card-elevated">
      <Skeleton className="h-5 w-1/3" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
    </div>
  );
}
