export default function Component({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {children}
    </div>
  );
}

