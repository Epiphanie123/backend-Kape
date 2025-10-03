"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.requestPasswordReset = exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const usermodel_1 = __importDefault(require("../models/usermodel"));
const nodemailer_1 = __importDefault(require("nodemailer"));
// Helper function to send OTP email
async function sendEmail(otp, email) {
    const transporter = nodemailer_1.default.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password Reset OTP',
        text: `Your OTP for password reset is: ${otp}`,
    };
    await transporter.sendMail(mailOptions);
}
// ------------------- Register -------------------
const registerUser = async (req, res) => {
    const { fullname, email, password } = req.body;
    try {
        const userExists = await usermodel_1.default.findOne({ email });
        if (userExists)
            return res.status(400).json({ message: 'User already exists' });
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const newUser = new usermodel_1.default({
            fullname,
            email,
            password: hashedPassword,
        });
        await newUser.save();
        res.status(201).json({
            message: 'User registered successfully',
            user: { fullname: newUser.fullname, email: newUser.email },
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.registerUser = registerUser;
// ------------------- Login -------------------
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await usermodel_1.default.findOne({ email });
        if (!user)
            return res.status(400).json({ message: 'Invalid credentials' });
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ message: 'Invalid credentials' });
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        res.status(200).json({ message: 'Login successful', token, user });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.loginUser = loginUser;
// ------------------- Request Password Reset -------------------
const requestPasswordReset = async (req, res) => {
    const { email } = req.body;
    console.log("email is ", email);
    try {
        const user = await usermodel_1.default.findOne({ email });
        if (!user)
            return res.status(400).json({ message: 'User not found' });
        // Generate OTP and set expiration
        const otp = user.generateResetPasswordOTP();
        // Save OTP and expiration immediately
        await user.save();
        console.log('Generated OTP:', otp);
        console.log('OTP expires at:', user.otpExpiration);
        // Send OTP after saving
        await sendEmail(otp, email);
        res.status(200).json({ message: 'OTP sent to your email' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.requestPasswordReset = requestPasswordReset;
// ------------------- Reset Password -------------------
const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;
    try {
        const user = await usermodel_1.default.findOne({ email });
        if (!user)
            return res.status(400).json({ message: 'User not found' });
        console.log('OTP in DB:', user.resetPasswordOTP);
        console.log('OTP expiration:', user.otpExpiration);
        console.log('OTP received from client:', otp);
        // Validate OTP
        if (!user.validateResetPasswordOTP(otp)) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }
        // Hash new password
        const hashedPassword = await bcryptjs_1.default.hash(newPassword, 10);
        // Reset password and clear OTP
        user.password = hashedPassword;
        user.resetPasswordOTP = undefined;
        user.otpExpiration = undefined;
        await user.save();
        res.status(200).json({ message: 'Password reset successful' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.resetPassword = resetPassword;
