import { Request, Response } from "express";
import { Card } from "../models/cardModel";

// Create new card
export const createCard = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, price, image, discount } = req.body;

    const card = new Card({
      title,
      description,
      price,
      image,
      discount,
    });

    await card.save();
    res.status(201).json(card);
  } catch (error: any) {
    res.status(500).json({ message: "Error creating card", error: error.message });
  }
};

// Get all cards
export const getCards = async (req: Request, res: Response): Promise<void> => {
  try {
    const cards = await Card.find();
    res.json(cards);
  } catch (error: any) {
    res.status(500).json({ message: "Error fetching cards", error: error.message });
  }
};
