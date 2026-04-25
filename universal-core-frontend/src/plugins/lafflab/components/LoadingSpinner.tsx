"use client";

import React from "react";
import "../styles/LaffLab.css";

type LoadingSpinnerProps = {
  label?: string;
};

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ label = "Loading..." }) => {
  return (
    <div className="lafflab-loading">
      <div className="lafflab-loading__spinner" />
      <span className="lafflab-loading__label">{label}</span>
    </div>
  );
};
