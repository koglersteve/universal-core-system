"use client";

import { useIdlyilyStore } from "./state/useIdlyilyStore";
import { useIdlyilySession } from "./state/useIdlyilySession";

import PromptDisplay from "./components/PromptDisplay";
import EntryComposer from "./components/EntryComposer";

export default function IdlyilyEditor() {
  const { prompt, saveEntry } = useIdlyilyStore();
  const { addEntry } = useIdlyilySession();

  const handleSave = async (text: string) => {
    const result = await saveEntry();
    if (result?.entry) {
      addEntry(result.entry);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">IDLYILY Editor</h1>

      <PromptDisplay prompt={prompt} />

      <EntryComposer onSubmit={handleSave} />
    </div>
  );
}
