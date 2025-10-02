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
exports.removeFromCart = exports.addToCart = exports.getCart = void 0;
var cart_1 = __importDefault(require("../models/cart")); // ✅ Capitalized model
// 📌 Get cart
var getCart = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var cart, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, cart_1.default.findOne().populate("items.product")];
            case 1:
                cart = _a.sent();
                res.json(cart || { items: [] });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                res.status(500).json({ message: "Error fetching cart" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getCart = getCart;
// 📌 Add to cart
var addToCart = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, productId_1, quantity, cart, itemIndex, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, productId_1 = _a.productId, quantity = _a.quantity;
                return [4 /*yield*/, cart_1.default.findOne()];
            case 1:
                cart = _b.sent();
                if (!cart) {
                    cart = new cart_1.default({ items: [] }); // ✅ new Cart
                }
                itemIndex = cart.items.findIndex(function (item) { return item.toString() === productId_1; });
                if (itemIndex > -1) {
                    cart.items[itemIndex].quantity += quantity;
                }
                else {
                    cart.items.push({ product: productId_1, quantity: quantity });
                }
                return [4 /*yield*/, cart.save()];
            case 2:
                _b.sent();
                res.json(cart);
                return [3 /*break*/, 4];
            case 3:
                error_2 = _b.sent();
                res.status(500).json({ message: "Error adding to cart" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.addToCart = addToCart;
// 📌 Remove from cart
var removeFromCart = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productId_2, cart, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                productId_2 = req.params.productId;
                return [4 /*yield*/, cart_1.default.findOne()];
            case 1:
                cart = _a.sent();
                if (!cart) {
                    res.status(404).json({ message: "Cart not found" });
                    return [2 /*return*/];
                }
                // ✅ Filter correctly using item.product
                cart.items = cart.items.filter(function (item) { return item.toString() !== productId_2; });
                return [4 /*yield*/, cart.save()];
            case 2:
                _a.sent();
                res.json(cart);
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                res.status(500).json({ message: "Error removing item" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.removeFromCart = removeFromCart;
