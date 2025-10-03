"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCards = exports.createCard = void 0;
const cardModel_1 = require("../models/cardModel");
// Create new card
const createCard = async (req, res) => {
    try {
        const { title, description, price, image, discount } = req.body;
        const card = new cardModel_1.Card({
            title,
            description,
            price,
            image,
            discount,
        });
        await card.save();
        res.status(201).json(card);
    }
    catch (error) {
        res.status(500).json({ message: "Error creating card", error: error.message });
    }
};
exports.createCard = createCard;
// Get all cards
const getCards = async (req, res) => {
    try {
        const cards = await cardModel_1.Card.find();
        res.json(cards);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching cards", error: error.message });
    }
};
exports.getCards = getCards;
