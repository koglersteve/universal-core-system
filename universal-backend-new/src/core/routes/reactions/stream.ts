// src/core/routes/reactions/stream.ts

import type { Request, Response } from "express";
import { createReactionStream } from "../../reactions/reaction-stream";

export async function reactionStream(req: Request, res: Response) {
  createReactionStream(res);
}
