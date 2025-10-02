"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var userpath_1 = __importDefault(require("./userpath"));
var productrouter_1 = __importDefault(require("./productrouter"));
var mainRouter = (0, express_1.Router)();
mainRouter.use("/product", productrouter_1.default);
mainRouter.use("/user", userpath_1.default);
mainRouter.use("/contact", userpath_1.default);
mainRouter.use("/OTP", userpath_1.default);
exports.default = mainRouter;
