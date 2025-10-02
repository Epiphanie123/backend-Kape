import express from "express";
import { addToCart } from "../controllers/cartcontroller";

const router = express.Router();

router.post("/addToCart", addToCart); // ✅ POST route

export default router;
