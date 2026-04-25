"use client";

import React from "react";
import "../styles/LaffLab.css";

type EmptyStateProps = {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
};

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "Nothing here yet",
  description = "Try refreshing or exploring another category.",
  actionLabel,
  onAction,
}) => {
  return (
    <div className="lafflab-empty">
      <h3 className="lafflab-empty__title">{title}</h3>
      <p className="lafflab-empty__description">{description}</p>
      {actionLabel && onAction && (
        <button className="lafflab-empty__button" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
};
