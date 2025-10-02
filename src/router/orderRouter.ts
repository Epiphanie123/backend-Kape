// src/router/orderRoutes.ts
import express from "express";
import { createOrder, getOrders } from "../controllers/ordercontrollers";

const router = express.Router();

// Create an order
router.post("/create", createOrder);

// Get all orders
router.get("/", getOrders);

export default router;
