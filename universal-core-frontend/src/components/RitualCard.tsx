"use client";

export function RitualCard({
  title,
  description
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="ritual-card">
      <h3 className="ritual-card-title">{title}</h3>
      <p className="ritual-card-description">{description}</p>
    </div>
  );
}
