import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// Routers
import userRoutes from "./router/userpath";
// import indexRouting from "./router/indexRouting";
import cardRoutes from "./router/cardRoutes";
import orderRoutes from "./router/orderRouter"; // ✅ New order routes


// Models
import Product from "./models/product";
import Cart from "./models/cart";
import contactRouter from "./router/contactRouter";
import otpRouter from "./router/OTPRouter";
import cartRoutes from "./router/cartRouter";


dotenv.config();

const app: Application = express();
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
// Index routes
// app.use("/api", indexRouting);

// Cart routes
app.use("/api/cart", cartRoutes);

// Order routes
app.use("/api/orders", orderRoutes);
// Contact routes
app.use("/api/contact", contactRouter);
app.use("/api/otp", otpRouter);


// ---------- Product ----------
app.post("/api/product/create", async (req: Request, res: Response) => {
  try {
    const { name, description, category, price, image } = req.body;
    const product = await Product.create({ name, description, category, price, image });
    res.status(201).json({ message: "Product created", product });
  } catch (err) {
    res.status(500).json({ message: "Product creation error", error: err });
  }
});

app.get("/api/product", async (_req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Fetch products error", error: err });
  }
});

// ---------- Cart ----------
app.post("/api/cart/create", async (req: Request, res: Response) => {
  try {
    const { product, quantity } = req.body;
    const cart = await Cart.create({ product, quantity });
    res.status(201).json({ message: "Cart created", cart });
  } catch (err) {
    res.status(500).json({ message: "Cart creation error", error: err });
  }
});

app.get("/api/cart", async (_req: Request, res: Response) => {
  try {
    const carts = await Cart.find();
    res.json(carts);
  } catch (err) {
    res.status(500).json({ message: "Fetch cart error", error: err });
  }
});

// ---------- Health Check ----------
app.get("/", (_req: Request, res: Response) => {
  res.send("Server is running");
});

// ---------- Start Server ----------
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
