import { Router } from "express";
import { createCard, getCards } from "../controllers/cardController";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Cards
 *   description: Card management
 */

/**
 * @swagger
 * /api/cards:
 *   post:
 *     summary: Create a new card
 *     tags: [Cards]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cardNumber
 *               - cardHolder
 *               - expiryDate
 *             properties:
 *               cardNumber:
 *                 type: string
 *                 description: Card number
 *               cardHolder:
 *                 type: string
 *                 description: Name on the card
 *               expiryDate:
 *                 type: string
 *                 description: Expiry date of the card
 *     responses:
 *       201:
 *         description: Card created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/", createCard);

/**
 * @swagger
 * /api/cards:
 *   get:
 *     summary: Get all cards
 *     tags: [Cards]
 *     responses:
 *       200:
 *         description: List of all cards
 */
router.get("/", getCards);

export default router;
