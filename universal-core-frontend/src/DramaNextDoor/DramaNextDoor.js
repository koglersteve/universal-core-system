"use client";

import React from "react";
import { useMood } from "../hooks/useMood";
import { getDramaLevel } from "../../../universal-core/plugins/dramanextdoor/mood";

export default function DramaNextDoor() {
  const { mood } = useMood(); // mood is the emotional state string

  const drama = mood
    ? getDramaLevel(mood)
    : "baseline";

  return (
    <div className="drama-nextdoor">
      <h1 className="drama-title">DramaNextDoor</h1>
      <p className="drama-level">Drama level: {drama}</p>
    </div>
  );
}
