"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cartcontroller_1 = require("../controllers/cartcontroller");
var router = express_1.default.Router();
router.post("/addToCart", cartcontroller_1.addToCart); // ✅ POST route
exports.default = router;
