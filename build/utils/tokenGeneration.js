"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var jwtSecret = process.env.JWT_SECRET;
var generateAccessToken = function (user) {
    if (!jwtSecret) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }
    return jsonwebtoken_1.default.sign({
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        role: user.role
    }, jwtSecret, { expiresIn: "7h" });
};
exports.generateAccessToken = generateAccessToken;
