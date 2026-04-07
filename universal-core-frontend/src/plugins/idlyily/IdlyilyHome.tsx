"use client";

import { useEffect } from "react";
import { useIdlyilyStore } from "./state/useIdlyilyStore";
import { useIdlyilySession } from "./state/useIdlyilySession";

import MoodBadge from "./components/MoodBadge";
import TemplateSuggestionCard from "./components/TemplateSuggestionCard";
import PromptDisplay from "./components/PromptDisplay";
import EntryComposer from "./components/EntryComposer";

export default function IdlyilyHome() {
  const {
    mood,
    world,
    trait,
    agent,
    prompt,
    templates,
    generatePrompt,
    fetchTemplates,
    updateEntryText,
    saveEntry,
    getMoodScore,
  } = useIdlyilyStore();

  const { addEntry, setMoodScore } = useIdlyilySession();

  useEffect(() => {
    fetchTemplates();
    generatePrompt();
    (async () => {
      if (mood) {
        const score = await getMoodScore();
        setMoodScore(score);
      }
    })();
  }, [mood, world, trait, agent]);

  const handleSave = async (text: string) => {
    const result = await saveEntry();
    if (result?.entry) {
      addEntry(result.entry);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">IDLYILY</h1>

      <div className="flex items-center gap-3">
        <span className="text-gray-600">Current Mood:</span>
        <MoodBadge mood={mood} />
      </div>

      <PromptDisplay prompt={prompt} />

      <h2 className="text-lg font-semibold">Suggested Templates</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map((tpl) => (
          <TemplateSuggestionCard key={tpl.id} template={tpl} />
        ))}
      </div>

      <h2 className="text-lg font-semibold">Write Your Entry</h2>
      <EntryComposer onSubmit={handleSave} />
    </div>
  );
}
