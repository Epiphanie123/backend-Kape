"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.requestPasswordReset = void 0;
const axios_1 = __importDefault(require("axios"));
const API_URL = "http://localhost:8000/api/users/send-otp";
const requestPasswordReset = (email) => {
    return axios_1.default.post(`${API_URL}/send-otp`, { email });
};
exports.requestPasswordReset = requestPasswordReset;
const resetPassword = (otp, newPassword, email) => {
    return axios_1.default.post(`${API_URL}/reset-password`, { otp, newPassword, email });
};
exports.resetPassword = resetPassword;
