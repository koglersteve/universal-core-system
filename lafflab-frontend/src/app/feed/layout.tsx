import type { ReactNode } from "react";

export default function FeedLayout({ children }: { children: ReactNode }) {
  return <section>{children}</section>;
}
