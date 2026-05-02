export default function LoadingState({ message }: { message?: string }) {
  return (
    <div className="p-6 text-white/70 animate-pulse">
      {message || "Loading…"}
    </div>
  );
}
