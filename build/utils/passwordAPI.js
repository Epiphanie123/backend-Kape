"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.requestPasswordReset = void 0;
var axios_1 = __importDefault(require("axios"));
var API_URL = "http://localhost:8000/api/users/send-otp";
var requestPasswordReset = function (email) {
    return axios_1.default.post("".concat(API_URL, "/send-otp"), { email: email });
};
exports.requestPasswordReset = requestPasswordReset;
var resetPassword = function (otp, newPassword, email) {
    return axios_1.default.post("".concat(API_URL, "/reset-password"), { otp: otp, newPassword: newPassword, email: email });
};
exports.resetPassword = resetPassword;
