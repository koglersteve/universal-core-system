export default function LafflabDashboard() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">LAFFlab Dashboard</h1>
      <p className="text-gray-500">
        Your humor engine, meme generator, and daily ritual hub.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <a
          href="/plugins/lafflab/explore"
          className="p-4 rounded-xl border hover:bg-gray-50"
        >
          <h2 className="font-semibold text-lg">Explore Humor</h2>
          <p className="text-sm text-gray-500">Browse categories and jokes.</p>
        </a>

        <a
          href="/plugins/lafflab/favorites"
          className="p-4 rounded-xl border hover:bg-gray-50"
        >
          <h2 className="font-semibold text-lg">Favorites</h2>
          <p className="text-sm text-gray-500">Your saved jokes.</p>
        </a>

        <a
          href="/plugins/lafflab/settings"
          className="p-4 rounded-xl border hover:bg-gray-50"
        >
          <h2 className="font-semibold text-lg">Settings</h2>
          <p className="text-sm text-gray-500">Customize LAFFlab.</p>
        </a>
      </div>
    </div>
  );
}
