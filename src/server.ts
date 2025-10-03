import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// Routers
import userRoutes from "./router/userpath";
import cardRoutes from "./router/cardRoutes";
import orderRoutes from "./router/orderRouter";
import contactRouter from "./router/contactRouter";
import otpRouter from "./router/OTPRouter";
import cartRoutes from "./router/cartRouter";
import productRouter from "./router/productrouter";

// Swagger
import { setupSwagger } from "./Swagger";

dotenv.config();

const app: Express = express();
app.use(express.json());

// ✅ Allow frontend requests
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const port = process.env.PORT || 3000;
const db_user = process.env.DB_USER;
const db_pass = process.env.DB_PASS;
const db_name = process.env.DB_NAME;

// ---------- MongoDB ----------
const connectDb = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${db_user}:${db_pass}@cluster0.oqkxmbp.mongodb.net/${db_name}?retryWrites=true&w=majority`
    );
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};
connectDb();

// ---------- Routes ----------
// User routes
app.use("/api/users", userRoutes);

// Cart routes
app.use("/api/cart", cartRoutes);

// Order routes
app.use("/api/orders", orderRoutes);

// Contact routes
app.use("/api/contact", contactRouter);

// OTP routes
app.use("/api/otp", otpRouter);

// Product routes
app.use("/api/products", productRouter);

// Card routes
app.use("/api/cards", cardRoutes);

// ---------- Swagger ----------
setupSwagger(app); // This will serve Swagger UI at /api-docs

// ---------- Health Check ----------
app.get("/", (_req: Request, res: Response) => {
  res.send("Server is running");
});

// ---------- Start Server ----------
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
