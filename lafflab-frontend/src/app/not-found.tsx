// src/app/not-found.tsx  OR  src/app/_not-found/page.tsx

export const dynamic = "force-dynamic";

export default function NotFound() {
  return (
    <div className="flex h-screen items-center justify-center">
      <h1 className="text-3xl font-bold">Page Not Found</h1>
    </div>
  );
}
