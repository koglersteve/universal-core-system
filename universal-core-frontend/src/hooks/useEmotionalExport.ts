"use client";

import { useState } from "react";

export function useEmotionalExport() {
  const [exporting, setExporting] = useState(false);

  const startExport = () => setExporting(true);
  const finishExport = () => setExporting(false);

  return {
    exporting,
    startExport,
    finishExport
  };
}
