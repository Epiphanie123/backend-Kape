import { Request, Response } from "express";
import {Order }from "../models/order";


export const createOrder = async (req: Request, res: Response) => {
  try {
    const { customerName, email, phone, address, products, totalPrice } = req.body;

    if (!customerName || !email || !phone || !address || !products || products.length === 0) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const order = new Order({
      customerName,
      email,
      phone,
      address,
      products,
      totalPrice,
    });

    const savedOrder = await order.save();
    res.status(201).json({ message: "Order placed successfully", order: savedOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const getOrders = async (_req: Request, res: Response) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Server error" });
  }
};
