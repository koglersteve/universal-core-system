"use client";

export function DogTemplateCard({
  src,
  onSelect
}: {
  src: string;
  onSelect: () => void;
}) {
  return (
    <div className="mememydog-template-card" onClick={onSelect}>
      <img src={src} className="mememydog-template-img" />
    </div>
  );
}
