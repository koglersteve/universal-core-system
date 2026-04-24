export default function CodeBuilder() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">
          Code <span className="text-teal-400">Builder</span>
        </h1>
        <p className="mt-2 text-slate-400">
          Construct and assemble modular Aurelia-Q components.
        </p>
      </div>
      <div className="rounded-xl border border-navy-700 bg-navy-800 p-8 min-h-[500px] flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⚡</div>
          <p className="text-slate-400 text-lg">
            Code Builder workspace — ready for your components.
          </p>
          <p className="text-slate-500 text-sm mt-2">
            This is your Square One starting point. Build from here.
          </p>
        </div>
      </div>
    </div>
  );
}
