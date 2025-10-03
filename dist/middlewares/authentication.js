"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAdmin = exports.requireSignin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const usermodel_1 = __importDefault(require("../models/usermodel"));
const JWT_SECRET = process.env.JWT_SECRET ?? "";
const requireSignin = async (req, res, next) => {
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization;
            const verifytoken = jsonwebtoken_1.default.verify(token, JWT_SECRET);
            const rootuser = await usermodel_1.default.findOne({
                _id: verifytoken._id,
                "tokens.token": token,
            });
            if (!rootuser) {
                throw "User not found";
            }
            req.user = rootuser;
            next();
        }
        else {
            throw "Authentication is required";
        }
    }
    catch (error) {
        return res.status(400).json({ message: "Authorization required" });
    }
};
exports.requireSignin = requireSignin;
const checkAdmin = (req, res, next) => {
    if (req.user?.role !== "admin") {
        return res.status(400).json({ message: "User is not Authorized" });
    }
    next();
};
exports.checkAdmin = checkAdmin;
