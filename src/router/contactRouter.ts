import { Router } from "express";
import { createContact } from "../controllers/ContactController";

const contactRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Contact
 *   description: Contact message management
 */

/**
 * @swagger
 * /api/contact/create-contact:
 *   post:
 *     summary: Create a new contact message
 *     tags: [Contact]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - message
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       201:
 *         description: Contact message created successfully
 *       400:
 *         description: Invalid input
 */
contactRouter.post("/create-contact", createContact);

export default contactRouter;
