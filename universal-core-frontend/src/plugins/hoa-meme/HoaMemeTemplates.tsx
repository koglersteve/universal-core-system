"use client";

import React from "react";

type HoaMemeTemplate = {
  id: string;
  title: string;
  description: string;
  vibe: string;
};

const TEMPLATES: HoaMemeTemplate[] = [
  {
    id: "parking-wars",
    title: "Parking Wars",
    description: "Passive‑aggressive notes, cones, and mysterious tire tracks.",
    vibe: "petty, territorial, dramatic"
  },
  {
    id: "trash-day-chaos",
    title: "Trash Day Chaos",
    description: "Bins out too early, too late, or not HOA‑approved enough.",
    vibe: "rule‑lawyering, exasperated, resigned"
  },
  {
    id: "mailbox-inspections",
    title: "Mailbox Inspections",
    description: "One chipped corner and suddenly it’s a federal case.",
    vibe: "nitpicky, officious, over‑serious"
  },
  {
    id: "holiday-decor-drama",
    title: "Holiday Decor Drama",
    description: "Lights too bright, inflatables too big, joy strictly regulated.",
    vibe: "festive, chaotic, over‑the‑top"
  }
];

export function HoaMemeTemplates() {
  return (
    <div className="hoa-meme-templates">
      {TEMPLATES.map((tpl) => (
        <div key={tpl.id} className="hoa-meme-template-card">
          <h3 className="hoa-meme-template-title">{tpl.title}</h3>
          <p className="hoa-meme-template-desc">{tpl.description}</p>
          <p className="hoa-meme-template-vibe">Vibe: {tpl.vibe}</p>
        </div>
      ))}
    </div>
  );
}

export default HoaMemeTemplates;
