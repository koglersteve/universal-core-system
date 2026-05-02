export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center text-white space-y-3">
      <h1 className="text-2xl font-bold">Page not found</h1>
      <p className="text-sm text-white/70 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or may have been moved.
      </p>
      <a
        href="/"
        className="mt-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm hover:bg-white/20 transition"
      >
        Go back home
      </a>
    </div>
  );
}
