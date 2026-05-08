"use client";

import Skeleton from "@/components/ui/Skeleton";

export function JokeCardSkeleton() {
  return (
    <div className="rounded-lg border p-4 space-y-4">
      <Skeleton className="h-6 w-1/3" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  );
}
