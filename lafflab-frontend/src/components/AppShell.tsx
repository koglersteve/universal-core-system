export default function AppShell({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <div className="min-h-screen bg-black text-white">
      {title && (
        <div className="p-4 text-xl font-semibold border-b border-white/10">
          {title}
        </div>
      )}

      <div>{children}</div>
    </div>
  );
}

