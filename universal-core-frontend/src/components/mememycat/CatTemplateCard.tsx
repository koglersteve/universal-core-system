"use client";

export function CatTemplateCard({
  src,
  onSelect
}: {
  src: string;
  onSelect: () => void;
}) {
  return (
    <div className="mememycat-template-card" onClick={onSelect}>
      <img src={src} className="mememycat-template-img" />
    </div>
  );
}

