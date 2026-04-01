"use client";

export function AuthCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="auth-card">
      <h1 className="auth-title">{title}</h1>
      {children}
    </div>
  );
}
