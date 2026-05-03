import { JokeCardSkeleton } from "@/components/JokeCardSkeleton";

export default function Loading() {
  return (
    <div className="p-6 space-y-6 animate-fadeIn">
      {[...Array(4)].map((_, i) => (
        <JokeCardSkeleton key={i} />
      ))}
    </div>
  );
}
