"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var dotenv_1 = __importDefault(require("dotenv"));
var cors_1 = __importDefault(require("cors"));
// Routers
var userpath_1 = __importDefault(require("./router/userpath"));
var orderRouter_1 = __importDefault(require("./router/orderRouter")); // ✅ New order routes
// Models
var product_1 = __importDefault(require("./models/product"));
var cart_1 = __importDefault(require("./models/cart"));
var contactRouter_1 = __importDefault(require("./router/contactRouter"));
var OTPRouter_1 = __importDefault(require("./router/OTPRouter"));
var cartRouter_1 = __importDefault(require("./router/cartRouter"));
dotenv_1.default.config();
var app = (0, express_1.default)();
app.use(express_1.default.json());
// ✅ Allow frontend requests
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
}));
var port = process.env.PORT || 3000;
var db_user = process.env.DB_USER;
var db_pass = process.env.DB_PASS;
var db_name = process.env.DB_NAME;
// ---------- MongoDB ----------
var connectDb = function () { return __awaiter(void 0, void 0, void 0, function () {
    var error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, mongoose_1.default.connect("mongodb+srv://".concat(db_user, ":").concat(db_pass, "@cluster0.oqkxmbp.mongodb.net/").concat(db_name, "?retryWrites=true&w=majority"))];
            case 1:
                _a.sent();
                console.log("✅ MongoDB connected successfully");
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error("❌ MongoDB connection error:", error_1);
                process.exit(1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
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
app.post("/api/product/create", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, description, category, price, image, product, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, name = _a.name, description = _a.description, category = _a.category, price = _a.price, image = _a.image;
                return [4 /*yield*/, product_1.default.create({ name: name, description: description, category: category, price: price, image: image })];
            case 1:
                product = _b.sent();
                res.status(201).json({ message: "Product created", product: product });
                return [3 /*break*/, 3];
            case 2:
                err_1 = _b.sent();
                res.status(500).json({ message: "Product creation error", error: err_1 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get("/api/product", function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var products, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, product_1.default.find()];
            case 1:
                products = _a.sent();
                res.json(products);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                res.status(500).json({ message: "Fetch products error", error: err_2 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// ---------- Cart ----------
app.post("/api/cart/create", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, product, quantity, cart, err_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, product = _a.product, quantity = _a.quantity;
                return [4 /*yield*/, cart_1.default.create({ product: product, quantity: quantity })];
            case 1:
                cart = _b.sent();
                res.status(201).json({ message: "Cart created", cart: cart });
                return [3 /*break*/, 3];
            case 2:
                err_3 = _b.sent();
                res.status(500).json({ message: "Cart creation error", error: err_3 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get("/api/cart", function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var carts, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, cart_1.default.find()];
            case 1:
                carts = _a.sent();
                res.json(carts);
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                res.status(500).json({ message: "Fetch cart error", error: err_4 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// ---------- Health Check ----------
app.get("/", function (_req, res) {
    res.send("Server is running");
});
// ---------- Start Server ----------
app.listen(port, function () {
    console.log("\uD83D\uDE80 Server running at http://localhost:".concat(port));
});
