"use client";

import { useState } from "react";

export function useEmotionalExport() {
  const [exporting, setExporting] = useState(false);

  return {
    exporting,
    start: () => setExporting(true),
    finish: () => setExporting(false)
  };
}

