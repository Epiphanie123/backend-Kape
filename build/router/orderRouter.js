"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/router/orderRoutes.ts
var express_1 = __importDefault(require("express"));
var ordercontrollers_1 = require("../controllers/ordercontrollers");
var router = express_1.default.Router();
// Create an order
router.post("/create", ordercontrollers_1.createOrder);
// Get all orders
router.get("/", ordercontrollers_1.getOrders);
exports.default = router;
