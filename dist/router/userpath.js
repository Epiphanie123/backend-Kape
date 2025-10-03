"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usercontroller_1 = require("../controllers/usercontroller");
const router = (0, express_1.Router)();
// Route for registering a new user
router.post('/register', usercontroller_1.registerUser);
// Route for logging in a user
router.post('/login', usercontroller_1.loginUser);
// Route for requesting a password reset (sending OTP)
router.post('/send-otp', usercontroller_1.requestPasswordReset);
// Route for resetting the password using OTP
router.post('/reset-password', usercontroller_1.resetPassword);
exports.default = router;
