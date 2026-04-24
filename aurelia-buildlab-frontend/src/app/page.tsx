export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-20">
      <div className="text-center">
        <h1 className="text-5xl font-bold tracking-tight text-white">
          Aurelia <span className="text-teal-400">BuildLab</span>
        </h1>
        <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
          The prototyping and simulation hub for the Aurelia-Q ecosystem.
          Build, test, and simulate modular components in one place.
        </p>
        <div className="mt-10 flex justify-center gap-6">
          <a href="/builder" className="rounded-lg bg-teal-500 px-6 py-3 text-sm font-semibold text-navy-900 hover:bg-teal-400 transition-colors">
            Open Code Builder
          </a>
          <a href="/simulator" className="rounded-lg border border-teal-500 px-6 py-3 text-sm font-semibold text-teal-400 hover:bg-teal-500/10 transition-colors">
            Open Code Simulator
          </a>
        </div>
      </div>
      <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="rounded-xl border border-navy-700 bg-navy-800 p-8">
          <div className="text-teal-400 text-2xl mb-3">⚡</div>
          <h2 className="text-xl font-semibold text-white">Code Builder</h2>
          <p className="mt-2 text-slate-400">
            Construct and assemble modular Aurelia-Q components with a visual
            and code-driven interface. Build once, deploy everywhere.
          </p>
        </div>
        <div className="rounded-xl border border-navy-700 bg-navy-800 p-8">
          <div className="text-teal-400 text-2xl mb-3">🔬</div>
          <h2 className="text-xl font-semibold text-white">Code Simulator</h2>
          <p className="mt-2 text-slate-400">
            Test component behavior in a real-time simulation environment.
            Validate integration and performance before deployment.
          </p>
        </div>
      </div>
    </div>
  );
}
