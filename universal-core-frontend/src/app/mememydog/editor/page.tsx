"use client";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

import MemeMyDogEditor from "@/components/mememydog/MemeMyDogEditor";

export default function MemeMyDogEditorPage() {
  return (
    <main className="mememydog-editor-page">
      <MemeMyDogEditor />
    </main>
  );
}

