"use client";

import React from "react";
import { useMood } from "../hooks/useMood";
import { getHoaMoodLine } from "../../../universal-core/plugins/hoa-meme/mood";

export default function HoaMeme() {
  const { mood } = useMood(); // mood is the emotional state string

  const line = mood
    ? getHoaMoodLine(mood)
    : "standard HOA chaos";

  return (
    <div className="hoa-meme">
      <h1 className="hoa-meme-title">HOA Meme</h1>
      <p className="hoa-meme-line">{line}</p>
    </div>
  );
}
