"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFromCart = exports.addToCart = exports.getCart = void 0;
const cart_1 = __importDefault(require("../models/cart")); // ✅ Capitalized model
// 📌 Get cart
const getCart = async (req, res) => {
    try {
        const cart = await cart_1.default.findOne().populate("items.product"); // ✅ use Cart
        res.json(cart || { items: [] });
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching cart" });
    }
};
exports.getCart = getCart;
// 📌 Add to cart
const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        let cart = await cart_1.default.findOne(); // ✅ use Cart
        if (!cart) {
            cart = new cart_1.default({ items: [] }); // ✅ new Cart
        }
        // ✅ Compare with item.product
        const itemIndex = cart.items.findIndex((item) => item.toString() === productId);
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        }
        else {
            cart.items.push({ product: productId, quantity });
        }
        await cart.save();
        res.json(cart);
    }
    catch (error) {
        res.status(500).json({ message: "Error adding to cart" });
    }
};
exports.addToCart = addToCart;
// 📌 Remove from cart
const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.params;
        let cart = await cart_1.default.findOne(); // ✅ use Cart
        if (!cart) {
            res.status(404).json({ message: "Cart not found" });
            return;
        }
        // ✅ Filter correctly using item.product
        cart.items = cart.items.filter((item) => item.toString() !== productId);
        await cart.save();
        res.json(cart);
    }
    catch (error) {
        res.status(500).json({ message: "Error removing item" });
    }
};
exports.removeFromCart = removeFromCart;
