"use client";

import React from "react";
import type { Joke } from "../api/LaffLabApi";
import "../styles/JokeViewer.css";

type JokeCardProps = {
  joke: Joke;
  isFavorite?: boolean;
  onToggleFavorite?: (joke: Joke) => void;
  onOpenDetails?: (joke: Joke) => void;
};

export const JokeCard: React.FC<JokeCardProps> = ({
  joke,
  isFavorite = false,
  onToggleFavorite,
  onOpenDetails,
}) => {
  return (
    <div className="lafflab-joke-card">
      <div className="lafflab-joke-card__header">
        <span className="lafflab-joke-card__category">{joke.category}</span>
        <button
          className={`lafflab-joke-card__favorite ${isFavorite ? "is-favorite" : ""}`}
          onClick={() => onToggleFavorite?.(joke)}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? "★" : "☆"}
        </button>
      </div>
      <p className="lafflab-joke-card__text">{joke.text}</p>
      <div className="lafflab-joke-card__footer">
        <button className="lafflab-joke-card__details" onClick={() => onOpenDetails?.(joke)}>
          View details
        </button>
      </div>
    </div>
  );
};
