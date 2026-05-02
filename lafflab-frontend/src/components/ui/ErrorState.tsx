export default function ErrorState({
  message,
  retry,
}: {
  message: string;
  retry?: () => void;
}) {
  return (
    <div className="p-6 text-red-400 space-y-3">
      <p>{message}</p>
      {retry && (
        <button
          onClick={retry}
          className="px-4 py-2 rounded bg-white/10 border border-white/20 hover:bg-white/20 transition text-white"
        >
          Try again
        </button>
      )}
    </div>
  );
}
