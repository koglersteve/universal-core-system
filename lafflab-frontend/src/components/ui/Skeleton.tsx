type SkeletonProps = {
  className?: string;
  variant?: "text" | "rect" | "circle";
};

export default function Skeleton({ className, variant = "rect" }: SkeletonProps) {
  const base = "animate-pulse bg-gray-800";

  if (variant === "circle") {
    return <div className={`${base} rounded-full ${className}`} />;
  }

  if (variant === "text") {
    return <div className={`${base} h-4 rounded ${className}`} />;
  }

  return <div className={`${base} rounded-md ${className}`} />;
}
