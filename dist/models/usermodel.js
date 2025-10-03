"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const crypto_1 = __importDefault(require("crypto"));
const moment_1 = __importDefault(require("moment"));
const userSchema = new mongoose_1.default.Schema({
    fullname: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    createdAt: { type: Date, default: Date.now },
    resetPasswordOTP: { type: String },
    otpExpiration: { type: Date },
});
// Generate OTP
userSchema.methods.generateResetPasswordOTP = function () {
    const otp = crypto_1.default.randomInt(100000, 999999).toString().padStart(6, '0'); // Always 6 digits
    this.resetPasswordOTP = otp;
    this.otpExpiration = (0, moment_1.default)().add(10, 'minutes').toDate(); // 10 min expiry
    return otp;
};
// Validate OTP
userSchema.methods.validateResetPasswordOTP = function (otp) {
    if (!this.resetPasswordOTP || !this.otpExpiration)
        return false;
    const otpStored = this.resetPasswordOTP.toString().trim();
    const otpReceived = otp.toString().trim();
    return otpStored === otpReceived && (0, moment_1.default)().isBefore(this.otpExpiration);
};
// Reset password
userSchema.methods.resetPassword = async function (newPassword) {
    this.password = newPassword; // Already hashed in controller
    this.resetPasswordOTP = undefined;
    this.otpExpiration = undefined;
    await this.save(); // Persist
};
exports.default = mongoose_1.default.model('User', userSchema);
