"use client";

export default function State({ emotion, tension }) {
  return (
    <div className="p-4 border rounded bg-white shadow">
      <h3 className="text-lg font-semibold mb-2">Current State</h3>

      <p className="text-gray-700">
        <strong>Emotion:</strong> {emotion}
      </p>

      <p className="text-gray-700">
        <strong>Tension:</strong> {tension}
      </p>
    </div>
  );
}
