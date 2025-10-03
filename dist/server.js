"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
// Routers
const userpath_1 = __importDefault(require("./router/userpath"));
const orderRouter_1 = __importDefault(require("./router/orderRouter")); // ✅ New order routes
// Models
const product_1 = __importDefault(require("./models/product"));
const cart_1 = __importDefault(require("./models/cart"));
const contactRouter_1 = __importDefault(require("./router/contactRouter"));
const OTPRouter_1 = __importDefault(require("./router/OTPRouter"));
const cartRouter_1 = __importDefault(require("./router/cartRouter"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
// ✅ Allow frontend requests
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
}));
const port = process.env.PORT || 3000;
const db_user = process.env.DB_USER;
const db_pass = process.env.DB_PASS;
const db_name = process.env.DB_NAME;
// ---------- MongoDB ----------
const connectDb = async () => {
    try {
        await mongoose_1.default.connect(`mongodb+srv://${db_user}:${db_pass}@cluster0.oqkxmbp.mongodb.net/${db_name}?retryWrites=true&w=majority`);
        console.log("✅ MongoDB connected successfully");
    }
    catch (error) {
        console.error("❌ MongoDB connection error:", error);
        process.exit(1);
    }
};
connectDb();
// ---------- Routes ----------
// User routes
app.use("/api/users", userpath_1.default);
// Index routes
// app.use("/api", indexRouting);
// Cart routes
app.use("/api/cart", cartRouter_1.default);
// Order routes
app.use("/api/orders", orderRouter_1.default);
// Contact routes
app.use("/api/contact", contactRouter_1.default);
app.use("/api/otp", OTPRouter_1.default);
// ---------- Product ----------
app.post("/api/product/create", async (req, res) => {
    try {
        const { name, description, category, price, image } = req.body;
        const product = await product_1.default.create({ name, description, category, price, image });
        res.status(201).json({ message: "Product created", product });
    }
    catch (err) {
        res.status(500).json({ message: "Product creation error", error: err });
    }
});
app.get("/api/product", async (_req, res) => {
    try {
        const products = await product_1.default.find();
        res.json(products);
    }
    catch (err) {
        res.status(500).json({ message: "Fetch products error", error: err });
    }
});
// ---------- Cart ----------
app.post("/api/cart/create", async (req, res) => {
    try {
        const { product, quantity } = req.body;
        const cart = await cart_1.default.create({ product, quantity });
        res.status(201).json({ message: "Cart created", cart });
    }
    catch (err) {
        res.status(500).json({ message: "Cart creation error", error: err });
    }
});
app.get("/api/cart", async (_req, res) => {
    try {
        const carts = await cart_1.default.find();
        res.json(carts);
    }
    catch (err) {
        res.status(500).json({ message: "Fetch cart error", error: err });
    }
});
// ---------- Health Check ----------
app.get("/", (_req, res) => {
    res.send("Server is running");
});
// ---------- Start Server ----------
app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});
