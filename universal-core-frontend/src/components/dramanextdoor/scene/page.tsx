"use client";

export default function Scene({ scene }) {
  if (!scene) {
    return (
      <div className="p-4 text-gray-400">
        No scene loaded yet…
      </div>
    );
  }

  return (
    <div className="p-4 border rounded-lg bg-white shadow">
      <h2 className="text-2xl font-bold mb-2">{scene.title}</h2>
      <p className="text-gray-600 mb-4">{scene.description}</p>

      <div className="space-y-2">
        {scene.lines?.map((line, i) => (
          <p key={i} className="text-gray-800">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}
