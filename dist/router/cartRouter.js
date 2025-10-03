"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cartcontroller_1 = require("../controllers/cartcontroller");
const router = express_1.default.Router();
router.post("/addToCart", cartcontroller_1.addToCart); // ✅ POST route
exports.default = router;
