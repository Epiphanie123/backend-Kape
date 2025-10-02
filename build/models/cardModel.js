"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = void 0;
var mongoose_1 = require("mongoose");
var cardSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    image: { type: String },
    discount: { type: Number, default: 0 },
}, { timestamps: true });
exports.Card = (0, mongoose_1.model)("Card", cardSchema);
