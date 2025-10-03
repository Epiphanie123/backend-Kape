"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrders = exports.createOrder = void 0;
const order_1 = require("../models/order");
const createOrder = async (req, res) => {
    try {
        const { customerName, email, phone, address, products, totalPrice } = req.body;
        if (!customerName || !email || !phone || !address || !products || products.length === 0) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const order = new order_1.Order({
            customerName,
            email,
            phone,
            address,
            products,
            totalPrice,
        });
        const savedOrder = await order.save();
        res.status(201).json({ message: "Order placed successfully", order: savedOrder });
    }
    catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ message: "Server error" });
    }
};
exports.createOrder = createOrder;
const getOrders = async (_req, res) => {
    try {
        const orders = await order_1.Order.find().sort({ createdAt: -1 });
        res.status(200).json(orders);
    }
    catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: "Server error" });
    }
};
exports.getOrders = getOrders;
