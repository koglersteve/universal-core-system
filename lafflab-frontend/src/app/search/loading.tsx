import { Skeleton } from "@/components/ui/Skeleton";
import { JokeCardSkeleton } from "@/components/JokeCardSkeleton";

export default function Loading() {
  return (
    <div className="p-6 space-y-6 animate-fadeIn">
      <Skeleton className="h-10 w-full" />

      {[...Array(5)].map((_, i) => (
        <JokeCardSkeleton key={i} />
      ))}
    </div>
  );
}
