"use client";

import React from "react";
import { useEmotionalOS } from "@/app/EmotionalOSProvider";
import "../styles/LaffLab.css";

type EmotionalLinkPanelProps = {
  onOpenDramaNextDoor?: () => void;
};

export const EmotionalLinkPanel: React.FC<EmotionalLinkPanelProps> = ({
  onOpenDramaNextDoor,
}) => {
  const { state } = useEmotionalOS();

  return (
    <div className="lafflab-emotional-link">
      <div className="lafflab-emotional-link__header">
        <h3>Emotional Link</h3>
        <span className="lafflab-emotional-link__world">
          World: {state.currentWorld ?? "Unknown"}
        </span>
      </div>

      <div className="lafflab-emotional-link__metrics">
        <div className="lafflab-emotional-link__metric">
          <span className="label">Mood</span>
          <span className="value">{Math.round(state.mood)}</span>
        </div>
        <div className="lafflab-emotional-link__metric">
          <span className="label">Tension</span>
          <span className="value">{Math.round(state.tension)}</span>
        </div>
        <div className="lafflab-emotional-link__metric">
          <span className="label">Volatility</span>
          <span className="value">{Math.round(state.volatility)}</span>
        </div>
      </div>

      <div className="lafflab-emotional-link__footer">
        <button
          className="lafflab-emotional-link__button"
          onClick={onOpenDramaNextDoor}
        >
          Open DramaNextDoor
        </button>
      </div>
    </div>
  );
};
