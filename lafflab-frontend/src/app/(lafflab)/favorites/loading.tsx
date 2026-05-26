import Skeleton from "@components/ui/Skeleton";

export default function FavoritesLoading() {
  return (
    <div className="p-4 space-y-4">
      <Skeleton className="h-20 w-full" />
      <Skeleton className="h-20 w-full" />
      <Skeleton className="h-20 w-full" />
    </div>
  );
}


