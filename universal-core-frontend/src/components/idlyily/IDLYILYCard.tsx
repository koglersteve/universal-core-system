"use client";

export function IDLYILYCard({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="idlyily-card">
      <h3 className="idlyily-card-title">{title}</h3>
      <div className="idlyily-card-body">{children}</div>
    </div>
  );
}
