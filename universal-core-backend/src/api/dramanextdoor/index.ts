import { Router } from "express";

import { feed } from "./feed";
import { favorite } from "./favorite";
import { favorites } from "./favorites";
import { history } from "./history";
import { post } from "./post";
import { react } from "./react";

const router = Router();

// GET routes
router.get("/feed", feed);
router.get("/favorites", favorites);
router.get("/history", history);

// POST routes
router.post("/favorite", favorite);
router.post("/post", post);
router.post("/react", react);

export default router;
