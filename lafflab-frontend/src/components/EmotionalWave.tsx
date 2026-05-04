"use client";

import { useEffect, useMemo, useState } from "react";
import { useReactionStream } from "@/hooks/useReactionStream";
import type { ReactionEmojiKey } from "@/types/os";
import type { ReactionStreamEvent } from "@/core/reactions/stream";

const EMOJI_ORDER: ReactionEmojiKey[] = [
  "laugh", "smile", "shock", "expressionless",
  "angry", "mindblown", "crickets",
];

// ... rest of component unchanged, now properly typed with ReactionEmojiKey
