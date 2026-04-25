"use client";

import React from "react";
import { EmptyState } from "./EmptyState";

type ErrorBoundaryProps = {
  children: React.ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, info: unknown) {
    // In a real app, send this to logging/telemetry
    console.error("LaffLab ErrorBoundary caught error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <EmptyState
          title="Something went wrong"
          description="LaffLab had a hiccup. Try again in a moment."
          actionLabel="Retry"
          onAction={() => this.setState({ hasError: false })}
        />
      );
    }

    return this.props.children;
  }
}
