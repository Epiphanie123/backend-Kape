"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var cardController_1 = require("../controllers/cardController");
var router = (0, express_1.Router)();
// POST /api/cards → create a new card
router.post("/", cardController_1.createCard);
// GET /api/cards → get all cards
router.get("/", cardController_1.getCards);
exports.default = router;
