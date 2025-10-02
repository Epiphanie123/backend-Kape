import { Router } from "express";
import { createCard, getCards } from "../controllers/cardController";

const router = Router();

// POST /api/cards → create a new card
router.post("/", createCard);

// GET /api/cards → get all cards
router.get("/", getCards);

export default router;
